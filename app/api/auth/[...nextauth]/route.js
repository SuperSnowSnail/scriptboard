import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";

import prisma from "@/utils/initPrisma";

export const authOptions = {
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
      async profile(profile) {
        const result = {};
        const githubId = profile.id;
        const user = await prisma.user.findFirst({
          where: {
            githubId,
          },
        });

        if (!user) {
          const newUser = await prisma.user.create({
            data: {
              githubId,
              name: profile.login,
              email: profile.email,
              image: profile.avatar_url,
            },
          });

          result.id = newUser.id;
          result.role = newUser.role;
          result.name = newUser.name;
          result.email = newUser.email;
          result.image = newUser.image;
        } else {
          result.id = user.id;
          result.role = user.role;
          result.name = user.name;
          result.email = user.email;
          result.image = user.image;
        }

        return result;
      },
    }),
  ],
  callbacks: {
    async session({ session, token }) {
      session.user.role = token.role;
      session.user.id = token.id;
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

export const dynamic = "force-dynamic";
