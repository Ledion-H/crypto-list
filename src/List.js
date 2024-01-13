import axios from "axios";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import {
  formatChangePercentage,
  formatCurrentPrice,
  formatSymbolName,
  colorPercentage,
} from "./utilities";

function List() {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchValue, setSearchValue] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    axios.get("https://api.coincap.io/v2/assets").then((res) => {
      setList(res.data.data);

      setLoading(false);
    });
  }, []);

  return (
    <div className="container">
      <div className="search-container">
        <input
          type="text"
          placeholder="Search coin"
          value={searchValue}
          onChange={(e) => {
            setSearchValue(e.target.value);
          }}
        />
        <span>Search</span>
      </div>
      {loading ? (
        <div className="center">
          <div className="loader"></div>
        </div>
      ) : (
        <table cellPadding={0} cellSpacing={0} border={1}>
          <thead>
            <tr>
              <th colSpan="1">Rank</th>
              <th colSpan="2">Name</th>
              <th colSpan="1">Current Prices</th>
              <th colSpan="1" className="percentage">
                Change <small>(24hr)</small>
              </th>
            </tr>
          </thead>
          <tbody>
            {list
              .filter((x) => x.name.toLowerCase().includes(searchValue))
              .map((item) => (
                <tr
                  key={item.rank}
                  onClick={() => {
                    navigate(`/coin/${item.id}`);
                  }}
                >
                  <td>{item.rank}</td>
                  <td colSpan="2">
                    <div className="crypto-name">
                      <img
                        key={item.id}
                        src={`https://assets.coincap.io/assets/icons/${formatSymbolName(
                          item.symbol
                        )}@2x.png`}
                        alt={`${item.name}`}
                      />
                      <a
                        href="/"
                        className="crypto-link"
                        onClick={(e) => e.preventDefault()}
                      >
                        {item.name}
                        <p>{item.symbol}</p>
                      </a>
                    </div>
                  </td>
                  <td>{formatCurrentPrice(item.priceUsd)}</td>
                  <td
                    className={
                      "percentage " + colorPercentage(item.changePercent24Hr)
                    }
                  >
                    {formatChangePercentage(item.changePercent24Hr)}
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default List;
