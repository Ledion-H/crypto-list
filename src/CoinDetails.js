import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  formatChangePercentage,
  formatCurrentPrice,
  formatSymbolName,
  colorPercentage,
  formatLargeNumber,
} from "./utilities";
import axios from "axios";

function CoinDetails() {
  const [details, setDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  useEffect(() => {
    axios.get("https://api.coincap.io/v2/assets/" + id).then((res) => {
      setDetails(res.data.data);

      setLoading(false);
    });
  }, [id]);

  return (
    <>
      {loading ? (
        <div className="center">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="details-container">
          <div className="right-details">
            <Link to="/" className="go-back">
              Go back
            </Link>

            <img
              key={details.id}
              src={`https://assets.coincap.io/assets/icons/${formatSymbolName(
                details.symbol
              )}@2x.png`}
              alt={`${details.name}`}
            />
            <div className="details-name">
              {details.name}
              <p className="details-symbol">({details.symbol})</p>
            </div>
          </div>
          <div className="left-details">
            <div className="price-details">
              <div>
                RANK
                <span>{details.rank}</span>
              </div>
              <div>
                MARKET CAP{" "}
                <span>{formatLargeNumber(details.marketCapUsd)}</span>
              </div>
              <div>
                VOLUME
                <span>{formatLargeNumber(details.volumeUsd24Hr)}</span>
              </div>
              <div>
                PRICE USD
                <span>{formatCurrentPrice(details.priceUsd)}</span>
              </div>
              <div className="details-change">
                CHANGE{" "}
                <span
                  className={`details-percentage ${colorPercentage(
                    details.changePercent24Hr
                  )}`}
                >
                  {formatChangePercentage(details.changePercent24Hr)}
                </span>
              </div>
              <div>
                SUPPLY
                <span>{formatLargeNumber(details.supply)}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CoinDetails;
