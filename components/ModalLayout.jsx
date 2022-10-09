import Image from "next/image";
import { BASE_IMAGE_URL } from "../utils/images";
import { BASE_URL, API_KEY } from "../utils/requests";
import { IoPlaySharp, IoCaretDown, IoCaretUp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import {
  AiOutlineLike,
  AiOutlineCloseCircle,
  AiOutlinePlayCircle,
} from "react-icons/ai";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAppContext } from "./hooks/useAppContext";

export default function ModalLayout({ info, genres, credits, tv, section }) {
  const [allGenres, setAllGenres] = useState(null);
  const [getCast, setGetCast] = useState(null);
  const [recomendations, setRecomendations] = useState(null);
  const [seasons, setSeasons] = useState(null);
  const [seasonData, setSeasonsData] = useState(null);
  const [actualSeason, setActualSeason] = useState(1);
  const [totalSeasons, setTotalSeasons] = useState(null);
  const [isSeasonsMenuOpen, setIsSeasonsMenuOpen] = useState(false);
  const { addToMyList, removeFromMyList } = useAppContext();
  const actualYear = new Date();
  const router = useRouter();

  const seasonsMenu = () => {
    setIsSeasonsMenuOpen((prevState) => !prevState);
  };

  useEffect(() => {
    const matchingGenres = genres.filter((genre) =>
      info.genre_ids.includes(genre.id)
    );
    const genresNames = matchingGenres.map((genre) => genre.name);
    setAllGenres(genresNames);
  }, []);

  useEffect(() => {
    fetch(
      `${BASE_URL}/${credits}/${info.id}/credits?api_key=${API_KEY}&language=en-US`
    )
      .then((res) => res.json())
      .then((jsonData) => {
        setGetCast(jsonData.cast.map((item) => item.name));
      })
      .catch((err) => console.error(err));
  }, []);

  useEffect(() => {
    if (tv) {
      fetch(`${BASE_URL}/tv/${info.id}?api_key=${API_KEY}&language=en-US`)
        .then((res) => res.json())
        .then((jsonData) => {
          setSeasons(jsonData);
          setTotalSeasons(jsonData.number_of_seasons);
        });
    } else {
      fetch(
        `${BASE_URL}/movie/${info.id}/recommendations?api_key=${API_KEY}&language=en-US&page=1`
      )
        .then((res) => res.json())
        .then((jsonData) => {
          setRecomendations(jsonData.results);
          console.log("recomendations:", jsonData.results);
        })
        .catch((err) => console.error(err));
    }
  }, []);

  useEffect(() => {
    if (seasons) {
      fetch(
        `${BASE_URL}/tv/${seasons.id}/season/${actualSeason}?api_key=${API_KEY}&language=en-US`
      )
        .then((res) => res.json())
        .then((jsonData) => {
          setSeasonsData(jsonData);
          console.log("totalseasons:", totalSeasons);
        });
    }
  }, [seasons, actualSeason]);

  useEffect(() => {
    const closeSeasonsMenu = (event) => {
      if (event.path[0].tagName !== "BUTTON") {
        setIsSeasonsMenuOpen(false);
      }
    };
    document.body.addEventListener("click", closeSeasonsMenu);

    return document.body.addEventListener("click", closeSeasonsMenu);
  }, []);

  return (
    <>
      <div className="flex flex-col relative text-white bg-gradient-to-b from-transparent to-zinc-900">
        <div
          className="z-50 absolute right-8 top-4"
          onClick={() => {
            router.back();
          }}
        >
          <AiOutlineCloseCircle className="text-6xl text-white hover:text-slate-300 cursor-pointer" />
        </div>
        <Image
          key={info.id}
          src={`${BASE_IMAGE_URL}${info.backdrop_path ?? info.poster_path}`}
          alt={info.name}
          width={600}
          height={450}
          objectFit="cover"
        ></Image>
        <div className="flex flex-col absolute bottom-0 text-xl p-12 gap-4">
          <h2 className="text-3xl drop-shadow-2xl">
            {info.title || info.name}
          </h2>

          <div className="flex gap-4 items-center">
            <Link href={`/${section}/${info.id}`}>
              <button className="flex gap-2 font-semibold rounded-md px-4 py-2 text-black bg-slate-50 hover:bg-slate-200">
                <>
                  <IoPlaySharp className="text-3xl" />
                  <span>Play</span>
                </>
              </button>
            </Link>

            <div
              onClick={() => addToMyList(info)}
              className="group flex border-2 border-slate-300 rounded-full p-2 backdrop-blur-md hover:bg-zinc-500 cursor-pointer"
            >
              <IoMdAdd className="text-xl font-bold opacity-50 group-hover:opacity-100 text-white" />
            </div>
            <span onClick={() => removeFromMyList()}>DELETE</span>
            <div className="flex border-2 border-slate-300 rounded-full p-2 backdrop-blur-md">
              <AiOutlineLike className="text-xl text-white" />
            </div>
          </div>
        </div>
      </div>

      <section className="flex text-white p-12 gap-4 bg-zinc-900">
        <article className="w-4/6">
          <h3 className="flex gap-4 mb-8">
            <span className="font-bold text-green-500">
              {Math.floor(info.vote_average) * 10}% Match
            </span>
            {seasons ? (
              <span>{seasons.first_air_date.slice(0, 4)}</span>
            ) : (
              <span>
                {info.release_date
                  ? info.release_date
                  : actualYear.getFullYear()}
              </span>
            )}

            {seasons && (
              <span>
                {seasons.number_of_seasons}
                {seasons.number_of_seasons > 1 ? " Seasons" : " Season"}
              </span>
            )}
          </h3>
          <div className="flex">
            <article className="">{info.overview}</article>
          </div>
        </article>

        <aside className="flex w-2/6 flex-col items-left text-sm gap-4 px-4">
          {getCast && getCast ? (
            <h3 className="text-zinc-500">
              Cast:
              <span className="pl-2 text-white">
                {getCast.slice(0, 6).toString()}
              </span>
            </h3>
          ) : null}
          {allGenres && allGenres.length > 0 ? (
            <h3 className="text-zinc-500">
              Genres:
              <span className="pl-2 text-white">{allGenres.toString()}</span>
            </h3>
          ) : null}
          <h3 className="flex gap-2">
            <span className="text-zinc-500">Original language:</span>
            <span>{info.original_language}</span>
          </h3>
          <h3 className="flex gap-2">
            <span className="text-zinc-500">Votes:</span>
            <span>{info.vote_average}</span>
          </h3>
        </aside>
      </section>
      {recomendations && (
        <section className="bg-zinc-900 p-12">
          <h2 className="text-2xl font-bold text-white mb-4">Recomended</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 text-white gap-6">
            {recomendations.map((recomend) => (
              <div
                key={recomend.id}
                className="group relative overflow-hidden rounded-md bg-zinc-800 hover:bg-zinc-600 transition duration-200 cursor-pointer"
              >
                <Link href={`/${section}/${recomend.id}`}>
                  <div className="text-xs text-slate-400 transition duration-500 absolute z-50 flex w-full items-center justify-center text-center h-32">
                    <AiOutlinePlayCircle className="text-6xl opacity-0 group-hover:opacity-100 hover:text-slate-100" />
                  </div>
                </Link>

                <Image
                  src={`${BASE_IMAGE_URL}${
                    recomend.backdrop_path ?? recomend.poster_path
                  }`}
                  alt={recomend.title}
                  width={300}
                  height={180}
                ></Image>
                <div className="flex flex-col gap-2 p-4">
                  <h3 className="font-bold">{recomend.title}</h3>
                  <span className="font-thin">
                    {recomend.release_date
                      ? info.release_date.slice(0, 4)
                      : actualYear.getFullYear()}
                  </span>
                  <p className="mt-4 text-sm max-h-20 overflow-y-scroll scrollbar-none text-zinc-300">
                    {recomend.overview}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      )}

      {seasons && (
        <div className="px-12 flex flex-col relative gap-2 bg-zinc-900">
          <h2 className="flex justify-between text-2xl font-bold mb-4 text-white">
            <span>Chapters</span>
            <div className="flex flex-col place-items-end absolute right-12">
              <div className="flex">
                <button
                  onClick={seasonsMenu}
                  className="flex w-48 gap-8 items-center justify-center rounded-md border border-zinc-500 bg-zinc-800 font-normal text-xl px-4 py-2"
                >
                  season {actualSeason}
                  {seasons.number_of_seasons > 1 && (
                    <IoCaretDown className="text-lg ml-auto" />
                  )}
                </button>
              </div>
              {seasons.number_of_seasons > 1 && isSeasonsMenuOpen && (
                <div className="flex flex-col items-center rounded-sm border border-zinc-500 bg-zinc-800 font-normal text-xl mb-2 z-50">
                  {[...Array(totalSeasons).keys()].map((item) => (
                    <span
                      key={item}
                      onClick={() => setActualSeason(item ?? item + 1)}
                      className="w-full px-4 py-2 hover:bg-zinc-500 cursor-pointer"
                    >
                      Season {totalSeasons === 1 ? null : item}
                      <span className="text-sm pl-4 font-thin">
                        ({seasons.number_of_seasons} episodes)
                      </span>
                    </span>
                  ))}
                </div>
              )}
            </div>
          </h2>

          {seasonData &&
            seasonData.episodes.map((episode) => (
              <div
                key={episode.id}
                className="group relative flex items-center px-8 py-4 gap-4 text-white bg-zinc-900 border-t border-zinc-700"
              >
                <span className="text-xl">{episode.episode_number}</span>
                <div className="relative h-20 min-w-[8rem] cursor-pointer">
                  <Link href={`/${section}/${info.id}`}>
                    <div className="text-xs text-slate-400 transition duration-500 absolute z-50 flex w-full items-center justify-center text-center h-full">
                      <AiOutlinePlayCircle className="text-6xl opacity-0 group-hover:opacity-80 hover:text-slate-100" />
                    </div>
                  </Link>
                  <Image
                    src={
                      episode.still_path
                        ? `${BASE_IMAGE_URL}${episode.still_path}`
                        : `${BASE_IMAGE_URL}${
                            info.poster_path ?? info.backdrop_path
                          }`
                    }
                    alt={episode.id}
                    layout="fill"
                    className="rounded-md mr-auto object-cover"
                  ></Image>
                </div>
                <div className="flex flex-col w-full">
                  <h3 className="flex justify-between mb-2">
                    <span className="auto max-w-xs">{episode.name}</span>
                    {episode.runtime && (
                      <span className="text-zinc-100">
                        {episode.runtime} min.
                      </span>
                    )}
                  </h3>

                  <span className="text-sm max-w-xs max-h-20 overflow-hidden text-zinc-400">
                    {episode.overview}
                  </span>
                </div>
              </div>
            ))}
        </div>
      )}
    </>
  );
}
