"use client";

import { useRouter } from "next/navigation";
import logout from "../lib/auth";

export default function LogoutButton() {
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  return <button onClick={handleLogout}>Logout</button>;
}
