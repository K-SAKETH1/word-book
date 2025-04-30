import { data, Link, useParams } from "react-router";
import { getWord } from "../actions";
import { useEffect, useState } from "react";
import {
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@heroui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faL,
  faVolumeHigh,
} from "@fortawesome/free-solid-svg-icons";
import Loading from "../components/loading"; // Import the Loading spinner
import "/Users/saket/dictonary-app/src/index.css";
import { useCookies } from "react-cookie";
interface WordDataProps {
  word: string;
  phonetic: string;
  phonetics: [{ text: string; audio: string; sourceUrl: string }];
  meanings: [
    {
      partOfSpeech: string;
      definitions: [
        {
          definition: string;
          synonyms: string[];
          antonyms: string[];
          example: string;
        }
      ];
    }
  ];
  license: { name: string; url: string };
  sourceUrls: string[];
}

export default function WordDetails() {
  let params = useParams();
  let [wordData, setWordData] = useState<WordDataProps[]>();
  let [loading, setLoading] = useState(false); // Track loading state
  const [popOpen, setPopOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [cookie, setCookie, removeCookie] = useCookies(["dark-theme"]);
  const [darkTheme, setDarkTheme] = useState("");

  async function wordSet() {
    setLoading(true); // Show spinner while fetching data
    try {
      const data = await getWord(params.word || "");
      setWordData(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false); // Hide spinner after fetching data
    }
  }

  function PlayAudio() {
    const audioUrl = wordData
      ?.flatMap((word) => word.phonetics.map((p) => p.audio))
      .find((url) => url); // Get the first valid audio URL

    if (audioUrl) {
      const sound = new Audio(audioUrl);
      sound.play().catch((e) => console.error("Audio Playback Failed:", e));
    } else {
      setPopOpen(true);
      setErrorMessage("No audio available for this word.");
      setTimeout(() => {
        setPopOpen(false);
      }, 1500);
    }
  }

  useEffect(() => {
    if (cookie["dark-theme"] == true) {
      setDarkTheme("light");
    } else {
      setDarkTheme("dark");
    }
    wordSet();
  }, [params.word, cookie["dark-theme"]]);

  return (
    <div className={`p-4 ${darkTheme} text-foreground bg-background`}>
      <div className="p-4">
        <Link to="/" style={{ color: "#CF2CE7" }}>
          <FontAwesomeIcon icon={faArrowLeft} /> Back
        </Link>
      </div>
      {loading ? ( // Show the Loading spinner when loading is true
        <div className="flex justify-center items-center h-64">
          <Loading /> {/* Render the Loading spinner */}
        </div>
      ) : (
        <Card className={`${darkTheme}`}>
          <CardHeader className="flex flex-col items-start gap-2">
            <h1 className="font-bold text-2xl">{wordData?.[0]?.word}</h1>
            <div>
              <span>{wordData?.[0]?.phonetic}</span>
              <Popover placement="right-end" isOpen={popOpen} color="primary">
                <PopoverTrigger>
                  <button
                    className="ms-2"
                    onClick={PlayAudio}
                    style={{ color: "#CF2CE7" }}
                  >
                    <FontAwesomeIcon icon={faVolumeHigh} />
                  </button>
                </PopoverTrigger>
                <PopoverContent>{errorMessage}</PopoverContent>
              </Popover>
            </div>
          </CardHeader>
          <div className="flex items-center ms-2">
            <span className="me-2 font-bold" style={{ color: "#CF2CE7" }}>
              <i>{wordData?.[0]?.meanings[0].partOfSpeech}</i>
            </span>
            <Divider className="mt-1" />
          </div>
          <CardBody className="flex flex-col w-full">
            <ol
              className="list-inside pl-4 w-full ps-4 mylist"
              style={{ listStyle: "decimal", listStylePosition: "inside" }}
            >
              {wordData?.[0]?.meanings.map((def) =>
                def.definitions.map((mea, index) => {
                  return (
                    <li className="pb-2 text-lg text-start" key={index}>
                      {mea.definition}
                      <p className="text-sm mb-1">
                        {mea.example ? (
                          <i style={{ color: "#9AA6B2" }}>
                            Ex: "{mea.example}"
                          </i>
                        ) : (
                          ""
                        )}
                      </p>
                      <p className="text-sm">
                        {mea.synonyms.length ? (
                          <span className="me-1" style={{ color: "#9AA6B2" }}>
                            Synonyms:
                            {mea.synonyms.map((syn, index) => {
                              return (
                                <span
                                  className="ms-1"
                                  style={{ color: "#CF2CE7" }}
                                >
                                  {syn}
                                  {index < mea.synonyms.length - 1 ? "," : ""}
                                </span>
                              );
                            })}
                          </span>
                        ) : (
                          ""
                        )}
                      </p>
                    </li>
                  );
                })
              )}
            </ol>
          </CardBody>
          <Divider />
          <CardFooter>
            <p>
              <span className="me-2">Source:</span>
              <a
                style={{ color: "#CF2CE7" }}
                href={wordData?.[0].sourceUrls.toString()}
                target="_blank"
              >
                {wordData?.[0].sourceUrls}
              </a>
            </p>
          </CardFooter>
        </Card>
      )}
    </div>
  );
}
