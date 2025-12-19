'use client';
import { useEffect, useState } from "react";
import api from "../../lib/api";
import { useRouter } from "next/navigation";

interface Category {
  _id: string;
  name: string;
  parent?: Category;
}

export default function DashboardPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await api.get<Category[]>("/categories", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCategories(res.data);
      } catch (err) {
        alert("Ошибка доступа или токен недействителен");
        router.push("/login");
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Dashboard (Панель пользователя)</h1>
      <ul>
        {categories.map(cat => (
          <li key={cat._id}>
            {cat.name} {cat.parent && `(Родитель: ${cat.parent.name})`}
          </li>
        ))}
      </ul>
    </div>
  );
}
