'use client';

import { useState } from "react";
import { useRouter } from "next/navigation";
import GoogleButton from "../../components/GoogleButton";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const login = async () => {
    setError("");
    try {
      const res = await fetch("http://localhost:5000/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const text = await res.text();
        setError(text);
        return;
      }

      const data = await res.json();
      // Сохраняем токен в localStorage
      localStorage.setItem("token", data.token);
      // Перенаправляем в админку категорий
      router.push("/admin/categories");
    } catch (err) {
      console.error(err);
      setError("Ошибка при логине");
    }
  };

  return (
    <div style={{ padding: "50px" }}>
      <h1>Login Admin</h1>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        style={{ display: "block", margin: "10px 0" }}
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        style={{ display: "block", margin: "10px 0" }}
      />
      <button onClick={login}>Login</button>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <GoogleButton></GoogleButton>
    </div>
  );
}
