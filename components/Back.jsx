import Link from "next/link";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function Back({ section }) {
  return (
    <Link href={section}>
      <a className="text-slate-600 hover:text-slate-100 text-6xl w-full p-4 absolute">
        <IoMdArrowRoundBack />
      </a>
    </Link>
  );
}
