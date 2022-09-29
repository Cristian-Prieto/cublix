import { API_KEY } from "../utils/requests";
import { BASE_IMAGE_URL } from "../utils/images";
import Image from "next/image";
import Link from "next/link";

export default function Thumbnail({ item, handleClick }) {
  return (
    <Link href={`/Movies/?id=${item.id}`} as={`/Movies/${item.id}`}>
      <a
        onClick={handleClick}
        className="transition h-32 duration-200 ease-out scale-100 hover:scale-125"
      >
        <Image
          key={item.id}
          src={`${BASE_IMAGE_URL}${item.backdrop_path}`}
          alt={item.name}
          layout="fixed"
          width={220}
          height={200}
          className="object-cover cursor-pointer"
        ></Image>
      </a>
    </Link>
  );
}
