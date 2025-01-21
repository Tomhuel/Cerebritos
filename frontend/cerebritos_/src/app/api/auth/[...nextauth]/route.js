import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import apiUrl from "../../../../../utils/apiConfig";

const handler = NextAuth({
    providers: [
        CredentialsProvider({
            id: 'credentials',
            name: "Credentials",
            credentials: {
                email: { label: "email", type: "email", placeholder: "johndoe@email.com" },
                password: { label: "Contraseña", type: "password" }
            },
            async authorize(credentials, req) {
                try {
                    const res = await fetch(`${apiUrl}/api/auth/login`,
                        {
                            method: "POST",
                            body: JSON.stringify({
                                email: credentials?.email,
                                password: credentials?.password
                            }),
                            headers: { "Content-Type": "application/json" },
                        }
                    );
                    if (!res.ok) {
                        throw res
                    }
                    const jwt = await res.json();
                    if (jwt.error) {
                        throw jwt
                    }
                    const token = jwt.token;
                    const userFetch = await fetch(`${apiUrl}/api/user/me`, {
                        headers: {
                            "Authorization": `Bearer ${token}`,
                            "Content-Type": "application/json",
                            "Accept": 'application/json'
                        }
                    });
                    if (!userFetch.ok) {
                        throw userFetch;
                    }
                    const userData = await userFetch.json();
                    if (userData.error) {
                        throw userData;
                    }

                    const user = userData.data;
                    return { token, user };
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            }
        }),
        CredentialsProvider({
            id: 'jwt',
            name: "Jwt",
            credentials: {
                token: { label: "Json Web Token", type: "text" }
            },
            async authorize(credentials) {
                try {
                    const res = await fetch(`${apiUrl}/api/user/me`,
                        {
                            headers: {
                                "Authorization": `Bearer ${credentials.token}`,
                                "Content-Type": "application/json",
                                "Accept": 'application/json'
                            }
                        });
                    if (!res.ok) {
                        console.error('Error validating!');
                        throw res;
                    }
                    const userData = await res.json();
                    if (userData.error) {
                        throw role;
                    }

                    const user = userData.data;
                    return { token: credentials.token, user };
                } catch (err) {
                    console.error(err);
                    throw err;
                }
            }
        }),
    ],
    callbacks: {
        async jwt({ token, user, trigger, session }) {

            if (trigger === 'update') {
                return {...token, ...session.user};
            }

            return { ...token, ...user };
        },
        async session({ session, token }) {
            session.user = token;
            return session;
        },
    },
    pages: {
        signIn: '/login'
    },
    secret: 'BOBmiezDUxPbUHuYivnCg7iq/fjSVTN5MeyI1+P5TJ8='
});

export { handler as GET, handler as POST }