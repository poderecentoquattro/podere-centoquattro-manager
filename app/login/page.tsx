"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import Image from "next/image";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  async function login(e: React.FormEvent) {
    e.preventDefault();

    setLoading(true);

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    setLoading(false);

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/");
  }

  return (
    <div
  className="min-h-screen flex items-center justify-center"
  style={{
    background:
      "linear-gradient(135deg,#f7faf5,#eef8ef,#f7faf5)",
  }}
>
      <form
        onSubmit={login}
        className="bg-white p-8 rounded-xl shadow-xl w-full max-w-md space-y-4"
      >
        <div className="flex flex-col items-center gap-3">

  <Image
    src="/logo.png"
    alt="Podere Centoquattro"
    width={120}
    height={120}
    priority
  />

  <h1 className="text-4xl font-bold text-green-800 text-center">
    Podere
    <br />
    Centoquattro
  </h1>

</div>

        <p className="text-center text-gray-500">
          Accedi al gestionale
        </p>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border rounded-lg p-3"
          required
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border rounded-lg p-3"
          required
        />

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-[#0F5E37] hover:bg-[#0B4C2C] text-white rounded-xl p-4 text-lg font-semibold transition"
        >
          {loading ? "Accesso..." : "Accedi"}
        </button>
      </form>
    </div>
  );
}