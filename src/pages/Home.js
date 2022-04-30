import React, { useState } from "react";
import "./home.css";

const cardGameNumber = [1, 2, 3, 4, 5, 6, 1, 2, 3, 4, 5, 6];
let selectKey = 0;

export default function Home() {
  const [randomArray, setRandomArray] = useState([]);
  const [firstSelectCardInfo, setFirstSelectCardInfo] = useState({});
  const [secondSelectCardInfo, setSecondSelectCardInfo] = useState({});
  const [endCardNumber, setEndCardNumber] = useState([]);
  const [loading, setLoading] = useState(false);

  const resetCardNumber = () => {
    setFirstSelectCardInfo({});
    setSecondSelectCardInfo({});
  };

  const onClick = (number, key) => {
    if (loading) {
      return;
    }
    selectKey++;
    if (selectKey % 2 === 0) {
      if (firstSelectCardInfo.key === key) {
        return;
      }
      setSecondSelectCardInfo({
        number,
        key,
      });
      checkCardNumber(number, key, selectKey);
    } else {
      setFirstSelectCardInfo({
        number,
        key,
      });
    }
  };

  const checkCardNumber = (
    secondSelectCardNumber,
    secondSelectCardKey,
    selectKey
  ) => {
    if (firstSelectCardInfo.number === secondSelectCardNumber) {
      setLoading(true);
      setTimeout(() => {
        const newEndArray = endCardNumber;
        newEndArray.push(firstSelectCardInfo.key);
        newEndArray.push(secondSelectCardKey);
        setEndCardNumber(newEndArray);
      }, [1000]);
    }
    if (selectKey % 2 === 0) {
      setLoading(true);
      setTimeout(() => {
        resetCardNumber();
        selectKey = 0;
        setLoading(false);
      }, [1000]);
    }
  };

  const getRandomArray = (cardGameNumber) => {
    return cardGameNumber.sort(() => 0.5 - Math.random());
  };

  const restartGame = () => {
    setRandomArray(getRandomArray(cardGameNumber));
    setEndCardNumber([]);
    resetCardNumber();
  };

  useState(() => {
    setRandomArray(getRandomArray(cardGameNumber));
  }, []);

  return (
    <>
      <div className="home">
        <div className="card-container">
          {randomArray.map((number, key) => (
            <div
              className={`card ${
                firstSelectCardInfo.key === key
                  ? "open-card"
                  : secondSelectCardInfo.key === key
                  ? "open-card"
                  : "close-card"
              } ${endCardNumber.includes(key) ? "remove-card" : ""}`}
              key={key}
              onClick={() => onClick(number, key)}
            >
              {endCardNumber.includes(key)
                ? ""
                : firstSelectCardInfo.key === key
                ? number
                : secondSelectCardInfo.key === key
                ? number
                : ""}
            </div>
          ))}
        </div>
      </div>
      {endCardNumber.length === 12 ? (
        <div className="restart-modal">
          <button className="restart-button" onClick={restartGame}>
            restart
          </button>
        </div>
      ) : null}
    </>
  );
}
