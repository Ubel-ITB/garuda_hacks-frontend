import { useContext, useEffect, useState } from "react";
import { CurrentUserContext } from "../lib/contexts/CurrentUserContext";
import { NavLink } from "react-router-dom";
import { RxHamburgerMenu } from "react-icons/rx";
import { twMerge } from "tailwind-merge";

const Navbar = () => {
  const currentUserContext = useContext(CurrentUserContext);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      setIsScrolled(scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const className = {
    navBarScrolled: twMerge(
      `${isScrolled ? "h-16 backdrop-blur-md bg-white/70 shadow-md" : "h-24"}`,
      ` ${isMobileMenuOpen && "bg-white"}`,
    ),
    buttonScrolled: isScrolled ? "py-2" : "py-4",
  };

  return (
    <header
      className={`fixed left-0 top-0 z-[100] flex w-screen items-center justify-between px-6 font-[500] duration-100 ease-in lg:px-24 ${className.navBarScrolled}`}
    >
      <NavLink to="/">Nav Logo</NavLink>
      <div className="flex gap-4">
        <nav className="hidden items-center justify-center gap-8 md:flex">
          <NavLink to="/" className="hover:text-blue-600">
            Home
          </NavLink>
          <NavLink to="/about" className="hover:text-blue-600">
            About
          </NavLink>
          <button className="group relative flex h-fit items-center gap-1">
            Pages{" "}
            <svg
              width="25"
              height="24"
              viewBox="0 0 25 24"
              className="text-black"
            >
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                fill="black"
              ></path>
            </svg>
            <div className="absolute bottom-0 right-0 h-0 translate-y-[100%] p-2 pt-4 opacity-0 group-hover:h-fit group-hover:opacity-100">
              <div className="flex flex-col items-stretch rounded-lg bg-white p-2 text-start">
                <NavLink
                  to="/reports"
                  className="text-nowrap p-2 hover:text-blue-500"
                >
                  Reports Page
                </NavLink>
                <NavLink
                  to="/news"
                  className="text-nowrap p-2 hover:text-blue-500"
                >
                  News Page
                </NavLink>
              </div>
            </div>
          </button>
        </nav>
        {currentUserContext?.currentUser?.username ? (
          <button className="group relative rounded-full border-2 border-[#4a6cf7] px-6 py-1 hover:bg-[#93a9ff]">
            <p>{currentUserContext?.currentUser?.username?.split(" ")[0]}</p>
            <div className="absolute bottom-0 right-0 h-0 translate-y-[100%] p-2 pt-4 opacity-0 group-hover:h-fit group-hover:opacity-100">
              <div className="flex flex-col items-stretch rounded-lg bg-white p-2 text-start">
                <NavLink
                  to={`/profile/${currentUserContext.currentUser.username}`}
                  className="text-nowrap p-1 pr-2 hover:text-blue-500"
                >
                  Profile
                </NavLink>
              </div>
            </div>
          </button>
        ) : (
          <div className="flex gap-4">
            <NavLink
              to="/auth/sign-up"
              className={`px-6 text-black duration-100 ease-in ${className.buttonScrolled}`}
            >
              <p>Sign Up</p>
            </NavLink>
            <NavLink
              to="/auth/sign-in"
              className={`rounded-md bg-[#4a6cf7] px-6 text-white duration-100 ease-in hover:bg-[#3a56c6] ${className.buttonScrolled}`}
            >
              <p>Sign In</p>
            </NavLink>
          </div>
        )}
        <div className="flex h-full items-center justify-center md:hidden">
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <RxHamburgerMenu size={35} />
          </button>
        </div>
      </div>

      <div
        className={`fixed left-0 top-0 z-50 min-h-screen w-screen bg-white p-6 transition-transform duration-300 ${!isMobileMenuOpen ? "-translate-y-[100%]" : isScrolled ? "translate-y-16" : "translate-y-24"} md:hidden`}
      >
        <nav className="flex flex-col items-center gap-6">
          <NavLink
            to="/"
            className="hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </NavLink>
          <NavLink
            to="/about"
            className="hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            About
          </NavLink>
          <NavLink
            to="/reports"
            className="hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Reports Page
          </NavLink>
          <NavLink
            to="/news"
            className="hover:text-blue-600"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            News Page
          </NavLink>
          {currentUserContext?.currentUser?.username ? (
            <NavLink
              to={`/profile/${currentUserContext.currentUser.username}`}
              className="hover:text-blue-600"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Profile
            </NavLink>
          ) : (
            <>
              <NavLink
                to="/auth/sign-up"
                className="hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign Up
              </NavLink>
              <NavLink
                to="/auth/sign-in"
                className="hover:text-blue-600"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Sign In
              </NavLink>
            </>
          )}
        </nav>
      </div>
    </header>
  );
};

export default Navbar;
