"use client";
import Progress from "@/components/progress";
import { Button } from "@/components/tremor/Button";
import Image from "next/image";
import { useContext, useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";
import { SongContext } from "./_context/song-context";

export default function Loader({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [progress, setProgress] = useState(0);
  const [maxProgress, setMaxProgress] = useState(0);
  const [confirmed, setConfirmed] = useState(false);
  const songContext = useContext(SongContext);
  const [catReady, setCatReady] = useState(false);

  if (!songContext.songs) throw Error("Songs context not initialized");

  const {
    soundElfenlied,
    soundFortheglory,
    soundIdol,
    soundRedsun,
    soundSakamoto,
    soundUnravel,
  } = songContext.songs;

  useEffect(() => {
    if (progress >= 100) return;

    const sounds = [
      soundElfenlied,
      soundFortheglory,
      soundIdol,
      soundRedsun,
      soundSakamoto,
      soundUnravel,
    ];

    const newProgress = sounds.reduce(
      (acc, curr) => (curr?.state() === "loaded" ? acc + 10 : acc),
      0
    );

    // setProgress(newProgress);
    // const timeout = setTimeout(() => {
    setProgress(() => Math.min(Math.min(newProgress, maxProgress), 100));
    // }, 300);

    // return () => clearTimeout(timeout);
  }, [
    soundElfenlied,
    soundFortheglory,
    soundIdol,
    soundRedsun,
    soundSakamoto,
    soundUnravel,
    maxProgress,
    progress,
  ]);

  useEffect(() => {
    if (progress === 60) return setProgress(100);
    if (progress >= 100) return;

    const timeout = setTimeout(() => {
      const rng = Math.floor(Math.random() * 25) + 1; // from 1 to 9
      setMaxProgress((x) => x + rng);
    }, 500);

    return () => clearTimeout(timeout);
  }, [maxProgress, progress]);

  useEffect(() => {
    if (progress !== 100 || catReady) return;

    const timeout = setTimeout(() => {
      setCatReady(true);
    }, 500);

    return () => clearTimeout(timeout);
  }, [progress, catReady]);

  const ready = progress === 100;

  return (
    <div
      className={twMerge(
        "h-screen w-full",
        (!ready || !confirmed) && "overflow-hidden"
      )}
    >
      <div
        className={twMerge(
          "absolute bg-zinc-700 z-50 w-full h-full flex flex-col gap-3 justify-center items-center text-center transition-all duration-1000",
          ready && confirmed ? "opacity-0 -z-10" : "opacity-100"
        )}
      >
        <div className="h-[5.5rem] flex justify-center items-center w-32">
          <Image
            width={128}
            height={79}
            alt="little pixel cat"
            src={catReady ? "/cat-ready.gif" : "/cat-walk.gif"}
            className="w-32"
          />
        </div>
        <div className="max-sm:w-64 w-96 mt-1">
          <Progress value={progress} />
        </div>
        <div className="h-12 flex justify-center items-center w-32">
          {catReady && (
            <Button
              className="bg-[#ad6226] hover:bg-[#6c492c]"
              onClick={() => setConfirmed(true)}
            >
              Ready
            </Button>
          )}
        </div>
      </div>
      {children}
    </div>
  );
}
