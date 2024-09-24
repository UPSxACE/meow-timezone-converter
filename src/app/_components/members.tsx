"use client";
import { motion } from "framer-motion";
import { useContext, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Selection, SelectionContext } from "../_context/selection-context";
import { SongContext } from "../_context/song-context";

export default function Members() {
  const _setSelection = useContext(SelectionContext)[1];

  const setSelection = (selection: string) => () => {
    const newSelection = (() => {
      switch (selection) {
        case "Ace":
          return Selection.ace;
        case "Aki":
          return Selection.aki;
        case "Sheo":
          return Selection.sheo;
        case "Jyoru":
          return Selection.jyoru;
        case "Lyn":
          return Selection.lyn;
        default:
          return Selection.empty;
      }
    })();

    _setSelection(newSelection);
  };

  const songContext = useContext(SongContext);
  const [duration, setDuration] = songContext.duration;

  if (!songContext.songs) throw new Error("Songs context not initialized");

  const {
    aceVideo,
    akiVideo,
    jyoruVideo,
    lynVideo,
    sheoVideo,
    playing,
    setPlaying,
    target,
    setTarget,
    on,
    setOn,
    playUnravel,
    stopUnravel,
    soundUnravel,
    playRedsun,
    stopRedsun,
    soundRedsun,
    playIdol,
    stopIdol,
    soundIdol,
    playSakamoto,
    stopSakamoto,
    soundSakamoto,
    playFortheglory,
    stopFortheglory,
    soundFortheglory,
    playElfenlied,
    stopElfenlied,
    soundElfenlied,
    stopFuncs,
  } = songContext.songs;

  useEffect(() => {
    const dictionary = {
      unravel: {
        sound: soundUnravel,
        play: playUnravel,
        stop: stopUnravel,
      },
      redsun: {
        sound: soundRedsun,
        play: playRedsun,
        stop: stopRedsun,
      },
      idol: {
        sound: soundIdol,
        play: playIdol,
        stop: stopIdol,
      },
      sakamoto: {
        sound: soundSakamoto,
        play: playSakamoto,
        stop: stopSakamoto,
      },
      fortheglory: {
        sound: soundFortheglory,
        play: playFortheglory,
        stop: stopFortheglory,
      },
      elfenlied: {
        sound: soundElfenlied,
        play: playElfenlied,
        stop: stopElfenlied,
      },
    };

    stopFuncs.current.forEach((x) => x());
    stopFuncs.current = [];

    const sounds = Object.values(dictionary).map((x) => x.sound);
    const playFuncs = Object.values(dictionary).map((x) => x.play);
    const allLoaded = sounds.every((x) => x?.state() === "loaded");
    if (allLoaded) playFuncs.forEach((x) => x());
    if (allLoaded) sounds.forEach((x) => x.loop(true));

    //FIXME
    return () => {
      const _stopFuncs = Object.values(dictionary).map((x) => x.stop);
      // stopFuncs.forEach((x) => x());
      stopFuncs.current = [...stopFuncs.current, ..._stopFuncs];
    };
  }, [
    soundUnravel,
    soundRedsun,
    soundIdol,
    soundSakamoto,
    soundFortheglory,
    soundElfenlied,
    stopFuncs,
    playElfenlied,
    playFortheglory,
    playIdol,
    playRedsun,
    playSakamoto,
    playUnravel,
    stopElfenlied,
    stopFortheglory,
    stopIdol,
    stopRedsun,
    stopSakamoto,
    stopUnravel,
  ]);

  const [hoveringOne, setHoveringOne] = songContext.hovering;

  //FIXME
  // useEffect(() => {
  //   setHoveringOne(null);
  // }, []);

  useEffect(() => {
    const dictionary = {
      unravel: {
        sound: soundUnravel,
        play: playUnravel,
        stop: stopUnravel,
      },
      redsun: {
        sound: soundRedsun,
        play: playRedsun,
        stop: stopRedsun,
      },
      idol: {
        sound: soundIdol,
        play: playIdol,
        stop: stopIdol,
      },
      sakamoto: {
        sound: soundSakamoto,
        play: playSakamoto,
        stop: stopSakamoto,
      },
      fortheglory: {
        sound: soundFortheglory,
        play: playFortheglory,
        stop: stopFortheglory,
      },
      elfenlied: {
        sound: soundElfenlied,
        play: playElfenlied,
        stop: stopElfenlied,
      },
    };

    let afterFade = () => {};

    const sounds = Object.values(dictionary).map((x) => x.sound);
    const allLoaded = sounds.every((x) => x?.state() === "loaded");
    if (!allLoaded) return;
    const songPlaying = dictionary[playing];
    const sound = songPlaying.sound;

    if (!on) {
      const timeToOff = sound.volume();
      if (timeToOff > 0) sound.fade(sound.volume(), 0, timeToOff * 1000);
      setDuration(1000 + timeToOff * 1000);
      return;
    }

    // on
    const targetPlaying = target === playing;
    if (!targetPlaying) {
      // turn off, then after volume is zero, set playing to the right one
      const timeToOff = sound.volume();
      if (timeToOff > 0) {
        sound.fade(sound.volume(), 0, timeToOff * 1000);
        setDuration(1000 + timeToOff * 1000);
        afterFade = () => {
          setPlaying(target);
        };
        sound.once("fade", afterFade);
        return () => {
          sound.off("fade", afterFade);
        };
      } else {
        return setPlaying(target);
      }
    }

    // target is playing, set volume to 1
    const newTargetRedsun = sound.volume() === 0 && target === "redsun";
    if (
      (newTargetRedsun || playing !== "redsun") &&
      typeof lynVideo?.current?.currentTime === "number"
    ) {
      if (typeof lynVideo?.current?.currentTime === "number") {
        lynVideo.current.currentTime = 0;
        lynVideo.current.pause();
      }
    }
    if (newTargetRedsun) sound.seek(0);

    const newTargetFortheglory =
      sound.volume() === 0 && target === "fortheglory";
    if (
      (newTargetFortheglory || playing !== "fortheglory") &&
      typeof sheoVideo?.current?.currentTime === "number"
    ) {
      if (typeof sheoVideo?.current?.currentTime === "number") {
        sheoVideo.current.currentTime = 0;
        sheoVideo.current.pause();
      }
    }
    if (newTargetFortheglory) sound.seek(0);

    if (sound.volume() === 0 && target === "unravel") {
      sound.seek(62);
    }

    const newTargtIdol = sound.volume() === 0 && target === "idol";
    if (
      (newTargtIdol || playing !== "idol") &&
      typeof jyoruVideo?.current?.currentTime === "number"
    ) {
      if (typeof jyoruVideo?.current?.currentTime === "number") {
        jyoruVideo.current.currentTime = 0;
        jyoruVideo.current.pause();
      }
    }
    if (newTargtIdol) sound.seek(101.5);

    const newTargetSakamoto = sound.volume() === 0 && target === "sakamoto";
    if (
      (newTargetSakamoto || playing !== "sakamoto") &&
      typeof aceVideo?.current?.currentTime === "number"
    ) {
      if (typeof aceVideo?.current?.currentTime === "number") {
        aceVideo.current.currentTime = 24;
        aceVideo.current.pause();
      }
    }
    if (newTargetSakamoto) sound.seek(24);

    const newTargetElfenlied = sound.volume() === 0 && target === "elfenlied";
    if (
      (newTargetElfenlied || playing !== "elfenlied") &&
      typeof akiVideo?.current?.currentTime === "number"
    ) {
      if (typeof akiVideo?.current?.currentTime === "number") {
        akiVideo.current.currentTime = 2.15;
        akiVideo.current.pause();
      }
    }
    if (newTargetElfenlied) sound.seek(2.15);

    const timeToOn = 0.5 - sound.volume();
    if (timeToOn > 0) sound.fade(sound.volume(), 0.5, timeToOn * 1000);

    return;
  }, [
    target,
    playing,
    on,
    soundUnravel,
    soundRedsun,
    soundIdol,
    soundSakamoto,
    soundFortheglory,
    soundElfenlied,
    hoveringOne,
    aceVideo,
    akiVideo,
    jyoruVideo,
    lynVideo,
    sheoVideo,
    setDuration,
    setPlaying,
    playElfenlied,
    playFortheglory,
    playIdol,
    playRedsun,
    playSakamoto,
    playUnravel,
    stopElfenlied,
    stopFortheglory,
    stopIdol,
    stopRedsun,
    stopSakamoto,
    stopUnravel,
  ]);

  const dictionary = {
    unravel: {
      sound: soundUnravel,
      play: playUnravel,
      stop: stopUnravel,
    },
    redsun: {
      sound: soundRedsun,
      play: playRedsun,
      stop: stopRedsun,
    },
    idol: {
      sound: soundIdol,
      play: playIdol,
      stop: stopIdol,
    },
    sakamoto: {
      sound: soundSakamoto,
      play: playSakamoto,
      stop: stopSakamoto,
    },
    fortheglory: {
      sound: soundFortheglory,
      play: playFortheglory,
      stop: stopFortheglory,
    },
    elfenlied: {
      sound: soundElfenlied,
      play: playElfenlied,
      stop: stopElfenlied,
    },
  };

  return (
    <div className="flex mt-8 gap-6 gap-x-8 z-10 max-w-[50rem] flex-wrap justify-center">
      {members.map((x, i) => (
        <motion.button
          key={i}
          onClick={setSelection(x.name)}
          onHoverStart={() => {
            setHoveringOne(x.name);
            const sounds = Object.values(dictionary).map((x) => x.sound);
            const allLoaded = sounds.every((x) => x?.state() === "loaded");
            if (!allLoaded) return;
            switch (x.name) {
              case "Ace":
                setTarget("sakamoto");
                break;
              case "Lyn":
                setTarget("redsun");
                break;
              case "Jyoru":
                setTarget("idol");
                break;
              case "Sheo":
                setTarget("fortheglory");
                break;
              case "Aki":
                setTarget("elfenlied");
                break;
              default:
                setTarget("unravel");
                break;
            }
            return setOn(true);
          }}
          onHoverEnd={() => {
            setHoveringOne(null);
            const sounds = Object.values(dictionary).map((x) => x.sound);
            const allLoaded = sounds.every((x) => x?.state() === "loaded");
            if (!allLoaded) return;
            // setTarget("unravel");
            return setOn(false);
          }}
          className={twMerge(
            "flex flex-col text-center items-center rounded-2xl group",
            hoveringOne && hoveringOne !== x.name && "opacity-50"
          )}
          whileHover="show"
          style={{
            opacity: hoveringOne && hoveringOne !== x.name ? 0.4 : 1,
            transitionDuration: `${duration}ms`,
          }}
          transition={{ ease: "easeInOut" }}
        >
          <article
            className={`relative w-36 h-36 rounded-2xl bg-[#9e9da9] flex flex-col overflow-hidden shadow-xl`}
          >
            <motion.span
              variants={titleVariants}
              initial={{ translateY: "100%" }}
              transition={{ bounce: 0, duration: 0.15 }}
              className="mt-auto p-2 leading-snug bg-gray-900 bg-opacity-40 z-20"
            >
              {x.title}
            </motion.span>
            <motion.div
              className="absolute w-full h-full bg-no-repeat bg-cover"
              style={{
                backgroundImage: `url(${x.image})`,
                backgroundSize: "80% 80%",
                backgroundPosition: "bottom center",
                ...x.styles,
              }}
              variants={imageVariants}
              transition={{ bounce: 0, duration: 0.15 }}
            ></motion.div>
          </article>
          <motion.span
            className="mt-2 font-semibold text-xl leading-none group-hover:text-[#7e72ff] transition-colors"
            style={{
              transitionDuration: `${duration / 3}ms`,
            }}
            transition={{ ease: "easeOut" }}
          >
            {x.name}
          </motion.span>
        </motion.button>
      ))}
    </div>
  );
}

