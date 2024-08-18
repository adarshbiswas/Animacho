import React, {
  createContext,
  useContext,
  useEffect,
  useReducer,
  useState,
} from "react";

const GlobalContext = createContext();

const baseURL = "https://api.jikan.moe/v4";

//actions
const LOADING = "LOADING";
const SEARCH = "SEARCH";
const GET_POPULAR_ANIME = "GET_POPULAR_ANIME";
const GET_UPCOMING_ANIME = "GET_UPCOMING_ANIME";
const GET_AIRING_ANIME = "GET_AIRING_ANIME";
const GET_IMAGES = "GET_IMAGES";

// reducer
const reducer = (state, action) => {
  switch (action.type) {
    case LOADING:
      return { ...state, isLoading: true };
    case SEARCH:
      return { ...state, searchResults: action.payload, isLoading: false };
    case GET_POPULAR_ANIME:
      return { ...state, popularAnime: action.payload, isLoading: false };
    case GET_UPCOMING_ANIME:
      return { ...state, upcomingAnime: action.payload, isLoading: false };
    case GET_AIRING_ANIME:
      return { ...state, airingAnime: action.payload, isLoading: false };
    case GET_IMAGES:
      return { ...state, images: action.payload, isLoading: false };
    default:
      return state;
  }
};

export const GlobalContextProvider = ({ children }) => {
  // inital state props
  const initialState = {
    popularAnime: [],
    upcomingAnime: [],
    airingAnime: [],
    images: [],
    isSearch: false,
    searchResults: [],
    isLoading: false,
  };

  const [state, dispatch] = useReducer(reducer, initialState);
  const [search, setSearch] = useState("");

  const handleChange = (e) => {
    setSearch(e.target.value);
    if (e.target.value === "") {
      state.isSearch = false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (search) {
      searchAnime(search);
      state.isSearch = true;
    } else {
      state.isSearch = false;
      alert("Please enter a valid search term!");
    }
  };

  // fetching popular anime
  const getPopularAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/top/anime?filter=bypopularity`);
    const result = await response.json();
    dispatch({ type: GET_POPULAR_ANIME, payload: result.data });
  };

  //fetching upcoming anime
  const getUpcomingAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/top/anime?filter=upcoming`);
    const result = await response.json();
    dispatch({ type: GET_UPCOMING_ANIME, payload: result.data });
  };

  //fetching airing anime
  const getAiringAnime = async () => {
    dispatch({ type: LOADING });
    const response = await fetch(`${baseURL}/top/anime?filter=airing`);
    const result = await response.json();
    dispatch({ type: GET_AIRING_ANIME, payload: result.data });
  };

  // search anime function
  const searchAnime = async (query) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/anime?q=${query}&order_by_popularity&sort=asc&sfw`
    );
    const result = await response.json();
    dispatch({ type: SEARCH, payload: result.data });
  };

  // get character images

  const getCharacterImage = async (id) => {
    dispatch({ type: LOADING });
    const response = await fetch(
      `https://api.jikan.moe/v4/characters/${id}/pictures`
    );
    const result = await response.json();
    dispatch({ type: GET_IMAGES, payload: result.data });
    console.log(result.data);
  };

  //inital rendering
  useEffect(() => {
    getPopularAnime();
  }, []);

  return (
    <GlobalContext.Provider
      value={{
        ...state,
        handleChange,
        handleSubmit,
        search,
        searchAnime,
        getAiringAnime,
        getUpcomingAnime,
        getPopularAnime,
        getCharacterImage,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(GlobalContext);
};
