import axios from "axios";

export async function getWord(formWord: string) {
  const response = axios
    .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${formWord}`)
    .then((res) => {
      return res;
    });
  const data = (await response).data;
  return data;
}
