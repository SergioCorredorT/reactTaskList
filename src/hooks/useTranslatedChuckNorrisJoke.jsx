import { useChuckNorrisJoke } from "../hooks/useGetChuckJoke";
import { useTranslate } from "../hooks/useTranslate";

export function useTranslatedChuckNorrisJoke() {
  const { joke } = useChuckNorrisJoke();
  const { translatedText } = useTranslate({text: joke, "sourceLang": "en", "targetLang": "es"});

  return { translatedText: translatedText };
}
