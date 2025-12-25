"use client";
import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import LogoutButton from "../../components/LogoutButton";

interface AdminLayoutProps {
  children: ReactNode;
}

export default function AdminLayout({ children }: AdminLayoutProps) {
  const router = useRouter();
  const [isClient, setIsClient] = useState(false);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setIsClient(true); // убедились, что на клиенте
    const token = localStorage.getItem("token");
    if (!token) {
      router.push("/login"); // если токена нет → редирект
    } else {
      setToken(token); // токен есть → показываем страницу
    }
  }, []);

  if (!isClient || !token) return null; // пока проверка не завершена → не рендерим

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      <aside style={{ width: "200px", padding: "20px", background: "#f0f0f0" }}>
        <h2>Admin Panel</h2>
        <nav>
          <ul style={{ listStyle: "none", padding: 0 }}>
            <li>
              <Link href="/admin">Главная</Link>
            </li>
            <li>
              <Link href="/admin/categories">Категории</Link>
            </li>
            <li>
              <LogoutButton></LogoutButton>
            </li>
          </ul>
        </nav>
      </aside>
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>
    </div>
  );
}
