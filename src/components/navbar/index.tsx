/** @format */
import Image from "next/image";
import Link from "next/link";
import { IoIosArrowDown } from "react-icons/io";
import { AiOutlineClose } from "react-icons/ai";
import { FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/lib/hooks/store";
import { getCookie } from "@/lib/util/cookie";
import { authLoginAction } from "@/lib/hooks/user/login/slice";

type NavItem = {
  label: string;
  link?: string;
  children?: NavItem[];
  iconImage?: string;
};

const navItems: NavItem[] = [
  // {
  //   label: "Features",
  //   link: "#",
  //   children: [
  //     { label: "Todo list", link: "#", iconImage: "todoImage" },
  //     { label: "Calendar", link: "#", iconImage: "calendarImage" },
  //     { label: "Reminders", link: "#", iconImage: "remindersImage" },
  //     { label: "Planning", link: "#", iconImage: "planningImage" },
  //   ],
  // },
  // {
  //   label: "Company",
  //   link: "#",
  //   children: [
  //     { label: "History", link: "#" },
  //     { label: "Our Team", link: "#" },
  //     { label: "Blog", link: "#" },
  //   ],
  // },
  // { label: "Careers", link: "#" },
  // { label: "About", link: "#" },
];

export default function Navbar() {
  const dispatch = useDispatch<AppDispatch>();
  const login = useSelector((state: RootState) => state.login);
  const [isSideMenuOpen, setSideMenuOpen] = useState(false);

  useEffect(() => {
    const existingToken = getCookie("access_token");
    if (existingToken) {
      dispatch(authLoginAction.handleCheckLogin(existingToken));
    }
  }, [dispatch, login.isLoggedIn]);

  const openSideMenu = () => {
    setSideMenuOpen(true);
  };

  const closeSideMenu = () => {
    setSideMenuOpen(false);
  };

  return (
    <div className="mx-auto flex w-full max-w-7xl justify-between px-4 py-5 text-sm">
      {/* Left side */}
      <section className="flex items-center gap-10">
        {/* Logo */}
        <Link href="/">
          <Image src={'/images/logo.png'} alt="Logo" width={50} height={50} />
        </Link>


        {/* Display MobileNav if side menu is open */}
        {isSideMenuOpen && <MobileNav closeSideMenu={closeSideMenu} />}

        {/* Regular NavItems for desktop */}
        <div className="hidden md:flex items-center gap-4 transition-all">
          {navItems.map((item, index) => (
            <NavItemLink key={index} item={item} />
          ))}
        </div>
      </section>

      {/* Right side data */}
      {login.isLoggedIn ? (
        <div>Logged in user</div>
      ) : (
        <section className="hidden md:flex items-center gap-8">
          <button className="h-fit text-neutral-400 transition-all hover:text-black/90">
            <Link href="/login">Login</Link>
          </button>
          <button className="h-fit rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
            <Link href="/sign-up">Register</Link>
          </button>
        </section>
      )}

      {/* Mobile menu toggle */}
      <FiMenu onClick={openSideMenu} className="cursor-pointer text-4xl md:hidden" />
    </div>
  );
}

function MobileNav({ closeSideMenu }: { closeSideMenu: () => void }) {
  const login = useSelector((state: RootState) => state.login);

  return (
    <div className="fixed left-0 top-0 flex h-full min-h-screen w-full justify-end bg-black/60 md:hidden">
      <div className="h-full w-[65%] bg-white px-4 py-4">
        <section className="flex justify-end">
          <AiOutlineClose onClick={closeSideMenu} className="cursor-pointer text-4xl" />
        </section>

        <div className="flex flex-col text-base gap-2 transition-all">
          {navItems.map((item, index) => (
            <NavItemLink key={index} item={item} />
          ))}
        </div>

        {login.isLoggedIn ? (
          <LoggedInContent closeSideMenu={closeSideMenu} />
        ) : (
          <LoggedOutContent closeSideMenu={closeSideMenu} />
        )}
      </div>
    </div>
  );
}

type NavItemLinkProps = {
  item: NavItem;
};

function NavItemLink({ item }: NavItemLinkProps) {
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => setIsOpen((prev) => !prev);

  return (
    <Link onClick={toggleOpen} href={item.link ?? "#"} className="relative px-2 py-3 transition-all">
      <p className="flex cursor-pointer items-center gap-2 text-neutral-400 group-hover:text-black">
        <span>{item.label}</span>
        {item.children && (
          <IoIosArrowDown
            className={`rotate-180 transition-all ${isOpen ? "" : "rotate-0"}`}
          />
        )}
      </p>

      {item.children && isOpen && (
        <div className="w-auto  flex-col gap-1   rounded-lg bg-white py-3   transition-all flex">
          {item.children.map((child, idx) => (
            <Link key={idx} href={child.link ?? "#"} className="flex cursor-pointer items-center py-1 pl-6 pr-8 text-neutral-400 hover:text-black">
              {child.iconImage && (
                <Image
                  src={`/images/${child.iconImage}.png`} // Example image path
                  alt="item-icon"
                  width={24}
                  height={24}
                />
              )}
              <span className="whitespace-nowrap pl-3">{child.label}</span>
            </Link>
          ))}
        </div>
      )}
    </Link>
  );
}

function LoggedInContent({ closeSideMenu }: { closeSideMenu: () => void }) {
  return (
    <section className="flex flex-col gap-8 mt-4 items-center">
      <button className="h-fit text-neutral-400 transition-all hover:text-black/90">
        <Link href="/profile">Profile</Link>
      </button>
      <button
        onClick={closeSideMenu}
        className="w-full max-w-[200px] rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90"
      >
        <Link href="/logout">Logout</Link>
      </button>
    </section>
  );
}

function LoggedOutContent({ closeSideMenu }: { closeSideMenu: () => void }) {
  return (
    <section className="flex flex-col gap-8 mt-4 items-center">
      <button className="h-fit text-neutral-400 transition-all hover:text-black/90">
        <Link href="/login">Login</Link>
      </button>
      <button className="w-full max-w-[200px] rounded-xl border-2 border-neutral-400 px-4 py-2 text-neutral-400 transition-all hover:border-black hover:text-black/90">
        <Link href="/sign-up">Register</Link>
      </button>
    </section>
  );
}
