import React from "react";
import { useGlobalContext } from "../context/GlobalContext";
import { Link } from "react-router-dom";

const PopularAnime = ({ render }) => {
  const { popularAnime, isSearch, searchResults } = useGlobalContext();

  const popularAnimeRendering = () => {
    if (!isSearch && render == "popular") {
      return popularAnime.map((anime) => {
        return (
          <div
            key={anime.mal_id}
            className="image_wrapper h-[350px] p-[3px] bg-gray-300 rounded-xl"
          >
            <Link to={`/anime/${anime.mal_id}`}>
              <img
                className="images rounded-xl h-full w-full object-cover"
                src={anime.images.jpg.large_image_url}
              />
            </Link>
          </div>
        );
      });
    } else {
      return searchResults.map((anime) => {
        return (
          <div
            key={anime.mal_id}
            className="image_wrapper h-[350px] p-[3px] bg-gray-300 rounded-xl"
          >
            <Link to={`/anime/${anime.mal_id}`}>
              <img
                className="images rounded-xl h-full w-full object-cover"
                src={anime.images.jpg.large_image_url}
              />
            </Link>
          </div>
        );
      });
    }
  };

  return (
    <>
      <div className="popular_anime w-full bg-[#0E0E0E] py-6 px-8 gap-x-8 gap-y-8">
        {popularAnimeRendering()}
      </div>
    </>
  );
};

export default PopularAnime;
