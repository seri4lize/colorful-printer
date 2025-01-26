function hexToAnsi(hex, isBackground = false) {
  if (!/^#[0-9A-Fa-f]{6}$/.test(hex)) {
    throw new Error("Invalid HEX color format. Please use #RRGGBB.");
  }
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return isBackground
    ? `\x1b[48;2;${r};${g};${b}m`
    : `\x1b[38;2;${r};${g};${b}m`;
}

function getCurrentDate() {
  const now = new Date();
  const options = { month: "short", day: "numeric" };
  const dateStr = now.toLocaleDateString("en-US", options);
  return dateStr;
}

function getCurrentTime() {
  const now = new Date();
  return now.toISOString().split("T")[1].split(".")[0];
}

function frameText(text, bgColor, fgColor) {
  const bg = hexToAnsi(bgColor, true);
  const fg = hexToAnsi(fgColor, false);
  const reset = "\x1b[0m";
  return `${bg}${fg}${text}${reset}`;
}

function styleMessage({
  tag,
  message,
  background = "",
  textColor = "",
  isBold = false,
}) {
  const reset = "\x1b[0m";
  const bold = isBold ? "\x1b[1m" : "";
  const bgColor = background ? hexToAnsi(background, true) : "";
  const txtColor = textColor ? hexToAnsi(textColor, false) : "";

  const date = getCurrentDate();
  const timeStamp = frameText(
    ` ${date} ${getCurrentTime()} `,
    "#474747",
    "#FFFFFF"
  );
  const styledTag = `${bgColor}${txtColor}${bold} ${tag} ${reset}`;
  const styledMessage = ` ${txtColor}${message} ${reset}`;

  return `${timeStamp} ${styledTag}${styledMessage}`;
}

function logMessage(options) {
  console.log(styleMessage(options));
}

const printer = {
  success: (message) =>
    logMessage({
      tag: "SUCCESS",
      message: parseMessage(message),
      background: "#1EFF12",
      textColor: "#1EFF12",
      isBold: true,
    }),
  error: (message) =>
    logMessage({
      tag: "ERROR",
      message: parseMessage(message),
      background: "#ed0e0e",
      textColor: "#ed0e0e",
      isBold: true,
    }),
  info: (message) =>
    logMessage({
      tag: "INFO",
      message: parseMessage(message),
      background: "#14b6e3",
      textColor: "#14b6e3",
      isBold: true,
    }),
  warn: (message) =>
    logMessage({
      tag: "WARN",
      message: parseMessage(message),
      background: "#ED8E11",
      textColor: "#ED8E11",
      isBold: true,
    }),
  custom: ({ tag, message, background, textColor, isBold }) =>
    logMessage({
      tag: tag,
      message: parseMessage(message),
      background,
      textColor,
      isBold,
    }),
  log: (message) =>
    logMessage({
      tag: "LOG",
      message: parseMessage(message),
      background: "#33A3FF",
      textColor: "#FFFFFF",
      isBold: true,
    }),
};

function parseMessage(message) {
  const reset = "\x1b[0m";
  let result = message.replace(/§([a-zA-Z0-9])/g, (match, code) => {
    if (code === "r") return reset;
    const style = colorMap[code];
    return style ? style : match;
  });

  return result + reset;
}

const colorMap = {
  0: hexToAnsi("#2F2F2F"), // Black
  1: hexToAnsi("#0000A0"), // DarkBlue
  2: hexToAnsi("#006400"), // DarkGreen
  3: hexToAnsi("#008B8B"), // DarkAqua
  4: hexToAnsi("#8B0000"), // DarkRed
  5: hexToAnsi("#4B0082"), // DarkPurple
  6: hexToAnsi("#B8860B"), // Gold
  7: hexToAnsi("#A9A9A9"), // Gray
  8: hexToAnsi("#C0C0C0"), // DarkGray
  9: hexToAnsi("#4682B4"), // Blue
  a: hexToAnsi("#66CD00"), // Green
  b: hexToAnsi("#20B2AA"), // Aqua
  c: hexToAnsi("#FF6347"), // Red
  d: hexToAnsi("#DA70D6"), // Purple
  e: hexToAnsi("#FFD700"), // Orange
  f: hexToAnsi("#FFFFFF"), // White
  l: "\x1b[1m", // Bold
  n: "\x1b[4m", // Underline
  o: "\x1b[3m", // Italic
  m: "\x1b[9m", // Strikethrough
  r: "\x1b[0m", // Reset
};

module.exports = { printer };
