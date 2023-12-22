import { useState, useEffect } from "react";

const TRANSLATOR_URL = "https://libretranslate.de/translate";

export function useTranslate(text, sourceLang, targetLang) {
  const [translatedText, setTranslatedText] = useState(null);

  useEffect(() => {
    const translate = async () => {
        const response = await fetch(TRANSLATOR_URL, {
          method: "POST",
          body: JSON.stringify({
            q: text,
            source: sourceLang,
            target: targetLang,
            format: "text",
          }),
          headers: { "Content-Type": "application/json" },
        });
        const data = await response.json();
        setTranslatedText(data.translatedText);
    };

    if (text)
      translate();
  }, [text, sourceLang, targetLang]);

  return translatedText;
}
