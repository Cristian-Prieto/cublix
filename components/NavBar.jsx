import Link from "next/link";
import { FaSearch, FaBell } from "react-icons/fa";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";
import Image from "next/image";

export default function NavBar() {
  return (
    <>
      <div className="flex justify-between text-white px-12 p-4 bg-gradient-to-b from-black to-transparent">
        <Link href="/">
          <a className="text-2xl font-bold mr-8 text-red-600 ">CUBLIX</a>
        </Link>
        <div className="flex md:hidden  items-center">
          <span className="flex items-center h-full text-xs">Explore</span>
          <IoCaretDown className="text-xs ml-2" />
        </div>
        <ul className="hidden md:flex justify-center items-center text-xs lg:text-sm font-light space-x-6">
          <Link href="/">
            <a className="hover:opacity-80 trasition duration-300 pl-8">Home</a>
          </Link>
          <Link href="/tv">
            <a className="hover:opacity-80 trasition duration-300">Tv Shows</a>
          </Link>
          <Link href="/movies">
            <a className="hover:opacity-80 trasition duration-300">Movies</a>
          </Link>
          <Link href="/new-and-popular">
            <a className="hover:opacity-80 trasition duration-300">
              New & popular
            </a>
          </Link>
          <Link href="/my-list">
            <a className="hover:opacity-80 trasition duration-300">My list</a>
          </Link>
        </ul>
        <div className="flex justify-center ml-auto items-center gap-6">
          <FaSearch className="text-white text-xl" />
          <span className="hover:opacity-80 trasition duration-300">kids</span>
          <FaBell className="text-xl" />
          <div className="flex justify-center items-center gap-2">
            <Image
              src="https://via.placeholder.com/150"
              alt="profile image"
              className="w-8"
            ></Image>
          </div>
        </div>
      </div>
    </>
  );
}
