import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useGlobalContext } from "../context/GlobalContext";

const Gallery = () => {
  const { id } = useParams();

  const { getCharacterImage, images } = useGlobalContext();
  const [index, setIndex] = useState(0);

  const handleClick = (ind) => {
    setIndex(ind);
  };

  useEffect(() => {
    getCharacterImage(id);
  }, [id]);

  return (
    <div className="gallery text-white w-full h-screen px-14 ">
      <div className="images w-full h-full flex flex-col items-center justify-center">
        <div className="large_img p-1 bg-gray-200 rounded-md">
          <img
            className="h-[400px]"
            src={images[index]?.jpg.image_url}
            alt=""
          />
        </div>
        <div className="small_img flex gap-3 mt-14 p-1">
          {images.map((img, ind) => {
            return (
              <div
                className="image_container"
                onClick={() => handleClick(ind)}
                key={ind}
              >
                <img
                  className="h-28 object-cover cursor-pointer rounded-md"
                  src={img?.jpg.image_url}
                  style={{
                    border:
                      ind == index ? "3px solid #27AE60" : "3px solid #e5e7eb",
                    opacity: ind == index ? "70%" : "100%",
                  }}
                  alt=""
                />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Gallery;
