import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PageLayout from "../../components/PageLayout";
import { BASE_URL, API_KEY } from "../../utils/requests";
import { BASE_IMAGE_URL } from "../../utils/images";
import Image from "next/image";
import Link from "next/link";
import Modal from "react-modal";
import requests from "../../utils/requests";
import RowSection from "../../components/RowSection";
import DisplayContainer from "../../components/DisplayContainer";
import ModalLayout from "../../components/ModalLayout";
import { IoMdInformationCircleOutline } from "react-icons/io";
import { IoPlaySharp } from "react-icons/io5";

Modal.setAppElement("#__next");

export default function Tv({
  genres,
  popular,
  tvNetflixOriginals,
  animation,
  drama,
  documentaries,
  western,
  kids,
  reality,
}) {
  const [modalInfo, setModalInfo] = useState("");
  const [randomTrend, setRandomTrend] = useState(null);
  const router = useRouter();
  const [genreSelected, setGenreSelected] = useState(null);
  const [gridMenuLayout, setGridMenuLayout] = useState(false);

  const changeMenuLayout = () => {
    setGridMenuLayout((prevState) => !prevState);
  };

  useEffect(() => {
    const randomResult =
      popular.results[Math.floor(Math.random() * popular.results.length)];
    setRandomTrend(randomResult);
  }, []);

  const handleSelectedGenre = (genre) => {
    setGenreSelected(genre);
  };

  return (
    <>
      <PageLayout
        section="Tv shows"
        genreSelected={genreSelected}
        setGenreSelected={setGenreSelected}
        genres={genres}
        selectGenre={handleSelectedGenre}
        handleChangeGridMenuLayout={changeMenuLayout}
        gridMenuLayout={gridMenuLayout}
      >
        {randomTrend && (
          <div className="h-96 relative">
            <div className="flex flex-col gap-4 z-10 bottom-0 left-0 absolute md:w-1/2 p-12 pt-4 text-white">
              <h1 className="text-3xl text-white">
                {randomTrend.title || randomTrend.name}
              </h1>
              <p>{randomTrend.overview}</p>
              <div className="flex gap-4">
                <Link href={`/tv/${randomTrend.id}`}>
                  <a className="flex gap-2 font-semibold items-center justify-center rounded-md px-4 py-2 text-black bg-slate-100 bg-opacity-100 hover:bg-opacity-80">
                    <IoPlaySharp className="text-3xl" />
                    <span>Play</span>
                  </a>
                </Link>

                <Link
                  href={`/tv/?id=${randomTrend.id}`}
                  as={`/tv/${randomTrend.id}`}
                >
                  <a
                    onClick={() => setModalInfo(randomTrend)}
                    className="flex gap-2 font-semibold items-center justify-center rounded-md px-4 py-2 text-white bg-zinc-500 hover:bg-zinc-700 bg-opacity-50 hover:bg-opacity-50"
                  >
                    <IoMdInformationCircleOutline className="text-3xl" />
                    <span>Info</span>
                  </a>
                </Link>
              </div>
            </div>

            <Image
              src={`${BASE_IMAGE_URL}${
                randomTrend.backdrop_path ?? randomTrend.poster_path
              }`}
              alt={`image for ${randomTrend.title}`}
              layout="fill"
              objectFit="cover"
            />
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-transparent to-zinc-900" />
          </div>
        )}

        {gridMenuLayout ? (
          <section className="flex flex-col px-12">
            <DisplayContainer
              title="Popular"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? popular.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : popular.results
              }
              section="tv"
            />

            <DisplayContainer
              title="Netflix originals"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? tvNetflixOriginals.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : tvNetflixOriginals.results
              }
              section="tv"
            />

            <DisplayContainer
              title="Animation"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? animation.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : animation.results
              }
              section="tv"
            />

            <DisplayContainer
              title="Drama"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? drama.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : drama.results
              }
              section="tv"
            />

            <DisplayContainer
              title="Documentaries"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? documentaries.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : documentaries.results
              }
              section="tv"
            />

            <DisplayContainer
              title="Western"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? western.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : western.results
              }
              section="tv"
            />

            <DisplayContainer
              title="Kids"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? kids.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : kids.results
              }
              section="tv"
            />

            <DisplayContainer
              title="Reality"
              setModalInfo={setModalInfo}
              list={
                genreSelected
                  ? reality.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : reality.results
              }
              section="tv"
            />
          </section>
        ) : (
          <section className="flex flex-col">
            <RowSection
              title="Popular"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? popular.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : popular.results
              }
              section="tv"
            />

            <RowSection
              title="Netflix originals"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? tvNetflixOriginals.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : tvNetflixOriginals.results
              }
              section="tv"
            />

            <RowSection
              title="Animation"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? animation.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : animation.results
              }
              section="tv"
            />

            <RowSection
              title="Drama"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? drama.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : drama.results
              }
              section="tv"
            />

            <RowSection
              title="Documentaries"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? documentaries.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : documentaries.results
              }
              section="tv"
            />

            <RowSection
              title="Western"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? western.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : western.results
              }
              section="tv"
            />

            <RowSection
              title="Kids"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? kids.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : kids.results
              }
              section="tv"
            />

            <RowSection
              title="Reality"
              setModalInfo={setModalInfo}
              listData={
                genreSelected
                  ? reality.results.filter((original) =>
                      original.genre_ids.includes(genreSelected.id)
                    )
                  : reality.results
              }
              section="tv"
            />
          </section>
        )}

        {router.query.id && (
          <Modal
            className="scrollbar-none"
            //!! pasa a booleano
            isOpen={!!router.query.id}
            onRequestClose={() => router.push("/tv")}
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
              section="tv"
              credits="tv"
              info={modalInfo}
              genres={genres}
              tv={true}
            />
          </Modal>
        )}
      </PageLayout>
    </>
  );
}

export async function getServerSideProps() {
  const [
    genres,
    popular,
    tvNetflixOriginals,
    animation,
    drama,
    documentaries,
    western,
    kids,
    reality,
  ] = await Promise.all([
    fetch(`${BASE_URL}/genre/tv/list?api_key=${API_KEY}&language=en-US`).then(
      (res) => res.json()
    ),
    fetch(requests.fetchPopular).then((res) => res.json()),
    fetch(requests.fetchTvNetflixOriginals).then((res) => res.json()),
    fetch(requests.fetchAnimation).then((res) => res.json()),
    fetch(requests.fetchDrama).then((res) => res.json()),
    fetch(requests.fetchTvDocumentaries).then((res) => res.json()),
    fetch(requests.fetchWestern).then((res) => res.json()),
    fetch(requests.fetchKids).then((res) => res.json()),
    fetch(requests.fetchReality).then((res) => res.json()),
  ]);

  return {
    props: {
      genres: genres.genres,
      popular,
      tvNetflixOriginals,
      animation,
      drama,
      documentaries,
      western,
      kids,
      reality,
    },
  };
}
