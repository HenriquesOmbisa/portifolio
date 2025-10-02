"use client";
import { useTheme } from "next-themes";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"; // ajuste o caminho conforme teu projeto (shadcn)
import { Sun, Moon } from "lucide-react";

export function ThemeSwitcher() {
  const { theme, setTheme, resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // evitar mismatch SSR (hydratation flash)
  useEffect(() => setMounted(true), []);

  if (!mounted) {
    // returna um placeholder leve no primeiro render (evita diferença entre server/client)
    return <Button aria-label="toggle theme" className="p-2">…</Button>;
  }

  const isDark = (theme ?? resolvedTheme) === "dark";

  return (
    <Button
      variant="ghost"
      size="sm"
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="flex items-center gap-2"
    >
      {isDark ? (
        <>
          <Sun className="w-4 h-4" />
          <span className="hidden sm:inline">Light</span>
        </>
      ) : (
        <>
          <Moon className="w-4 h-4" />
          <span className="hidden sm:inline">Dark</span>
        </>
      )}
    </Button>
  );
}


export function ThemeSwitcher2() {
  const { theme, setTheme } = useTheme();

  return (
    <button
      className="p-2 rounded-md border"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
    >
      {theme === "light" ? "🌙 Dark" : "☀️ Light"}
    </button>
  );
}
