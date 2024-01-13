export const formatSymbolName = (symbolName) => {
  const lowerCaseSymbol = symbolName.toLowerCase();
  if (lowerCaseSymbol === "iota") {
    return "m" + lowerCaseSymbol;
  }
  return lowerCaseSymbol;
};

export const formatCurrentPrice = (price) => {
  return "$" + Number(price).toFixed(2).toLocaleString();
};

export const formatChangePercentage = (percentage) => {
  return Number(percentage).toFixed(2) + "%";
};

export const colorPercentage = (percentage) => {
  return Number(percentage) > 0 ? "green" : "red";
};

export const formatLargeNumber = (num) => {
  const absNum = Math.abs(num);

  if (absNum >= 1e9) {
    return `$${(num / 1e9).toFixed(2)}b`;
  } else if (absNum >= 1e6) {
    return `$${(num / 1e6).toFixed(2)}m`;
  } else if (absNum >= 1e3) {
    return `$${(num / 1e3).toFixed(2)}k`;
  } else {
    return `$${num.toFixed(2)}`;
  }
};
