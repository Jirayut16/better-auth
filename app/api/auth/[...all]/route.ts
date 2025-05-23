import { auth } from "@/lib/auth"; // path to your auth file
import { toNextJsHandler } from "better-auth/next-js";
import arcjet, { protectSignup } from "@arcjet/next";
import { NextRequest, NextResponse } from "next/server";

const aj = arcjet({
  key: process.env.ARCJET_KEY as string,
  rules: [
    protectSignup({
      email: {
        mode: "LIVE",
        block: ["DISPOSABLE", "INVALID", "NO_MX_RECORDS"],
      },
      bots: {
        mode: "LIVE",
        allow: [],
      },

      rateLimit: {
        mode: "LIVE",
        interval: "10m",
        max: 5000,
      },
    }),
  ],
});

const betterAuthHandlers = toNextJsHandler(auth.handler);

const ajProtectedPOST = async (req: NextRequest) => {
  const reqForArcjet = req.clone(); //สำหรับ Arcjet
  const reqForAuth = req.clone(); //สำหรับ BetterAuth
  const { email } = await reqForArcjet.json(); //req body ที่ ส่งมา

  const decision = await aj.protect(req, { email });

  if (decision.isDenied()) {
    if (decision.reason.isEmail()) {
      let message = "";
      if (decision.reason.emailTypes.includes("INVALID")) {
        message = "email address format is invalid. Is there a typo?";
      } else if (decision.reason.emailTypes.includes("DISPOSABLE")) {
        message = "we do not allow disposable email addresses.";
      } else if (decision.reason.emailTypes.includes("NO_MX_RECORDS")) {
        message =
          "your email domain does not have an MX record. Is there a typo?";
      } else {
        message = "invalid email.";
      }

      return NextResponse.json(
        {
          message,
          reason: decision.reason,
        },
        { status: 400 }
      );
    } else {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }
  } else {
    return betterAuthHandlers.POST(reqForAuth);
  }
};
export { ajProtectedPOST as POST };
export const { GET } = toNextJsHandler(auth);
