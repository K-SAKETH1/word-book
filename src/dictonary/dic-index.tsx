import Content from "../components/content";
import Footer from "../components/footer";
import Header from "../components/header";
import Hero from "../components/hero";
import { Divider } from "@heroui/react";
import { useCookies } from "react-cookie";
import { Routes, Route, Link } from "react-router-dom";
import Home from "./dic-home";
import WordDetails from "./dic-word-details";
import { useEffect, useState } from "react";
export const theme = {
  extend: {
    height: {
      lvh: "100vh", // Custom height for full viewport height
    },
  },
};

export default function Index() {
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
      className={`min-h-screen ${darkTheme} text-foreground bg-background w-auto h-lvh`}
    >
      <header>
        <Header />
      </header>
      <section>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/:word" element={<WordDetails />} />
        </Routes>
      </section>
      <footer>
        <Footer />
      </footer>
    </div>
  );
}
