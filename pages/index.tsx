import React, { useState, useEffect } from "react";

import { Inter } from "next/font/google";

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
  const [userTyping, setUserTyping] = useState<boolean>(false);
  const [filteredCountries, setFilteredCountries] = useState<React.ReactNode[]>(
    []
  );

  // Highlighting text that matches the query
  function highlightMatchedText(text: string, query: string): React.ReactNode {
    const regex = new RegExp(`(\\b${query})`, "gi");
    const parts = text.split(regex);

    return (
      <li
        onClick={() => {
          setUserInput(text);
        }}
      >
        {query
          ? parts.map((part, index) =>
              regex.test(part) ? (
                <mark key={index}>{part}</mark>
              ) : (
                <span key={index}>{part}</span>
              )
            )
          : text}
      </li>
    );
  }

  useEffect(() => {
    // Fetch the list of countries from an API (e.g., Restcountries)
    fetch("https://restcountries.com/v3.1/all")
      .then((response) => response.json())
      .then((data: CountryData[]) => {
        // Take the names of the countries and sort them alphabetically
        const countryNames = data
          .map((country) => country.name.common)
          .sort((a, b) => -b.localeCompare(a));
        setCountries(countryNames);
      })
      .catch((error) => {
        console.error("Error fetching countries:", error);
      });
  }, []);

  useEffect(() => {
    const userInputProcessed = userInput.toLowerCase().trim();

    const primaryResults: string[] = [];
    const secondaryResults: string[] = [];

    for (const el of countries) {
      if (el.toLowerCase().trim().startsWith(userInputProcessed)) {
        primaryResults.push(el);
      } else {
        // Split the input string into words
        const words = el.split(/\s+/);

        // Iterate through words, starting from the second word (index 1)
        for (let i = 1; i < words.length; i++) {
          const word = words[i].toLowerCase();

          // Check if the word starts with the user input string
          if (word.startsWith(userInputProcessed)) {
            secondaryResults.push(el);
            break;
          }
        }
      }
    }

    console.log(primaryResults);

    const results = [...primaryResults, ...secondaryResults];

    const filteredElements = results.map((country) =>
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
          onFocus={() => {
            setUserTyping(true);
          }}
          onBlur={() => {
            setUserTyping(false);
          }}
        />
        <div className={`suggestionsList ${userTyping ? "show" : ""}`}>
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
