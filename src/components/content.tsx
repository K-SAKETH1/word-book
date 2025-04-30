import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Divider,
} from "@heroui/react";
import { useEffect, useState } from "react";
import { Link } from "react-router";
import { useCookies } from "react-cookie";
import axios from "axios";
import { getWord } from "../actions";
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

export default function Content() {
  const [cookie, setCookie, removeCookie] = useCookies(["dark-theme"]);
  const [cookies, setCookies, removeCookies] = useCookies(["wordOfTheDay"]);
  const [wordDetails, setWordDetails] = useState<WordDataProps[]>();
  const now = new Date();
  const expires = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate() + 1, // Set to the next day
    0, // Midnight
    0,
    0
  );

  async function getWordOfTheDay() {
    axios
      .get("https://random-word-api.herokuapp.com/word")
      .then(async (res) => {
        try {
          const details = await getWord(res.data);
          if (details) {
            if (cookies["wordOfTheDay"] == undefined) {
              setCookies("wordOfTheDay", res.data, { expires });
            }
          } else {
            setCookies("wordOfTheDay", "");
          }
          console.log(details);
        } catch (err) {
          console.log(err);
        }
      });
  }
  async function getWordOfTheDayDeatails() {
    try {
      const details = await getWord(cookies["wordOfTheDay"]);
      setWordDetails(details);
    } catch (err) {
      console.log(err);
    }
  }
  const [darkTheme, setDarkTheme] = useState("");
  useEffect(() => {
    if (cookie["dark-theme"] == true) {
      setDarkTheme("light");
    } else {
      setDarkTheme("dark");
    }
    getWordOfTheDay();
    getWordOfTheDayDeatails();
  }, [cookie["dark-theme"]]);
  return (
    <div
      className={`flex flex-col lg:justify-center lg:flex-row p-4 lg:p-2 ${darkTheme} text-foreground bg-background lg:pb-12`}
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="col-span-2 lg:col-span-1 max-w-2xl text-center">
          <Card className="flex flex-col gap-2 h-[220px]">
            <CardHeader>
              <h3 className="text-xl font-bold">Word of the day</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <h4 className="text-lg font-bold" style={{ color: "#CF2CE7" }}>
                {wordDetails?.[0].word ? wordDetails[0].word : ""}
              </h4>
              <p style={{ color: "gray" }}>
                {wordDetails?.[0].phonetic ? (
                  <p>{wordDetails?.[0].phonetic}</p>
                ) : (
                  ""
                )}
                {wordDetails?.[0].meanings[0].definitions ? (
                  <i>{wordDetails[0].meanings[0].definitions[0].definition}</i>
                ) : (
                  ""
                )}
              </p>
            </CardBody>
            <CardFooter>
              <Link
                to={`/${cookies["wordOfTheDay"]}`}
                className="font-bold"
                style={{ color: "#CF2CE7" }}
              >
                Learn more
                <span className="ms-1">
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </Link>
            </CardFooter>
          </Card>
        </div>
        <div className="col-span-2 lg:col-span-1 max-w-2xl">
          <Card className="flex flex-col gap-2 h-[220px]">
            <CardHeader>
              <h3 className="text-xl font-bold">About Word Book</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <p>
                Word Book is your comprehensive dictionary app designed to help
                you explore language effortlessly. Search for words, save your
                favorites, and discover the rich meanings and usages of English
                vocabulary. Create an account to sync your search history and
                favorite words across all your devices.
              </p>
            </CardBody>
            <CardFooter>
              <a
                href="https://github.com/K-SAKETH1/word-book"
                className="font-bold"
                style={{ color: "#CF2CE7" }}
                target="_blank"
              >
                Repo Link
                <span className="ms-1">
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </a>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}
