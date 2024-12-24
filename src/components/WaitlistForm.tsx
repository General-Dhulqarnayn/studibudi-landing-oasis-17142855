import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";

export const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const { data: existingEntry } = await supabase
        .from("waitlist")
        .select()
        .eq("email", email)
        .maybeSingle();

      if (existingEntry) {
        toast({
          title: "Already registered!",
          description: "This email is already on our waitlist. We'll notify you when we launch!",
        });
        setEmail("");
        return;
      }

      const { error: dbError } = await supabase
        .from("waitlist")
        .insert({ email });

      if (dbError) throw dbError;

      const { error: emailError } = await supabase.functions.invoke(
        "send-waitlist-confirmation",
        {
          body: { email },
        }
      );

      if (emailError) throw emailError;

      toast({
        title: "Success!",
        description: "You've been added to our waitlist. Check your email for confirmation!",
      });

      setEmail("");
    } catch (error) {
      console.error("Error:", error);
      toast({
        variant: "destructive",
        title: "Error",
        description: "Something went wrong. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      id="waitlist-section" 
      className="py-12 relative overflow-hidden -mt-20"
    >
      <div className="container mx-auto px-6">
        <motion.form 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          onSubmit={handleSubmit} 
          className="max-w-xl mx-auto"
        >
          <div className="flex flex-col sm:flex-row gap-4">
            <Input
              id="waitlist-email"
              type="email"
              placeholder="Enter your email to join the waitlist"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="flex-1 transition-all duration-300 text-lg h-14"
            />
            <Button 
              type="submit" 
              disabled={isLoading} 
              size="lg"
              className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-white font-semibold px-8 h-14"
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                  </svg>
                  Joining...
                </span>
              ) : (
                "Join Waitlist"
              )}
            </Button>
          </div>
        </motion.form>
      </div>
    </section>
  );
};