import { BASE_IMAGE_URL } from "../utils/images";
import Image from "next/image";
import Link from "next/link";

export default function Thumbnail({ item, handleClick, section }) {
  return (
    <Link href={`/${section}/?id=${item.id}`} as={`/${section}/${item.id}`}>
      <a
        onClick={handleClick}
        className="flex items-center transition-all duration-200 ease-out scale-100 hover:scale-125 z-10 hover:z-20 hover:shadow-lg hover:shadow-zinc-900"
      >
        <Image
          key={item.id}
          src={`${BASE_IMAGE_URL}${item.backdrop_path ?? item.poster_path}`}
          alt={item.name}
          layout="fixed"
          width={200}
          height={120}
          className="object-cover cursor-pointer rounded-md"
        ></Image>
      </a>
    </Link>
  );
}
