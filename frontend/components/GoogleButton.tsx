"use client";

import { GoogleLogin } from "@react-oauth/google";
import api from "../lib/api";
import { useRouter } from "next/navigation";
import { saveToken } from "../lib/auth";

export default function GoogleButton() {
  const router = useRouter();

  return (
    <GoogleLogin
      onSuccess={async (credentialResponse) => {
        try {
          const res = await api.post("/auth/google", {
            credential: credentialResponse.credential,
          });

          const { token } = res.data;

          saveToken(token);

          router.push("/admin");
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
