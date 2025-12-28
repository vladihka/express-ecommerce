"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { logout } from "../../../lib/auth";

interface Property {
  name: string;
  values: string[];
}

interface Category {
  _id: string;
  name: string;
  parent?: Category;
  properties: Property[];
}

export default function AdminCategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [name, setName] = useState("");
  const [parent, setParent] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const t = localStorage.getItem("token");
    if (!t) {
      router.push("/login");
    } else {
      setToken(t);
    }
  }, []);

  useEffect(() => {
    if (token) fetchCategories();
  }, [token]);

  const fetchCategories = async () => {
    if (!token) {
      logout();
      router.push("/login");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Ошибка от сервера:", text);
        logout();
        router.push("/login");
        return;
      }

      const data = await res.json();
      setCategories(data);
    } catch (err) {
      console.error("Ошибка при загрузке категорий:", err);
      logout();
      router.push("/login");
    }
  };

  const createCategory = async () => {
    if (!token || !name) return;

    try {
      const res = await fetch("http://localhost:5000/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          name,
          parent: parent || undefined,
          properties: [],
        }),
      });
      if (!res.ok) {
        const text = await res.text();
        console.error("Ошибка при создании категории:", text);
        return;
      }

      setName("");
      setParent("");
      fetchCategories();
    } catch (err) {
      console.error("Ошибка при создании категории:", err);
    }
  };

  const deleteCategory = async (id: string) => {
    if (!token) return;

    try {
      const res = await fetch(`http://localhost:5000/api/categories/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!res.ok) {
        const text = await res.text();
        console.error("Ошибка при удалении категории:", text);
        return;
      }

      fetchCategories();
    } catch (err) {
      console.error("Ошибка при удалении категории:", err);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <button
        onClick={() => {
          logout();
          router.push("/login");
        }}
        style={{ marginBottom: "20px" }}
      >
        Выйти
      </button>
      <h1>Категории</h1>

      <div style={{ marginBottom: "20px" }}>
        <input
          placeholder="Название категории"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <select value={parent} onChange={(e) => setParent(e.target.value)}>
          <option value="">Без родителя</option>
          {categories.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
        <button onClick={createCategory}>Создать категорию</button>
      </div>

      <ul>
        {categories.map((cat) => (
          <li key={cat._id}>
            {cat.name} {cat.parent && `(Родитель: ${cat.parent.name})`}
            <button onClick={() => deleteCategory(cat._id)}>Удалить</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
