import React, { useState } from "react";
import PopularAnime from "./PopularAnime";
import UpcomingAnime from "./UpcomingAnime";
import AiringAnime from "./AiringAnime";
import { useGlobalContext } from "../context/GlobalContext";
import { IoMenu } from "react-icons/io5";
import { MdBookmarkAdd } from "react-icons/md";

const HomePage = () => {
  const {
    handleSubmit,
    handleChange,
    search,
    getUpcomingAnime,
    getAiringAnime,
  } = useGlobalContext();

  const [render, setRender] = useState("popular");

  const switchComponent = () => {
    switch (render) {
      case "popular":
        return <PopularAnime render={render} />;
      case "upcoming":
        return <UpcomingAnime render={render} />;
      case "airing":
        return <AiringAnime render={render} />;
      default:
        return <PopularAnime render={render} />;
    }
  };

  return (
    <div className="homepage bg-[#0E0E0E] text-white overflow-hidden">
      <header className="header w-full  ">
        <div className="top_header w-screen  px-12 py-6 flex items-center gap-10">
          <div className="logo flex items-center gap-2 text-xl">
            {" "}
            <IoMenu /> Menu{" "}
          </div>
          <div className="search_field flex gap-6 items-center ">
            <form className="search_form" onSubmit={handleSubmit}>
              <div className="input_control relative w-[650px]">
                <input
                  className="text-black rounded-md w-full px-4 py-2 outline-none "
                  type="text"
                  placeholder="Search Anime"
                  value={search}
                  onChange={handleChange}
                />
                <button className="anime_search_btn absolute right-0 top-[50%] text-black px-4 py-2">
                  Search
                </button>
              </div>
            </form>

            <div className="filter_buttons flex gap-4 border-r px-4">
              <button
                onClick={() => setRender("popular")}
                className="popular_filter_btn"
              >
                Popular
              </button>

              <button
                onClick={() => {
                  setRender("upcoming");
                  getUpcomingAnime();
                }}
                className="upcoming_filter_btn"
              >
                Upcoming
              </button>

              <button
                onClick={() => {
                  setRender("airing");
                  getAiringAnime();
                }}
                className="airing_filter_btn"
              >
                Airing
              </button>
            </div>

            <div className="right_corner_items flex items-center gap-6">
              <h1 className="flex items-center gap-2">
                <MdBookmarkAdd /> Watchlist
              </h1>
              {/* <h1><IoNotifications/></h1>  */}
              <button className="signin_btn">Sign In</button>
            </div>
          </div>
        </div>
      </header>
      <div className="bottom_header flex items-center justify-center bg-[#0E0E0E]">
        <h1 className="header_title text-4xl font-semibold">
          {render == "popular"
            ? "Popular Animes"
            : render == "airing"
            ? "Airing Animes"
            : "Upcoming Animes"}
        </h1>
      </div>

      {switchComponent()}
    </div>
  );
};

export default HomePage;
