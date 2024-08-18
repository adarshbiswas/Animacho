import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { BsDot } from "react-icons/bs";
import { GiPlayButton } from "react-icons/gi";
import { MdPlaylistAdd } from "react-icons/md";

const AnimeItem = () => {
  const { id } = useParams();

  //state
  const [animeInfo, setAnimeInfo] = useState({});
  const [castDetails, setCastDetails] = useState([]);
  const [showMore, setShowMore] = useState(false);
  const [showMoreChar, setShowMoreChar] = useState(false);

  //   //all properties from Anime
  const {
    title,
    title_english,
    title_japanese,
    synopsis,
    trailer,
    duration,
    type,
    aired,
    season,
    images,
    rank,
    score,
    scored_by,
    popularity,
    status,
    rating,
    source,
    year,
    episodes,
  } = animeInfo;

  // fetch anime info by Id
  const getAnimeInfo = async (animeId) => {
    const response = await fetch(`https://api.jikan.moe/v4/anime/${animeId}`);
    const result = await response.json();
    setAnimeInfo(result.data);
  };

  //get cast info
  const getCastInfo = async (animeId) => {
    const response = await fetch(
      `https://api.jikan.moe/v4/anime/${animeId}/characters`
    );
    const result = await response.json();
    setCastDetails(result.data);
  };

  //initial render
  useEffect(() => {
    getAnimeInfo(id);
    getCastInfo(id);
  }, []);

  return (
    <>
      <div className="anime_item w-full min-h-screen text-white overflow-hidden ">
        <div className="main w-full bg-[#0E0E0E] ">
          <div className="background_poster relative w-full h-[600px] rounded-b-3xl ">
            <img
              className="bg_poster w-screen h-full object-cover rounded-b-3xl "
              src={images?.jpg.large_image_url}
              alt=""
            />
            <div className="main_container backdrop-blur-md absolute z-99 top-0 left-0 flex w-full h-full rounded-b-3xl ">
              <div className="left_container bg-black/20 h-full w-[75%] py-12 px-10 flex rounded-bl-3xl-3xl">
                <div className="left_inner w-[25%]flex justify-center">
                  <img
                    className="h-[320px] w-[220px] rounded-lg"
                    src={images?.jpg.large_image_url}
                    alt=""
                  />
                </div>
                <div className="right_inner w-[75%] flex flex-col gap-2 px-10">
                  <div className="routes flex gap-2 font-extralight text-gray-300">
                    <h3 className="flex items-center ">
                      Home <BsDot />
                    </h3>
                    <h3 className="flex items-center">
                      Anime <BsDot />
                    </h3>
                    <h3 className="">{title_english}</h3>
                  </div>

                  <h1 className="main_title text-4xl font-medium pt-4">
                    {title_english}
                  </h1>
                  <div className="sub_info flex gap-3 pt-4 rounded-xl text-sm">
                    <h2 className="flex items-center gap-1">
                      Ep : {episodes} <BsDot />
                    </h2>
                    <h2 className="flex items-center gap-1">
                      {type} <BsDot />
                    </h2>
                    <h2 className="">{duration}</h2>
                  </div>
                  <div className="watch_btns pt-4 flex gap-3">
                    <a href="#trailer">
                      <button className="btns px-5 py-2 bg-pink-300 text-black rounded-full border-none outline-none flex items-center gap-2">
                        <GiPlayButton /> Watch Trailer
                      </button>{" "}
                    </a>
                    <button className="btns px-5 py-2 bg-white text-black rounded-full border-none outline-none flex items-center gap-2">
                      <MdPlaylistAdd />
                      Add to fav
                    </button>
                  </div>
                  <div className="para pt-4">
                    <p className="synopsis text-sm font-light">
                      {showMore
                        ? synopsis
                        : synopsis?.substring(0, 450) + "..."}
                      <button
                        className="font-semibold"
                        onClick={() => {
                          setShowMore(!showMore);
                        }}
                      >
                        {showMore ? " show less." : " Read more"}
                      </button>
                    </p>
                  </div>
                </div>
              </div>
              <div className="right_container w-[25%] flex items-center px-6">
                <div className="flex flex-col gap-2 text-sm">
                  <h2>
                    Japanese: {title_japanese} ({title})
                  </h2>
                  <h2>Year released: {year}</h2>
                  <h2>Aired: {aired?.string}</h2>
                  <h2>Score: {score}</h2>
                  <h2>Rank: {rank}</h2>
                  <h2>Duration: {duration}</h2>
                  <h2>Status: {status}</h2>
                  <div className="bottom_right_container pt-2">
                    <h1>genre : action, thriller, adult</h1>
                  </div>
                  <div className="bottom_right_container pt-2">
                    <h1>Producers: MAPPA</h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* bottom page */}

        <div className="bottom_page w-full py-10 bg-[#0E0E0E] text-white">
          <div className="character_box w-full px-12">
            <div className="show_more_char w-full flex justify-between items-center ">
              <h1 className="text-2xl font-medium ">Charaters</h1>
              <button
                className="show_more_char pr-14"
                onClick={() => setShowMoreChar(!showMoreChar)}
              >
                {showMoreChar ? "show less" : "show more"}
              </button>
            </div>

            <div className="character_items mt-10">
              {showMoreChar
                ? castDetails?.map((cast, index) => {
                    const { role } = cast;
                    const { images, name, mal_id } = cast.character;

                    return (
                      <Link to={`/characters/${mal_id}`} key={index}>
                        <div className="cast_item flex gap-8 pl-4 py-2 w-64 bg-white/10 rounded-lg">
                          <img
                            className="h-[60px] w-[60px] rounded-full object-cover"
                            src={images?.jpg.image_url}
                            alt=""
                          />
                          <div className="cast_item_text flex flex-col justify-center gap-2 text-sm">
                            <h2>{name}</h2>
                            <h2 className="text-gray-100/80">{role}</h2>
                          </div>
                        </div>
                      </Link>
                    );
                  })
                : castDetails?.slice(0, 8).map((cast, index) => {
                    const { role } = cast;
                    const { images, name, mal_id } = cast.character;

                    return (
                      <Link to={`/characters/${mal_id}`} key={index}>
                        <div className="cast_item flex gap-8 pl-4 py-2 w-64 bg-white/10 rounded-lg">
                          <img
                            className="h-[60px] w-[60px] rounded-full object-cover"
                            src={images?.jpg.image_url}
                            alt=""
                          />
                          <div className="cast_item_text flex flex-col justify-center gap-2 text-sm">
                            <h2>{name}</h2>
                            <h2 className="text-gray-100/80">{role}</h2>
                          </div>
                        </div>
                      </Link>
                    );
                  })}
            </div>
          </div>

          {/* trailer */}
          <div className="trailer mt-14 w-full px-12 pb-16">
            <h1 className="text-2xl font-medium">Trailer</h1>
            <div
              className="trailer_container rounded-xl w-full mt-10 flex items-center justify-center"
              id="trailer"
            >
              {trailer?.embed_url && (
                <iframe
                  className=" rounded-lg "
                  src={trailer?.embed_url}
                  title="Inline frame example"
                  width="800"
                  height="450"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AnimeItem;
