import Link from "next/link";
import Thumbnail from "./Thumbnail";

export default function RowSection({ onClick, listData, title, section }) {
  if (listData.length === 0) return null;
  return (
    <>
      <h2 className="sm:text-xl text-slate-200 font-bold px-12">{title}</h2>
      <div className="relative flex items-center h-40 snap-end overflow-x-scroll overflow-y-hidden scrollbar-none whitespace-nowrap gap-4 -z-0 mb-8 px-12">
        {listData.map((item) => (
          <Link
            key={item.id}
            href={section ? `/${section}/?id=${item.id}` : `/?id=${item.id}`}
            as={section ? `/${section}/${item.id}` : `/?id=${item.id}`}
            scroll={false}
            replace={true}
            shallow={true}
          >
            <a onClick={() => onClick(item)}>
              <Thumbnail item={item} />
            </a>
          </Link>
        ))}
      </div>
    </>
  );
}
