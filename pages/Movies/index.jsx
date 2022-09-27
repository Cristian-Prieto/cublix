import PageLayout from "../../components/PageLayout";
import { IoCaretDown } from "react-icons/io5";

export default function Movies() {
  return (
    <>
      <PageLayout>
        <div className="flex justify-between">
          <div className="flex items-center space-x-12 text-slate-200">
            <span className="text-3xl font-bold">Movies</span>
            <span className="flex items-center border-2 border-slate-200 text-xs p-1 px-2 gap-4">
              Categories
              <IoCaretDown />
            </span>
            <div></div>
          </div>
        </div>
      </PageLayout>
    </>
  );
}
