import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface EmailRequest {
  email: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email }: EmailRequest = await req.json();
    console.log("Sending confirmation email to:", email);

    if (!RESEND_API_KEY) {
      throw new Error("RESEND_API_KEY is not set");
    }

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "StudiBudi <onboarding@resend.dev>",
        to: [email],
        subject: "Welcome to StudiBudi Waitlist!",
        html: `
          <h1>Welcome to StudiBudi!</h1>
          <p>Thank you for joining our waitlist. We're excited to have you on board!</p>
          <p>We'll keep you updated on our progress and let you know as soon as we launch.</p>
          <p>Best regards,<br>The StudiBudi Team</p>
        `,
      }),
    });

    if (!res.ok) {
      const error = await res.text();
      console.error("Resend API error:", error);
      throw new Error("Failed to send email");
    }

    const data = await res.json();
    console.log("Email sent successfully:", data);

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
    console.error("Error in send-waitlist-confirmation function:", error);
    return new Response(
      JSON.stringify({ error: "Failed to send confirmation email" }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);