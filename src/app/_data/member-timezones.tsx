import { BE, JP, PT, SE, TR } from "country-flag-icons/react/3x2";

const memberTimezones = {
  jyoru: {
    name: "Jyoru",
    country: "Japan",
    flag: <JP className="h-5 max-sm:h-10" title="Japan" />,
    flagBig: <JP className="h-8 pt-1 max-sm:mr-auto" title="Japan" />,
  },
  lyn: {
    name: "Lyn",
    country: "Belgium",
    flag: <BE className="h-5 max-sm:h-10" title="Belgium" />,
    flagBig: <BE className="h-8 pt-1 max-sm:mr-auto" title="Belgium" />,
  },
  ace: {
    name: "Ace",
    country: "Portugal",
    flag: <PT className="h-5 max-sm:h-10" title="Portugal" />,
    flagBig: <PT className="h-8 pt-1 max-sm:mr-auto" title="Portugal" />,
  },
  sheo: {
    name: "Sheo",
    country: "Sweden",
    flag: <SE className="h-5 max-sm:h-10" title="Sweden" />,
    flagBig: <SE className="h-8 pt-1 max-sm:mr-auto" title="Sweden" />,
  },
  aki: {
    name: "Aki",
    country: "Turkey",
    flag: <TR className="h-5 max-sm:h-10" title="Turkey" />,
    flagBig: <TR className="h-8 pt-1 max-sm:mr-auto" title="Turkey" />,
  },
};

export default memberTimezones;
