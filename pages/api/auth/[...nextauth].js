import NextAuth from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify";

async function refreshAccessToken(token) {
  try {
    spotifyApi.setAccessToken(token.accessToken);
    spotifyApi.setRefreshToken(token.refreshToken);

    const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
    console.log("REFRESHED TOKEN IS", refreshedToken);

    return {
      ...token,
      accessToken: refreshedToken.accessToken,
      accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
      refreshToken: refreshedToken.refresh_token ?? token.refreshToken,
    };
  } catch (error) {
    console.error(error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}
const hostName = new URL(process.env.NEXTAUTH_URL).hostname;
const useSecure = process.env.NEXTAUTH_URL.startsWith("https://");
const cookiePrefix = hostName === "localhost" ? "" : "__Secure-";
const hostCookiePrefix = hostName === "localhost" ? "" : "Host-";

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET,
      authorization: LOGIN_URL,
    }),
    // ...add more providers here
  ],
  secret: process.env.JWT_SECRET,
  pages: {
    signIn: "/login",
  },
  cookies: {
    sessionToken: {
      name: `${cookiePrefix}next-auth.session-token`,
      options: {
        httpOnly: true,
        sameSite: "lax",
        path: "/",
        secure: useSecure,
        domain: hostName,
      },
      callbackUrl: {
        name: `${cookiePrefix}next-auth.callback-url`,
        options: {
          sameSite: "lax",
          path: "/",
          secure: useSecure,
          domain: hostName,
        },
      },
      csrfToken: {
        name: `${hostCookiePrefix}next-auth.csrf-token`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: useSecure,
          domain: hostName,
        },
      },
      pkceCodeVerifier: {
        name: `${cookiePrefix}next-auth.pkce.code_verifier`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: useSecure,
          domain: hostName,
        },
      },
      state: {
        name: `${cookiePrefix}next-auth.state`,
        options: {
          httpOnly: true,
          sameSite: "lax",
          path: "/",
          secure: useSecure,
          domain: hostName,
        },
      },
    },
  },
  callbacks: {
    async jwt({ token, account, user }) {
      console.log("auth");
      // initial sign in
      if (account && user) {
        return {
          ...token,
          accessToken: account.access_token,
          refreshToken: account.refresh_token,
          username: account.providerAccountId,
          accessTokenExpires: account.expires_at * 1000,
        };
      }

      // Return previous token if the access token has not expired yet
      if (Date.now() < token.accessTokenExpires) {
        return token;
      }

      // Access token has expired, refresh
      console.log("refreshing auth");
      return await refreshAccessToken(token);
    },

    async session({ session, token }) {
      session.user.accessToken = token.accessToken;
      session.user.refreshToken = token.refreshToken;
      session.user.username = token.username;

      return session;
    },
  },
});
