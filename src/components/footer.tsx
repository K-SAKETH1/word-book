import { Link } from "react-router";
import { Divider } from "@heroui/react";
import { useCookies } from "react-cookie";
import { useState, useEffect } from "react";
function Footer() {
  const currentYear = new Date().getFullYear();
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
    <footer className={`${darkTheme} text-foreground bg-background p-4`}>
      <Divider />
      <div className="container-section py-8 px-5">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:p-8">
          <div>
            <h4 className="text-xl font-semibold">Word Book</h4>
            <p>
              Your modern dictionary companion for everyday learning and
              language exploration.
            </p>
          </div>

          <div>
            <h5 className="text-lg font-medium">Quick Links</h5>
            <ul className="space-y-2">
              <li>
                <Link style={{ color: "#CF2CE7" }} to="/">
                  Home
                </Link>
              </li>
            </ul>
          </div>

          <div className="mb-3 pb-3">
            <h5 className="text-lg font-medium">Legal</h5>
            <ul className="space-y-2">
              <li>
                <Link style={{ color: "#CF2CE7" }} to="/">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link style={{ color: "#CF2CE7" }} to="/">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>
        </div>
        <Divider />
        <div className="mt-5 pt-4 text-center text-sm">
          © {currentYear} Word Book. All rights reserved.
        </div>
      </div>
    </footer>
  );
}

export default Footer;
