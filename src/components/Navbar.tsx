"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export function Navbar() {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-800 bg-gray-950/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-white transition-colors hover:text-brand-400"
        >
          Shoka
        </Link>
        <div className="flex items-center gap-6">
          <Link
            href="/"
            className={`text-sm transition-colors ${
              pathname === "/"
                ? "text-brand-400 font-medium"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Projects
          </Link>
          <Link
            href="/admin"
            className={`text-sm transition-colors ${
              isAdmin
                ? "text-brand-400 font-medium"
                : "text-gray-400 hover:text-white"
            }`}
          >
            Admin
          </Link>
        </div>
      </div>
    </nav>
  );
}