const members = [
  {
    name: "Jyoru",
    title: "Manager",
    image: "/nerd-cat-2.png",
    styles: { backgroundColor: "#4b4571", backgroundSize: "140% 95%" },
    // styles: { backgroundColor: "#f8e3e8", backgroundSize: "140% 95%" },
  },
  {
    name: "Lyn",
    title: "Cook",
    image: "/chinese-cat-2.png",
    styles: { backgroundColor: "#ca2f2f" },
    // image: "/horny-doge.png",
    // styles: {
    //   backgroundSize: "110% 110%",
    //   backgroundPosition: "50% -175%",
    //   backgroundColor: "#f8e3e8",
    // },
  },
  {
    name: "Ace",
    title: "Cat girl",
    image: "/nani-2.png",
    styles: {
      backgroundSize: "100% 115%",
      backgroundPosition: "0% -100%",
      backgroundColor: "#6be073",
    },
  },
  {
    name: "Sheo",
    title: "Cat girl",
    image: "/disappointed-cat.png",
    styles: {
      backgroundSize: "125% 125%",
      backgroundPosition: "10% -60%",
      backgroundColor: "#ebd842",
    },
  },
  {
    name: "Aki",
    title: "Cat girl",
    image: "/lick-cat.png",
    styles: {
      backgroundSize: "125% 135%",
      backgroundPosition: "50% 20%",
      backgroundColor: "#eb7e42",
    },
  },
];

