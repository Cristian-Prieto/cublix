import { useEffect, useState } from "react";
import Modal from "react-modal";
import { useRouter } from "next/router";
import PageLayout from "../../components/PageLayout";
import {
  getMyListFromLocalStorage,
  saveMyListToLocalStorage,
} from "../../utils/localStorage";
import { useAppContext } from "../../hook/useAppContext";
import { BASE_URL, API_KEY } from "../../utils/requests";
import DisplayContainer from "../../components/DisplayContainer";
import ModalLayout from "../../components/ModalLayout";

Modal.setAppElement("#__next");

export default function MyList({ movieGenres, tvGenres }) {
  const router = useRouter();
  const { stateList } = useAppContext();
  const [modalInfo, setModalInfo] = useState("");
  console.log(stateList);
  useEffect(() => {
    saveMyListToLocalStorage(getMyListFromLocalStorage());
  }, []);

  return (
    <>
      <PageLayout section="My list">
        <section className="flex flex-col p-12">
          <DisplayContainer
            title="My favourite things"
            section="my-list"
            list={stateList}
            setModalInfo={setModalInfo}
          />
          {/* {stateList &&
              stateList.map((entry) => (
                <div key={entry.id} className="relative flex justify-center">
                  <Link
                    href={`/my-list/?id=${entry.id}`}
                    as={`/my-list/${entry.id}`}
                  >
                    <a onClick={() => setModalInfo(entry)}>
                      <div className="h-28">
                        <Thumbnail item={entry} />
                      </div>
                    </a>
                  </Link>
                </div>
              ))} */}
        </section>
        <Modal
          className="scrollbar-none"
          //!! pasa a booleano
          isOpen={!!router.query.id}
          onRequestClose={() => router.push("/my-list")}
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
            section={modalInfo.category}
            credits={modalInfo.category === "movies" ? "movie" : "tv"}
            info={modalInfo}
            genres={modalInfo.category === "movies" ? movieGenres : tvGenres}
            tv={modalInfo.category === "tv"}
          />
        </Modal>
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
