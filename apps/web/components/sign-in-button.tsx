// "use client"
//
// import { authClient } from "@/lib/auth-client"
//
// export default function SignInButton() {
//     const { data: session } = authClient.useSession()
//
//     async function handleSignIn() {
//         await authClient.signIn.social({ provider: "github" })
//     }
//
//     async function handleSignOut() {
//         await authClient.signOut()
//         window.location.reload()
//     }
//
//     if (session) {
//         return (
//             <button
//                 onClick={handleSignOut}
//                 className="rounded-md bg-red-500 px-4 py-2 text-white hover:bg-red-600"
//             >
//                 Sign out
//             </button>
//         )
//     }
//
//     return (
//         <button
//             onClick={handleSignIn}
//             className="rounded-md bg-black px-4 py-2 text-white hover:bg-gray-800"
//         >
//             Sign in with GitHub
//         </button>
//     )
// }