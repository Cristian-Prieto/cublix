import PageLayout from "../../components/PageLayout";
import { IoCaretDown } from "react-icons/io5";
import Thumbnail from "../../components/Thumbnail";
import { getMyListFromLocalStorage } from "../../utils/localStorage";
import { useEffect, useState } from "react";
import ModalLayout from "../../components/ModalLayout";
import Modal from "react-modal";
import { BASE_URL, API_KEY } from "../../utils/requests";
// import useRouter from "next/router";

export default function MyList({ movieGenres, tvGenres }) {
  // const router = useRouter();
  const [modalInfo, setModalInfo] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [myList, setMyList] = useState(getMyListFromLocalStorage());
  useEffect(() => {
    setMyList(getMyListFromLocalStorage());
  }, []);

  const toggleModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };

  return (
    <>
      <PageLayout>
        <div className="flex justify-between">
          <div className="flex items-center space-x-12 text-slate-200">
            <span className="text-3xl font-bold">My list</span>
            <span className="flex items-center border-2 border-slate-200 text-xs p-1 px-2 gap-4">
              Categories
              <IoCaretDown />
            </span>
          </div>
        </div>
        <section className="flex w-full">
          <div className="grid grid-cols-6 w-full gap-4">
            {myList &&
              myList.map((entry) => (
                <div key={entry.id}>
                  <Thumbnail
                    handleClick={() => setModalInfo(entry)}
                    item={entry}
                    section={entry.category === "tv" ? "tv" : "movies"}
                  />
                  <Modal
                    className="scrollbar-none"
                    isOpen={isModalOpen}
                    onRequestClose={() => toggleModal()}
                    style={{
                      overlay: {
                        position: "fixed",
                        top: 0,
                        left: 0,
                        right: 0,
                        bottom: 0,
                        backgroundColor: "rgba(0, 0, 0, 0.75",
                        zIndex: 50,
                      },
                      content: {
                        position: "absolute",
                        top: "40px",
                        left: "0",
                        right: "0",
                        marginLeft: "auto",
                        marginRight: "auto",
                        bottom: "0",
                        border: "none",
                        maxWidth: "800px",
                        background: "#000",
                        overflow: "auto",
                        WebkitOverflowScrolling: "touch",
                        borderRadius: "8px",
                        outline: "none",
                        padding: "0",
                        boxShadow: "0px 0px 25px 8px rgba(0,0,0,0.5)",
                      },
                    }}
                  >
                    <ModalLayout
                      info={modalInfo}
                      genres={
                        entry.category === "movies" ? movieGenres : tvGenres
                      }
                      credits={entry.category === "movies" ? "movie" : "tv"}
                      tv={entry.category === "tv" ? true : false}
                      section={entry.category}
                    />
                  </Modal>
                </div>
              ))}
          </div>
        </section>
      </PageLayout>
    </>
  );
}

export async function getServerSideProps() {
  const [movieGenres, tvGenres] = await Promise.all([
    fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    ).then((res) => res.json()),
    fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
  ]);

  return {
    props: { movieGenres: movieGenres.genres, tvGenres: tvGenres.genres },
  };
}
