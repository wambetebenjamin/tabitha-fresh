import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { findUserByEmail, hashPassword } from "@/lib/store-server";

export const { handlers, auth, signIn, signOut } = NextAuth({
  trustHost: true,
  secret:
    process.env.NEXTAUTH_SECRET ||
    "tabitha_fresh_nairobi_secure_fallback_secret_2026",
  session: {
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID || "unconfigured-google-client-id",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET || "unconfigured-google-client-secret",
    }),
    Credentials({
      name: "Email and Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = String(credentials?.email || "")
          .trim()
          .toLowerCase();
        const password = String(credentials?.password || "");

        if (!email || !password) {
          return null;
        }

        const account = await findUserByEmail(email);
        if (!account) {
          return null;
        }

        if (account.passwordHash !== hashPassword(password)) {
          return null;
        }

        return {
          id: account.id,
          name: account.name,
          email: account.email,
        };
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.sub = user.id;
        token.name = user.name;
        token.email = user.email;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = String(token.sub || "");
        session.user.name = String(token.name || session.user.name || "");
        session.user.email = String(token.email || session.user.email || "");
      }
      return session;
    },
  },
});
