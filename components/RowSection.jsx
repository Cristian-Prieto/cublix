import Thumbnail from "./Thumbnail";

export default function RowSection({ setModalInfo, listData, title, section }) {
  return (
    <>
      <h2 className="sm:text-xl text-slate-200 font-bold px-12">{title}</h2>
      <div className="relative flex items-center h-40 overflow-x-scroll overflow-y-hidden scrollbar-none whitespace-nowrap gap-2 -z-0 mb-8 px-12">
        {listData.results?.map((item) => (
          <Thumbnail
            key={item.id}
            item={item}
            handleClick={() => setModalInfo(item)}
            section={section}
          />
        ))}
      </div>
    </>
  );
}
