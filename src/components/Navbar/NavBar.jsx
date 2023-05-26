import "./Navbar.css";
import { useState } from "react";
import { Link } from "react-router-dom";
import { SearchWidget } from "./SearchWidget/SearchWidget";
import { CartWidget } from "./CartWidget/CartWidget";
import logo from "../../assets/apple.svg";
import menu from "../../assets/menu.svg";
import close from "../../assets/close.svg";
export const NavBar = () => {
  const links = [
    { id: 2, name: "Mac", url: "mac" },
    { id: 3, name: "iPad", url: "ipad" },
    { id: 4, name: "iPhone", url: "iphone" },
    { id: 5, name: "Watch", url: "watch" },
    { id: 6, name: "Accessories", url: "accessories" },
    { id: 7, name: "Support", url: "support" },
  ];
  const [openNavbar, setOpenNavbar] = useState(false);
  const handleToggleNavbar = () => {
    setOpenNavbar(!openNavbar);
  };
  return (
    <>
      <header className="globalHeader">
        <nav className="globalNavbar">
          <ul className="globalnav-list">
            <li className="nav-link">
              <Link to={`/`}>
                <img src={logo} alt="" />
              </Link>
            </li>
            <li
              className={
                openNavbar
                  ? "globalnav-list-content"
                  : "globalnav-list-content inactive"
              }
            >
              <button className="nav-button" onClick={handleToggleNavbar}>
                <img src={close} alt="" />
              </button>
              <ul className="list-links">
                {links.map((link) => {
                  return (
                    <li key={link.id} className="nav-link">
                      <Link
                        to={
                          link.url == "store" || link.url == "support"
                            ? link.url
                            : `/category/${link.url}`
                        }
                        onClick={handleToggleNavbar}
                      >
                        {link.name}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </li>
            <li className="nav-buttons">
              <SearchWidget />
              <CartWidget />
              <button
                id="menu"
                className="nav-button"
                onClick={handleToggleNavbar}
              >
                <img src={menu} alt="" />
              </button>
            </li>
          </ul>
        </nav>
      </header>
    </>
  );
};
