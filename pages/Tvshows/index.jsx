import PageLayout from "../../components/PageLayout";
import { IoCaretDown } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";
import { BiBorderAll } from "react-icons/bi";

export default function TvShows() {
  return (
    <>
      <PageLayout>
        <div className="flex justify-between">
          <div className="flex items-center space-x-12 text-slate-200">
            <span className="text-3xl font-bold">Tv Shows</span>
            <span className="flex items-center border-2 border-slate-200 text-xs p-1 px-2 gap-4">
              Categories
              <IoCaretDown />
            </span>
            <div></div>
          </div>
          <div className="flex text-md text-slate-200">
            <div className="flex items-center px-4 border border-slate-200">
              <HiMenuAlt1 />
            </div>
            <div className="flex items-center px-4 border border-slate-200">
              <BiBorderAll />
            </div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
