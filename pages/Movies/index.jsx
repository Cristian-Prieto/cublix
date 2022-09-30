import PageLayout from "../../components/PageLayout";
import requests from "../../utils/requests";
import Thumbnail from "../../components/Thumbnail";
import { useRouter } from "next/router";
import { useState } from "react";
import { BASE_URL, API_KEY } from "../../utils/requests";
import Modal from "react-modal";
import ModalLayout from "../../components/ModalLayout";

import { IoCaretDown } from "react-icons/io5";
import { HiMenuAlt1 } from "react-icons/hi";
import { BiBorderAll } from "react-icons/bi";

export default function Movies({
  genres,
  trending,
  netflixOriginals,
  topRated,
  actionMovies,
  comedyMovies,
  horrorMovies,
  romanceMovies,
  documentaries,
}) {
  const trendingList = trending.results;

  const [modalInfo, setModalInfo] = useState("");
  const router = useRouter();
  Modal.setAppElement("#__next");

  return (
    <>
      <PageLayout>
        <div className="flex justify-between">
          <div className="flex items-center space-x-12 text-slate-200">
            <span className="sm:text-3xl font-bold">Movies</span>
            <span className="flex items-center border-2 border-slate-200 text-xs p-1 px-2 gap-4">
              Categories
              <IoCaretDown />
            </span>
            <div></div>
          </div>
          <div className="flex sm:text-md text-slate-200">
            <div className="flex items-center px-4 border border-slate-200">
              <HiMenuAlt1 />
            </div>
            <div className="flex items-center px-4 border border-slate-200">
              <BiBorderAll />
            </div>
          </div>
        </div>
        <h2 className="sm:text-xl text-slate-200 font-bold py-2">Trending</h2>
        <div className="flex relative overflow-x-scroll overflow-y-hidden scrollbar-none whitespace-nowrap gap-4">
          {trendingList?.map((item) => (
            <Thumbnail
              key={item.id}
              item={item}
              handleClick={() => setModalInfo(item)}
            />
          ))}
        </div>
        {router.query.id && (
          <Modal
            className="scrollbar-none"
            isOpen={!!router.query.id}
            onRequestClose={() => router.push("/Movies")}
            style={{
              overlay: {
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(255, 255, 255, 0.15",
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
              },
            }}
          >
            <ModalLayout info={modalInfo} genres={genres} />
          </Modal>
        )}
      </PageLayout>
    </>
  );
}

export async function getServerSideProps() {
  const [
    genres,
    trending,
    netflixOriginals,
    topRated,
    actionMovies,
    comedyMovies,
    horrorMovies,
    romanceMovies,
    documentaries,
  ] = await Promise.all([
    fetch(
      `${BASE_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`
    ).then((res) => res.json()),
    fetch(requests.fetchTrending).then((res) => res.json()),
    fetch(requests.fetchNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchTopRated).then((res) => res.json()),
    fetch(requests.fetchActionMovies).then((res) => res.json()),
    fetch(requests.fetchComedyMovies).then((res) => res.json()),
    fetch(requests.fetchHorrorMovies).then((res) => res.json()),
    fetch(requests.fetchRomanceMovies).then((res) => res.json()),
    fetch(requests.fetchDocumentaries).then((res) => res.json()),
  ]);

  return {
    props: {
      genres: genres.genres,
      trending,
      netflixOriginals,
      topRated,
      actionMovies,
      comedyMovies,
      horrorMovies,
      romanceMovies,
      documentaries,
    },
  };
}
