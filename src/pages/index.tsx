import Card from "@/components/Card";
import React, { useMemo, useState } from "react";
import { useEffect, useCallback } from "react";
import { useAppDispatch, useAppSelector } from "@/hooks";
import { filter, setImages, uncheck } from "@/counter/imageSlice";
import { scoreIncrement, scoreReset } from "@/counter/counterSlice";
import axios from "axios";

export default function Home() {
  const [initialImageCount, setInitialImageCount] = useState(4);
  const [round, setRound] = useState(1); // current round

  const dispatch = useAppDispatch();

  const getImages = useCallback(
    async (amount: number) => {
      try {
        const response = await axios.get(`https://api.nekosapi.com/v3/images/random?is_animated=false&limit=${amount}&rating=safe`);
        dispatch(setImages(response.data.items));
      } catch (error) {
        console.error("Error occurred while fetching image:", error);
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getImages(initialImageCount);
  }, [dispatch]); // Empty dependency array ensures this effect runs only once on mount

  const score = useAppSelector((state) => state.counter.value);
  const images = useAppSelector((state) => state.image.value);

  const handleClick = useCallback(() => {
    dispatch(scoreIncrement());
  }, [dispatch]);

  const displayedImages = useMemo(() => {
    return images.slice(0, initialImageCount / round);
  }, [images, initialImageCount, round]);

  useEffect(() => {
    if (score >= initialImageCount / round / 2) {
      dispatch(scoreReset());
      dispatch(filter());
      dispatch(uncheck());
      setRound((prevRound) => prevRound + 1); // Update initialImageCount for the next round
    }
  }, [score, dispatch, round, initialImageCount]);
  return (
    <>
      <div className="flex justify-start bg-slate-950 h-screen flex-col overflow-hidden">
        <h1 className="text-3xl text-white font-bold text-center py-4">Choose One!</h1>
        <div className={`flex justify-around h-full items-center bg-slate-500 flex-col md:flex-row`}>
          {displayedImages.length > 1 ? (
            <>
              <Card image={displayedImages[score]} onClick={handleClick} />
              <h2 className="text-center text-white text-xl font-medium py-2 px-8">
                Score <br />
                {score}
              </h2>
              <Card image={displayedImages[(displayedImages.length - 1 - score) % displayedImages.length]} onClick={handleClick} />
            </>
          ) : (
            <>
              <button
                className="font-bold text-white text-center rounded-lg py-2"
                onClick={() => {
                  getImages(initialImageCount);
                  dispatch(scoreReset());
                  setRound(1);
                }}
              >
                Reset
              </button>
              <p className="font-bold text-center py-2">WINNER</p>
              <Card image={displayedImages[0]} disabled={true} onClick={() => {}} />
            </>
          )}
        </div>
      </div>
    </>
  );
}
