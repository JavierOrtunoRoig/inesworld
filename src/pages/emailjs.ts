// import { init } from "@emailjs/browser";
import type { APIRoute } from "astro";

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // return a response with JSON
  const { to_email, from_name, message } = await request.json();

  const response = await fetch("https://api.emailjs.com/api/v1.0/email/send", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${"user_3r6y8dq"}`,
      origin: "https:localhost:4321",
    },
    body: JSON.stringify({
      service_id: "service_3r6y8dq",
      template_id: "template_d3rlfnk",
      user_id: "Zysq_8MGlqpjcijD4",
      template_params: {
        from_name,
        to_email,
        message,
      },
    }),
  }).then((res) => res.text());

  if (response === "OK") {
    return new Response(
      JSON.stringify({
        success: true,
        message: "Email sent successfully!",
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  } else {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Failed to send email!",
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  }
};
