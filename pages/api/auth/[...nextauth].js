import AuthController from "@app/src/controllers/auth.controller";
import moment from "moment/moment";
import NextAuth from "next-auth/next";
import Credentials from "next-auth/providers/credentials";

export default NextAuth({
  providers: [
    Credentials({
      id: "my-credentials",
      name: "my-credentials",
      credentials: {
        email: {
          label: "email",
          type: "email",
          placeholder: "Please input your email",
        },
        password: {
          label: "password",
          type: "password",
        },
      },
      async authorize(credentials, req, res) {
        try {
          const [err, data] = await new AuthController({
            field: {},
          }).signIn();

          if (err) return false;
          if (!data) return false;

          const token = "KAKOSKOKOASOJOSAOSO";
          Reflect.set(data, "token", token);

          return {
            error: false,
            ...data,
          };
        } catch (error) {
          throw new Error(error?.message);
        }
      },
    }),
  ],
  jwt: {
    maxAge: 3 * 24 * 60 * 60,
    secret: process.env.JWT_SECRET,
  },
  session: {
    maxAge: 3 * 24 * 60 * 60,
    strategy: "jwt",
  },
  pages: {
    signIn: "/auth/login",
  },
  callbacks: {
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async signIn({ account, profile, user }) {
      console.log({ account, profile, user });
      const isCanLogin = account?.provider === "my-credentials";

      if (!isCanLogin) return false;
      return true;
    },
  },
  jwt:async({ token, user, profile }) =>{
    console.log(token);
    return {
      ...token,
      ...user,
      ...profile,
    };
  },
  session: async({ session, token, user }) =>{
    const isExpired = Date.now() > moment(session?.expires);
    if (isExpired) return null;
    return session;
  },
  debug: true,
});
