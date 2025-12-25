"use client";

import { useRouter } from "next/navigation";
import { logout } from "../lib/auth";

export default function LogoutButton() {
  const router = useRouter();

  return <button onClick={logout}>Logout</button>;
}
