"use client";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import Members from "./_components/members";
import Timezones from "./_components/timezones";
import { DateContext } from "./_context/date-context";
import { Selection, SelectionContext } from "./_context/selection-context";
import { SongContext } from "./_context/song-context";

export default function Home() {
  const [selection, _setSelection] = useContext(SelectionContext);
  const _setValue = useContext(DateContext)[1];

  const songContext = useContext(SongContext);
  const [duration] = songContext.duration;

  if (!songContext.songs) throw new Error("Songs context not initialized");

  const {
    aceVideo,
    akiVideo,
    jyoruVideo,
    lynVideo,
    sheoVideo,
    playing,
    target,
    on,
    setOn,
  } = songContext.songs;

  const [hoveringOne, setHoveringOne] = songContext.hovering;

  const emptySelection = () => {
    // const _stopFuncs = [
    //   stopElfenlied,
    //   stopFortheglory,
    //   stopIdol,
    //   stopRedsun,
    //   stopSakamoto,
    //   stopUnravel,
    // ];
    // stopFuncs.current.forEach((x) => x());
    // _stopFuncs.forEach((x) => x());
    // stopFuncs.current = [];
    _setSelection(Selection.empty);
    _setValue({ date: undefined, bias: 0 });
    setHoveringOne(null);
    setOn(false);
  };

  // useEffect(() => {
  //   if (!hoveringOne) {
  //     if (typeof jyoruVideo?.current?.currentTime === "number") {
  //       jyoruVideo.current.pause();
  //     }
  //     if (typeof lynVideo?.current?.currentTime === "number") {
  //       lynVideo.current.pause();
  //     }
  //     if (typeof aceVideo?.current?.currentTime === "number") {
  //       aceVideo.current.pause();
  //     }
  //   }
  // }, [hoveringOne]);

  useEffect(() => {
    if (typeof aceVideo?.current?.currentTime === "number") {
      //&& hoveringOne
      // if (target === "sakamoto") aceVideo.current.currentTime = 24;
      if (target === "sakamoto" && playing === "sakamoto")
        aceVideo.current.play();
    }
    if (typeof jyoruVideo?.current?.currentTime === "number") {
      //&& hoveringOne
      if (target === "idol" && playing === "idol") jyoruVideo.current.play();
    }
    if (typeof lynVideo?.current?.currentTime === "number") {
      //&& hoveringOne
      if (target === "redsun" && playing === "redsun") lynVideo.current.play();
    }
    if (typeof sheoVideo?.current?.currentTime === "number") {
      //&& hoveringOne
      if (target === "fortheglory" && playing === "fortheglory")
        sheoVideo.current.play();
    }
    if (typeof akiVideo?.current?.currentTime === "number") {
      //&& hoveringOne
      if (target === "elfenlied" && playing === "elfenlied")
        akiVideo.current.play();
    }
  }, [
    playing,
    hoveringOne,
    aceVideo,
    akiVideo,
    jyoruVideo,
    sheoVideo,
    lynVideo,
    target,
  ]);

  return (
    <motion.main
      className="relative min-h-screen min-w-full flex flex-col bg-zinc-700 text-white p-6 sm:p-12 justify-center items-center max-sm:!bg-[#3f3f46]"
      animate={{
        backgroundColor:
          on && selection === Selection.empty
            ? "rgba(63 63 70 0)"
            : "rgba(63 63 70 1)",
      }}
      transition={{
        duration: duration / 1000,
      }}
    >
      <motion.video
        ref={akiVideo}
        className="absolute h-full w-full z-[5] opacity-0 object-cover max-sm:!opacity-0"
        animate={{
          opacity:
            selection === Selection.empty && on && target === "elfenlied"
              ? 1
              : 0,
        }}
        transition={{
          duration: duration / 1000,
        }}
        autoPlay
        muted
        loop
      >
        <source
          src="https://live.staticflickr.com/video/54018504270/3f7e9f144c/1080p.mp4?s=eyJpIjo1NDAxODUwNDI3MCwiZSI6MTcyNzE3ODU1OCwicyI6IjQ5YmNlMzNkN2E4ZTUyMWYzM2ViZTExMWUwOTQwMjJkNjU1YzRmMmEiLCJ2IjoxfQ"
          type="video/mp4"
        />
      </motion.video>
      <motion.video
        ref={aceVideo}
        className="absolute h-full w-full z-[5] opacity-0 object-cover max-sm:!opacity-0"
        animate={{
          opacity:
            selection === Selection.empty && on && target === "sakamoto"
              ? 1
              : 0,
        }}
        transition={{
          duration: duration / 1000,
        }}
        autoPlay
        muted
        loop
      >
        <source
          src="https://live.staticflickr.com/video/54017163927/4ec1842020/1080p.mp4?s=eyJpIjo1NDAxNzE2MzkyNywiZSI6MTcyNzE3ODUzNCwicyI6ImU4ZWRiOGJjNTQ0YWVmM2YzOGY3OTA2Y2Q3ZTdmZTcwOTkzMTQ5OTQiLCJ2IjoxfQ"
          type="video/mp4"
        />
      </motion.video>
      <motion.video
        ref={jyoruVideo}
        className="absolute h-full w-full z-[5] opacity-0 object-cover max-sm:!opacity-0"
        animate={{
          opacity:
            selection === Selection.empty && on && target === "idol" ? 1 : 0,
        }}
        transition={{
          duration: duration / 1000,
        }}
        autoPlay
        muted
        loop
      >
        <source
          src="https://live.staticflickr.com/video/54018400564/51ec61bf56/1080p.mp4?s=eyJpIjo1NDAxODQwMDU2NCwiZSI6MTcyNzE3ODg1NCwicyI6IjY4NmI4MzZhMWI0Mjc4ZjFiOTg2ODAwYTAyODI1NjRkNmE4ZWEzNTciLCJ2IjoxfQ"
          type="video/mp4"
        />
      </motion.video>
      <motion.video
        ref={lynVideo}
        className="absolute h-full w-full z-[5] opacity-0 object-cover max-sm:!opacity-0"
        animate={{
          opacity:
            selection === Selection.empty && on && target === "redsun" ? 1 : 0,
        }}
        transition={{
          duration: duration / 1000,
        }}
        autoPlay
        muted
        loop
      >
        <source
          src="https://live.staticflickr.com/video/54017165887/ac801b6cdb/1080p.mp4?s=eyJpIjo1NDAxNzE2NTg4NywiZSI6MTcyNzE3ODQ4NiwicyI6IjA3MDk5Njc4ODcxMTMzMzgyNWFlN2NkOWJlZGI3YjkzMTg3NzE2NDMiLCJ2IjoxfQ"
          type="video/mp4"
        />
      </motion.video>
      <motion.video
        ref={sheoVideo}
        className="absolute h-full w-full z-[5] opacity-0 object-cover max-sm:!opacity-0"
        animate={{
          opacity:
            selection === Selection.empty && on && target === "fortheglory"
              ? 1
              : 0,
        }}
        transition={{
          duration: duration / 1000,
        }}
        autoPlay
        muted
        loop
      >
        <source
          src="https://live.staticflickr.com/video/54017165982/7b27a9cdee/1080p.mp4?s=eyJpIjo1NDAxNzE2NTk4MiwiZSI6MTcyNzE4MjA0OCwicyI6ImRhNjU1MTM1YjA4ZGQ2ZjZjOTdiNzlmMTljYzQwOGVjNTAzMjViYzEiLCJ2IjoxfQ"
          type="video/mp4"
        />
      </motion.video>
      <motion.div
        className="absolute h-full w-full bg-blue-200 z-[5] opacity-0 max-sm:!opacity-0"
        animate={{
          opacity:
            on && selection === Selection.empty && target === "unravel" ? 1 : 0,
        }}
        transition={{
          duration: duration / 1000,
        }}
        style={{
          backgroundImage: "url(/sheo.jpg)",
          backgroundPosition: "bottom center",
          backgroundSize: "cover",
        }}
      ></motion.div>
      {selection === Selection.empty && (
        <>
          <motion.h1
            animate={{
              opacity: on ? 0 : 1,
            }}
            transition={{
              duration: duration / 1000,
            }}
            className="text-center text-4xl z-10 font-semibold max-sm:!opacity-100"
          >
            Select your time zone
          </motion.h1>
          <Members />
        </>
      )}
      {selection !== Selection.empty && (
        <h1
          onClick={emptySelection}
          className="mb-5 z-10 font-bold text-3xl max-sm:text-2xl text-center"
        >
          Time Zone Converter
        </h1>
      )}
      {selection !== Selection.empty && (
        <Timezones selectedMember={selection} />
      )}
      {selection !== Selection.empty && (
        <button
          onClick={emptySelection}
          className="mt-3 z-10 hover:text-[#7e72ff] font-semibold"
        >
          Back
        </button>
      )}
      <motion.div
        animate={{
          opacity: on && selection === Selection.empty ? 0 : 1,
        }}
        transition={{
          duration: duration / 1000,
        }}
        className="absolute flex-1 bg-neko-girl bg-neko-girl-corner bg-no-repeat h-[75%] w-0 lg:w-full bottom-0 right-0 max-sm:!opacity-100"
      />
    </motion.main>
  );
}
