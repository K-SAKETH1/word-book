import { Spinner } from "@heroui/react";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
export default function Loading() {
  const [cookie, setCookie, removeCookie] = useCookies(["dark-theme"]);
  const [darkTheme, setDarkTheme] = useState("");
  useEffect(() => {
    if (cookie["dark-theme"] == true) {
      setDarkTheme("light");
    } else {
      setDarkTheme("dark");
    }
  });
  return (
    <div
      className={`min-h-screen ${darkTheme} text-foreground bg-background w-auto`}
    >
      <div>
        <Spinner variant="dots" color="primary" />
      </div>
    </div>
  );
}
