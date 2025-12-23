"use client";

import { GoogleLogin } from "@react-oauth/google";
import api from "../lib/api";
import { useRouter } from "next/navigation";

export default function GoogleButton() {
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await api.post("/auth/google", {
            credential: credentialResponse.credential,
          });

          // ✅ ВАЖНО
          localStorage.setItem("token", res.data.token);

          // можешь сохранить юзера если хочешь
          // localStorage.setItem("user", JSON.stringify(res.data.user));

          router.push("/admin"); // или куда тебе нужно
        } catch (err) {
          console.error("GOOGLE LOGIN ERROR", err);
        }
      }}
      onError={() => {
        console.log("Google Login Failed");
      }}
    />
  );
}
