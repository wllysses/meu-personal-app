import NextAuth from "next-auth";
import { nextAuthOption } from "@/lib/auth";

const handler = NextAuth(nextAuthOption);

export { handler as POST, handler as GET };
