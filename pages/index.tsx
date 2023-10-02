import React, { useState, useEffect } from "react";

import { Inter, Questrial } from "next/font/google";

// If loading a variable font, you don't need to specify the font weight
const inter = Inter({ subsets: ["latin"] });

interface CountryData {
  name: {
    common: string;
  };
}

export default function Home() {
  const [userInput, setUserInput] = useState<string>("");
  const [countries, setCountries] = useState<string[]>([]);
  const [filteredCountries, setFilteredCountries] = useState<React.ReactNode[]>(
    []
  );

  function highlightMatchedText(text: string, query: string): React.ReactNode {
    if (!query) {
      return (
        <li
          onClick={() => {
            setUserInput(text);
          }}
        >
          {text}
        </li>
      );
    }
    const regex = new RegExp(`(\\b${query})`, "gi");
    const parts = text.split(regex);

    return (
      <li
        onClick={() => {
          setUserInput(text);
        }}
      >
        {parts.map((part, index) =>
          regex.test(part) ? (
            <mark key={index}>{part}</mark>
          ) : (
            <span key={index}>{part}</span>
          )
        )}
      </li>
    );
  }

  useEffect(() => {
    // Fetch the list of countries from an API (e.g., Restcountries)
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data: CountryData[]) => {
        const countryNames = data.map((country) => country.name.common);
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    const userInputProcessed = userInput.toLowerCase().trim();

    // Filter countries based on user input and build highlighted text
    const filtered = countries.filter((country) => {
      const words = country.split(" ");
      return words.some((word) =>
        word.toLowerCase().startsWith(userInputProcessed)
      );
    });

    const sortedFilteredCountries = filtered.sort((a, b) => {
      if (
        a.toLowerCase().startsWith(userInputProcessed) &&
        !b.toLowerCase().startsWith(userInputProcessed)
      ) {
        return -1; // Place 'a' before 'b' if 'a' matches the input and 'b' doesn't
      } else if (
        !a.toLowerCase().startsWith(userInputProcessed) &&
        b.toLowerCase().startsWith(userInputProcessed)
      ) {
        return 1; // Place 'b' before 'a' if 'b' matches the input and 'a' doesn't
      }
      return 0; // Leave the order unchanged if both or neither match
    });

    const filteredElements = sortedFilteredCountries.map((country) =>
      highlightMatchedText(country, userInputProcessed)
    );
    setFilteredCountries(filteredElements);
  }, [userInput, countries]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInput(e.target.value);
  };

  return (
    <>
      <div className={`searchCountry ${inter.className}`}>
        <input
          type="text"
          className={inter.className}
          placeholder="Search for a country..."
          value={userInput}
          onChange={handleInputChange}
        />
        <div className="suggestionsList">
          <ul className="inner">
            {filteredCountries.map((country, index) => (
              <>{country}</>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
}