const titleVariants = {
  show: { translateY: "0%" },
};

const imageVariants = {
  show: { scale: 1.2, translateY: "-5%" },
};

const countryTimezones = [
  {
    name: "Japan",
    utc_timezone: 9,
    dst_timezone: null, // Japan does not observe DST
    dst_day: null,
    dst_month: null,
    // dst_year: null,
  },
  {
    name: "Portugal",
    utc_timezone: 0,
    dst_timezone: 1,
    dst_day: 31,
    dst_month: 3,
    // dst_year: 2024, // Update for each year or use dynamic logic
  },
  {
    name: "Belgium",
    utc_timezone: 1,
    dst_timezone: 2,
    dst_day: 31,
    dst_month: 3,
    // dst_year: 2024,
  },
  {
    name: "Sweden",
    utc_timezone: 1,
    dst_timezone: 2,
    dst_day: 31,
    dst_month: 3,
    // dst_year: 2024,
  },
  {
    name: "Turkey",
    utc_timezone: 3,
    dst_timezone: null, // Turkey no longer observes DST since 2016
    dst_day: null,
    dst_month: null,
    // dst_year: null,
  },
];

export function getTimezoneForCountry(countryName: string, utcDate: Date) {
  // Find the country object
  const country = countryTimezones.find(
    (c) => c.name.toLowerCase() === countryName.toLowerCase()
  );

  if (!country) {
    throw new Error("Country not found");
  }

  // If the country does not observe DST, return the UTC timezone
  if (!country.dst_day || !country.dst_month) {
    return country.utc_timezone;
  }

  // Get the current day, month, and year from the provided UTC date
  const day = utcDate.getUTCDate();
  const month = utcDate.getUTCMonth() + 1; // getUTCMonth() returns 0-11
  // const year = utcDate.getUTCFullYear();

  // Check if DST applies for the current year
  // if (year === country.dst_year) {
  if (
    month > country.dst_month ||
    (month === country.dst_month && day >= country.dst_day)
  ) {
    return country.dst_timezone;
  }
  // }

  // If no DST, return the standard timezone
  return country.utc_timezone;
}
