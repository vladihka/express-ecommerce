import Image from "next/image";
import Link from "next/link";
import GoogleButton from "../components/GoogleButton";

export default function Home() {
  return (
    <div>
      <h1>Welcome to the E-commerce App</h1>
      <Link href="/register">
        <button>Register</button>
      </Link>
      <Link href="/login">
        <button>Login</button>
      </Link>
      <GoogleButton></GoogleButton>
    </div>
  );
}
