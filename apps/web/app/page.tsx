import { auth } from "@/lib/auth"
import { headers } from "next/headers"
import SignInButton from "@/components/sign-in-button"

export default async function Home() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  return (
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        {/*{session ? (*/}
        {/*    <div className="text-center">*/}
        {/*      <p className="text-lg font-medium">*/}
        {/*        Signed in as {session.user.name}*/}
        {/*      </p>*/}
        {/*        <p>Welcome to scaffold stack</p>*/}
        {/*      <p className="text-sm text-gray-500">{session.user.email}</p>*/}
        {/*    </div>*/}
        {/*) : (*/}
        {/*    <p className="text-gray-500">Not signed in</p>*/}
        {/*)}*/}
        {/*<SignInButton />*/}
          <h1>test</h1>
      </main>
  )
}