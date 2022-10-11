import { BASE_IMAGE_URL } from "../utils/images";
import Image from "next/image";

export default function Thumbnail({ item }) {
  return (
    <div className="flex relative items-center transition-all duration-200 ease-out scale-100 hover:scale-125 z-10 hover:z-20 hover:shadow-lg hover:shadow-zinc-900">
      <Image
        key={item.id}
        src={`${BASE_IMAGE_URL}${item.backdrop_path ?? item.poster_path}`}
        alt={item.name}
        layout="fixed"
        width={200}
        height={120}
        className="object-cover absolute cursor-pointer rounded-sm"
      />
    </div>
  );
}
