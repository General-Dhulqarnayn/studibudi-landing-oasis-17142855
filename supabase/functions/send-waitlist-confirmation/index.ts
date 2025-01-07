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
    console.log("Starting email confirmation process for:", email);
    console.log("RESEND_API_KEY status:", RESEND_API_KEY ? "Present" : "Missing");

    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      throw new Error("RESEND_API_KEY is not configured");
    }

    console.log("Attempting to send email via Resend API");
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "StudiBudi <hello@studibudi.com>", // Update this with your verified domain email
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

    const responseData = await res.text();
    console.log("Resend API response:", responseData);

    if (!res.ok) {
      console.error("Resend API error response:", responseData);
      throw new Error(`Failed to send email: ${responseData}`);
    }

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error: any) {
    console.error("Detailed error in send-waitlist-confirmation function:", error);
    return new Response(
      JSON.stringify({ 
        error: "Failed to send confirmation email",
        details: error.message 
      }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 500,
      }
    );
  }
};

serve(handler);