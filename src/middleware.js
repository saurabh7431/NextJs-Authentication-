import { NextResponse } from 'next/server'
 
// This function can be marked `async` if using `await` inside
export function middleware(request) {
    const path = request.nextUrl.pathname;

    // if user is not login user can access only login, signup and verifyemail page
    const isPublicPath= path === "/login" || path === "/signup" || path === "/verifyemail";

    // Getting token from cookies
    const token = request.cookies.get("token")?.value || "";
    console.log("token", token);
    

// if user have token user can access these pages
if(isPublicPath && token){
    return NextResponse.redirect(new URL('/', request.url))
}
//if user is not have token user redirect to login page
if(!isPublicPath && !token){
    return NextResponse.redirect(new URL('/login', request.url))
}

return NextResponse.next();
}
 
// See "Matching Paths" below to learn more
export const config = {
  matcher:[
    '/',
    '/login',
    '/signup',
    '/profile',
    '/verifyemail',
  ]
}
