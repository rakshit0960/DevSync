import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import GitHub from "next-auth/providers/github";
import Google from "next-auth/providers/google";
import { ZodError } from "zod";
import { signInSchema } from "./schema";
import { v4 as uuid } from "uuid";
import { encode } from "@auth/core/jwt";

const adapter = PrismaAdapter(prisma);

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter,
  providers: [
    GitHub,

    Google,
    Credentials({
      credentials: {
        email: {},
        password: {},
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = await signInSchema.parseAsync(
            credentials
          );

          // logic to verify if the user exists
          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user?.password) return null;

          const isValid = await bcrypt.compare(password, user.password);
          return isValid ? user : null;

        } catch (error) {
          if (error instanceof ZodError) {
            return null;
          }
          return null;
        }
      },
    }),
  ],

  callbacks: {
    // this is used to add a property to the token if the user is logged in with credentials
    async jwt({ token, account }) {
      if (account?.provider === "credentials") {
        token.credentials = true;
      }
      return token;
    },
  },

  jwt: {
    encode: async (params) => {
      if (params.token?.credentials) {
        const sessionToken = uuid();

        if (!params.token.sub) {
          throw new Error("Missing user id in the token");
        }
        if (!adapter || !adapter.createSession) {
          throw new Error("Missing adapter");
        }
        const createdSession = await adapter.createSession({
          sessionToken,
          userId: params.token.sub,
          expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30), // 30 days
        });

        if (!createdSession) {
          throw new Error("Failed to create session");
        }
        
        return sessionToken;
      }
      return encode(params);
    },

  },
});
