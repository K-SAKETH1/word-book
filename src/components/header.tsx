import {
  button,
  Button,
  Image,
  Input,
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  NavbarMenu,
  NavbarMenuItem,
  NavbarMenuToggle,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon, faSearch, faSun } from "@fortawesome/free-solid-svg-icons";
import { getWord } from "../actions";
import { Link, useNavigate } from "react-router";
import Search from "./searchbar";
import { color } from "framer-motion";
import { useCookies } from "react-cookie";
export default function Header() {
  const [isToogleOpen, setIsToogleOpen] = useState(false);
  const [word, setWord] = useState("");
  const redirect = useNavigate();
  const [darkTheme, setDarkTheme] = useState(true);
  const [cookie, setCookie, removeCookie] = useCookies(["dark-theme"]);
  function HandleThemeClick() {
    if (darkTheme) {
      setDarkTheme(false);
      setCookie("dark-theme", darkTheme);
    } else {
      setDarkTheme(true);
      setCookie("dark-theme", darkTheme);
    }
  }
  async function HandleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      redirect(`/${word}`);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    // No need to redirect here, as it should only happen on form submission
  }, [word]);

  return (
    <div className="mx-auto max-w-7xl">
      <Navbar
        maxWidth="full"
        className="lg:mb-8 mb-1"
        onMenuOpenChange={setIsToogleOpen}
      >
        <NavbarContent justify="start">
          <Link to="/">
            <NavbarBrand className="flex">
              {cookie["dark-theme"] ? (
                <Image
                  src="/images/logo-dark.svg"
                  height="25"
                  width="25"
                  className="sm:height-35 sm:width-35"
                />
              ) : (
                <Image
                  src="/images/logo.svg"
                  height="25"
                  width="25"
                  className="sm:height-35 sm:width-35"
                />
              )}
              <h3 className="text-2xl font-bold mb-1 ms-1">
                Word <span style={{ color: "#CF2CE7" }}>Book</span>
              </h3>
            </NavbarBrand>
          </Link>
        </NavbarContent>
        <NavbarContent justify="center" className="w-80 hidden lg:flex">
          <NavbarItem className="w-full">
            <form onSubmit={HandleSubmit}>
              <Input
                fullWidth
                startContent={
                  <div className="text-gray-400">
                    <p>
                      <FontAwesomeIcon icon={faSearch} />
                      <span className="m-1">Search book</span>
                    </p>
                  </div>
                }
                onChange={(e) => setWord(e.target.value)}
              />
            </form>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end" className="items-center">
          <NavbarItem className="items-center ">
            <button
              color="primary"
              onClick={HandleThemeClick}
              style={{ color: "#CF2CE7" }}
              className="text-xl"
            >
              {darkTheme ? (
                <FontAwesomeIcon icon={faSun} />
              ) : (
                <FontAwesomeIcon icon={faMoon} />
              )}
            </button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </div>
  );
}
