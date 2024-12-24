import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/use-toast";
import { supabase } from "@/integrations/supabase/client";

export const WaitlistForm = () => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // First, add to waitlist table
      const { error: dbError } = await supabase
        .from("waitlist")
        .insert({ email });

      if (dbError) throw dbError;

      // Then, send confirmation email using our edge function
      const { data: emailData, error: emailError } = await supabase.functions.invoke(
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
    <section className="py-16 bg-muted">
      <div className="container mx-auto px-6">
        <div className="max-w-2xl mx-auto text-center mb-8">
          <h2 className="text-3xl font-bold mb-4">Join Our Waitlist</h2>
          <p className="text-muted-foreground">
            Be the first to know when we launch. Sign up for early access.
          </p>
        </div>
        <form onSubmit={handleSubmit} className="max-w-xl mx-auto flex flex-col sm:flex-row gap-4">
          <Input
            type="email"
            placeholder="Enter your email to join the waitlist"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="flex-1"
          />
          <Button type="submit" disabled={isLoading} className="w-full sm:w-auto">
            {isLoading ? "Joining..." : "Join Waitlist"}
          </Button>
        </form>
      </div>
    </section>
  );
};