/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */

import { z } from "zod";
import nodemailer from "nodemailer";

import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";

export const mailingRouter = createTRPCRouter({
  sendEmail: publicProcedure
    .input(
      z.object({
        name: z.string(),
        lastname: z.string(),
        email: z.string(),
        subject: z.string(),
      })
    )
    .mutation(async ({ input }) => {
      try {
        const transporter = nodemailer.createTransport({
          host: "mail.privateemail.com",
          port: 465,
          secure: true,
          auth: {
            user: "hello@paramar.org",
            pass: "Paramar3!",
          },
        });

        await transporter.sendMail({
          from: '"✉ Contact Form" <hello@paramar.org>',
          to: "hello@paramar.org",
          subject: "New Contact Form Submission",
          text: "New Contact Form Submission",
          html: `
          <div style="display: flex;flex-direction: column;align-items: flex-start;gap: 4px;">
            <h1>New Contact Form Submission</h1>
            <p style="display: flex;"><span style="display: block;width: 80px;">Subject:</span> <b>${input.subject}</b></p>
            <p style="display: flex;"><span style="display: block;width: 80px;">Full Name:</span> <b>${input.name} ${input.lastname}</b></p>
            <p style="display: flex;"><span style="display: block;width: 80px;">Email:</span> <b>${input.email}</b></p>
          </div>
          `,
        });

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    }),
});
