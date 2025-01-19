import { withAuth } from "next-auth/middleware";


export default withAuth(
    async function middleware(req) {

        const page = req.nextUrl.pathname;

        const { user_id } = req.nextauth.token

        console.log("USER ID", user_id)
    },
    {
        pages: {
            signIn: "/",
        },
    }

);

export const config = {
    matcher: [
        // Match all routes except "/", "/signup", and the specified exclusions
        "/((?!resources|_next/static|_next/image|favicon.ico|api|signup|$).*)",
    ],
};