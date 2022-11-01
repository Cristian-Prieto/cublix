import Link from "next/link";
import Thumbnail from "./Thumbnail";

export default function DisplayContainer({ list, onClick, title, section }) {
  if (list.length === 0) return null;
  return (
    <>
      <h2 className="text-left mb-4 sm:text-xl text-slate-200 font-bold">
        {title}
      </h2>
      <div className="flex flex-wrap justify-center sm:justify-center gap-8 mb-24 h-full w-full">
        {list &&
          list.map((item) => (
            <div key={item.id} className="relative flex justify-center">
              <Link
                href={
                  section ? `/${section}/?id=${item.id}` : `/?id=${item.id}`
                }
                as={section ? `/${section}/${item.id}` : `/${item.id}`}
              >
                <a onClick={() => onClick(item)}>
                  <div className="h-28">
                    <Thumbnail item={item} />
                  </div>
                </a>
              </Link>
            </div>
          ))}
      </div>
    </>
  );
}
