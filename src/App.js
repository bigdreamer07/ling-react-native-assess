/* eslint-disable react-hooks/exhaustive-deps */
import React, { useMemo, useState } from "react";

import leaderboardData from "./data/leaderboard.json";
import "./App.css";

function App() {
  const numberOfDisplayData = 10;
  const [searchKey, setSearchKey] = useState("");
  const [searchedRank, setSearchedRank] = useState(-1);

  // Handle the update of the search keyword.
  const onChangeSearchKey = (e) => {
    setSearchKey(e.target.value);
  };

  // Lookup element that has name of search keyword.
  const onHandleSearch = () => {
    let searchedItem = data.find((el) => el.name === searchKey);
    if (!searchedItem) {
      // Alert message if there is not item that has name of search keyword.
      alert(
        "This user name does not exist! Please specify an existing user name!"
      );
      setSearchedRank(-1);
      setSearchKey("");
    } else {
      setSearchedRank(searchedItem.rank);
    }
  };

  const data = useMemo(() => {
    let retData = [];
    for (const [key, value] of Object.entries(leaderboardData)) {
      retData.push({
        id: key,
        ...value,
      });
    }
    retData.sort((a, b) => (a.bananas - b.bananas > 0 ? -1 : 1));
    retData.forEach((el, index) => {
      retData[index].rank = index + 1;
    });

    return retData;
  }, []);

  const displayData = useMemo(() => {
    if (searchedRank === -1) return data.slice(0, numberOfDisplayData);
    else {
      if (searchedRank > numberOfDisplayData)
        return [
          ...data.slice(0, numberOfDisplayData - 1),
          data[searchedRank - 1],
        ];
      else return data.slice(0, numberOfDisplayData);
    }
  }, [searchedRank]);

  return (
    <div className="App">
      <div className="App-content">
        <h2>Leaderboard</h2>
        <div className="Search-container">
          <input
            type="text"
            value={searchKey}
            placeholder="Search by name..."
            className="Search-input"
            onChange={(e) => onChangeSearchKey(e)}
          />
          <button className="Search-button" onClick={() => onHandleSearch()}>
            Search
          </button>
        </div>

        <div className="Table-container">
          <table>
            <thead>
              <tr>
                <th>Name</th>
                <th>Rank</th>
                <th>Number of bananas</th>
                <th>isSelectedUser?</th>
              </tr>
            </thead>
            <tbody>
              {displayData.map((el) => (
                <tr key={el.id}>
                  <td
                    className={searchedRank === el.rank ? "Searched-name" : ""}
                  >
                    {el.name}
                  </td>
                  <td>{el.rank}</td>
                  <td>{el.bananas}</td>
                  <td>{searchedRank === el.rank ? "Yes" : "No"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default App;
