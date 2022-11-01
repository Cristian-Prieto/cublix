import Link from "next/link";
import { useRouter } from "next/router";
import { IoMdArrowRoundBack } from "react-icons/io";

export default function PageNotFound() {
  const router = useRouter();
  return (
    <>
      <div className="bg-neutral-900 h-screen w-screen">
        <div className="container flex items-center justify-center h-full text-white text-xl">
          <div className="flex flex-col gap-4">
            <Link href="/">
              <h1 className="flex gap-4 items-center cursor-pointer text-zinc-400 hover:text-white">
                <IoMdArrowRoundBack className="text-3xl" />
                Go Home & chill
              </h1>
            </Link>
            <h1 className="flex items-center">
              <span className="pr-4 font-thin">Page not found </span>(._.)
            </h1>
          </div>
          <span className="pl-4 text-6xl">404</span>
        </div>
      </div>
    </>
  );
}
