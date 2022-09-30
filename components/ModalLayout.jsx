import Image from "next/image";
import { BASE_IMAGE_URL } from "../utils/images";
import { IoPlaySharp } from "react-icons/io5";
import { IoMdAdd } from "react-icons/io";
import { AiOutlineLike } from "react-icons/ai";
import { useEffect, useState } from "react";

export default function ModalLayout({ info, genres }) {
  const [movieGenres, setMovieGenres] = useState("");
  const actualYear = new Date();

  useEffect(() => {
    const matchingGenres = genres.filter((genre) =>
      info.genre_ids.includes(genre.id)
    );
    const genresNames = matchingGenres.map((genre) => genre.name);
    setMovieGenres(genresNames);
  }, []);

  return (
    <>
      <div className="flex flex-col relative text-white bg-gradient-to-b from-transparent to-zinc-900">
        <Image
          key={info.id}
          src={`${BASE_IMAGE_URL}${info.backdrop_path}`}
          alt={info.name}
          width={600}
          height={450}
          objectFit="cover"
        ></Image>
        <div className="flex flex-col absolute bottom-0 text-xl p-12 gap-4">
          <h2 className="text-3xl drop-shadow-md font-semibold">
            {info.title || info.name}
          </h2>
          <div className="flex gap-4 items-center">
            <button className="flex gap-2 font-semibold rounded-md px-4 py-2 text-black bg-slate-50">
              <IoPlaySharp className="text-3xl" />
              <span>Play</span>
            </button>
            <div className="flex border-2 border-slate-300 rounded-full p-2 backdrop-blur-md">
              <IoMdAdd className="text-xl text-white" />
            </div>
            <div className="flex border-2 border-slate-300 rounded-full p-2 backdrop-blur-md">
              <AiOutlineLike className="text-xl text-white" />
            </div>
          </div>
        </div>
      </div>

      <section className="flex text-white p-12 bg-zinc-900">
        <article className="w-4/6">
          <h3 className="flex gap-4 mb-8">
            <span className="font-bold text-green-500">
              {Math.floor(info.vote_average) * 10}% Match
            </span>
            <span>
              {info.release_date ? info.release_date : actualYear.getFullYear()}
            </span>
          </h3>
          <div className="flex">
            <article className="">{info.overview}</article>
          </div>
        </article>

        <aside className="flex flex-col items-left text-sm gap-4 px-4">
          <h3 className="flex gap-2">
            {movieGenres.length > 0 ? (
              <>
                <span className="text-zinc-500">Genres:</span>
                {movieGenres.map((genre) => (
                  <span key={genre}>{genre}</span>
                ))}
              </>
            ) : null}
          </h3>
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
    </>
  );
}

// export async function getStaticPaths(){
//     const res = await fetch();
//     const trending = await res.json();
//     const trendingList = trending.results;

//     const paths = trendingList.map((movie) => ({
//       params: { id: movie.id.toString() },
//     }));

//     return { paths, fallback: false };
//   }
