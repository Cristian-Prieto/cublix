import Link from "next/link";
import { FaSearch, FaBell } from "react-icons/fa";
import { IoCaretDown, IoCaretUp } from "react-icons/io5";

export default function NavBar() {
  return (
    <>
      <div className="flex justify-between text-white px-12 p-4 bg-gradient-to-b from-black to-transparent">
        <ul className="hidden sm:flex justify-center items-center text-sm font-light space-x-6">
          <Link href="/">
            <a className="text-2xl font-bold text-red-600">CUBLIX</a>
          </Link>
          <Link href="/">
            <a className="hover:opacity-80 trasition duration-300 pl-8">Home</a>
          </Link>
          <Link href="/Tv">
            <a className="hover:opacity-80 trasition duration-300">Tv Shows</a>
          </Link>
          <Link href="/Movies">
            <a className="hover:opacity-80 trasition duration-300">Movies</a>
          </Link>
          <Link href="/New&Popular">
            <a className="hover:opacity-80 trasition duration-300">
              New & popular
            </a>
          </Link>
          <Link href="/MyList">
            <a className="hover:opacity-80 trasition duration-300">My list</a>
          </Link>
        </ul>
        <div className="flex justify-center items-center gap-6">
          <FaSearch className="text-white text-xl" />
          <span className="hover:opacity-80 trasition duration-300">kids</span>
          <FaBell className="text-xl" />
          <div className="flex justify-center items-center gap-2">
            <img
              src="https://via.placeholder.com/150"
              alt="profile image"
              className="w-8"
            ></img>
            <IoCaretDown className="text-xs" />
          </div>
        </div>
      </div>
    </>
  );
}
