import { useChuckNorrisJoke } from "../hooks/useGetChuckJoke";
import { useTranslate } from "../hooks/useTranslate";

export function useTranslatedChuckNorrisJoke() {
  const { joke } = useChuckNorrisJoke();
  const translatedJoke = useTranslate(joke, "en", "es");

  return { translatedJoke };
}
