import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import prisma from "./db";
import { PrismaAdapter } from "@auth/prisma-adapter";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),

  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      authorization: { params: { scope: "read:user user:email" } },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile }) {
      // Certifique-se de que o e-mail está disponível
      if (!user.email) {
        const primaryEmail = profile?.email || profile?.emails?.[0]?.value;
        if (primaryEmail) {
          user.email = primaryEmail;
        } else {
          console.error("E-mail não encontrado no perfil do usuário do GitHub");
          return false; // Bloqueia o login caso o e-mail seja obrigatório
        }
      }
      return true;
    },

    async session({ session, user }) {
      // Adicione informações adicionais na sessão, se necessário
      session.user.id = user.id;
      session.user.email = user.email;
      return session;
    },
  },
});
