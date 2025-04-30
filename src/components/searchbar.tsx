import { faSearch, faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Input } from "@heroui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
export default function Search() {
  const [word, setWord] = useState("");
  const [data, setData] = useState("");
  const [endContent, setEndContent] = useState<React.ReactNode>(null);
  let redirect = useNavigate();
  async function HandleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      redirect(`/${word}`);
    } catch (err) {
      console.log(err);
    }
  }
  function HandleReset(e: React.FormEvent) {
    setWord("");
  }
  useEffect(() => {
    if (word === "") {
      setEndContent(
        <button
          type="button"
          style={{ margin: "0", padding: "0", width: "30px" }}
        >
          <span>
            <FontAwesomeIcon
              style={{ margin: "0", padding: "0", color: "#CF2CE7" }}
              icon={faSearch}
            />
          </span>
        </button>
      );
    } else {
      setEndContent(
        <div className="flex">
          <button
            type="button"
            onClick={HandleReset}
            style={{ margin: "0", padding: "0", width: "30px" }}
          >
            <span>
              <FontAwesomeIcon
                style={{ margin: "0", padding: "0", color: "#CF2CE7" }}
                icon={faXmark}
              />
            </span>
          </button>
          <button
            type="submit"
            style={{ margin: "0", padding: "0", width: "30px" }}
          >
            <span>
              <FontAwesomeIcon
                style={{ margin: "0", padding: "0", color: "#CF2CE7" }}
                icon={faSearch}
              />
            </span>
          </button>
        </div>
      );
    }
  }, [word]);

  return (
    <div className="mx-auto lg:w-xl w-sm mb-10 lg:pb-8">
      <form className="flex justify-end items-end" onSubmit={HandleSubmit}>
        <Input
          size="lg"
          className="flex-grow"
          placeholder="Search a word..."
          value={word}
          endContent={endContent}
          onChange={(e) => setWord(e.target.value)}
          name="word"
        />
      </form>
    </div>
  );
}
