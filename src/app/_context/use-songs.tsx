import { useRef, useState } from "react";
import useSound from "use-sound";

const sources = {
  unravel: "/sad-unravel-piano.mp3",
  redsun: "/red-sun.mp3",
  idol: "/idol.mp3",
  sakamoto: "/sakamoto.mp3",
  fortheglory: "/for-the-glory.mp3",
  elfenlied: "/elfen-lied.mp3",
};

export default function useSongs() {
  const [playing, setPlaying] = useState<keyof typeof sources>("unravel");
  const [target, setTarget] = useState<keyof typeof sources>("unravel");
  const [on, setOn] = useState(false);
  const [playUnravel, { stop: stopUnravel, sound: soundUnravel }] = useSound(
    sources["unravel"],
    { volume: 0 }
  );
  const [playRedsun, { stop: stopRedsun, sound: soundRedsun }] = useSound(
    sources["redsun"],
    { volume: 0 }
  );
  const [playIdol, { stop: stopIdol, sound: soundIdol }] = useSound(
    sources["idol"],
    { volume: 0 }
  );
  const [playSakamoto, { stop: stopSakamoto, sound: soundSakamoto }] = useSound(
    sources["sakamoto"],
    { volume: 0 }
  );
  const [playFortheglory, { stop: stopFortheglory, sound: soundFortheglory }] =
    useSound(sources["fortheglory"], { volume: 0 });
  const [playElfenlied, { stop: stopElfenlied, sound: soundElfenlied }] =
    useSound(sources["elfenlied"], { volume: 0 });

  const aceVideo = useRef<HTMLVideoElement>(null);
  const akiVideo = useRef<HTMLVideoElement>(null);
  const jyoruVideo = useRef<HTMLVideoElement>(null);
  const lynVideo = useRef<HTMLVideoElement>(null);
  const sheoVideo = useRef<HTMLVideoElement>(null);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const stopFuncs = useRef<any[]>([]);
  const state = {
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
  };

  return state;
}
