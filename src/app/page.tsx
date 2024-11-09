"use client";

import { Button } from "@nextui-org/react";
import * as actions from "@/actions";
import { useSession } from "next-auth/react";

export default function Home() {
  const { data: session } = useSession();
  return (
    <div>
      <form action={actions.signIn}>
        <Button type="submit">Sign In</Button>
      </form>
      <form action={actions.signOut}>
        <Button type="submit">Sign Out</Button>
      </form>

      {session?.user ? <div>Signed in!</div> : <div>Signed out</div>}
    </div>
  );
}
