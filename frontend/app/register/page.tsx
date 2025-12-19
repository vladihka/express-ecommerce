'use client';
import { useState } from "react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";

export default function RegisterPage() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post("/auth/register", { name, email, password });
      alert("Пользователь создан!");
      router.push("/login");
    } catch (err: any) {
      alert(err.response?.data?.message || "Ошибка");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input placeholder="Имя" value={name} onChange={e => setName(e.target.value)} />
      <input placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
      <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
      <button type="submit">Зарегистрироваться</button>
    </form>
  );
}
