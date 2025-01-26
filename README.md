# **Colorful Printer**

## Table Of Contents

- [Installation](#installation)
- [Usage](#usage)
- [Utils](#utils)
  - [Fast Styling](#fast-styling)
***
# **Installation**

```shell
npm install colorful-printer
```
***

# Usage

```js
const { printer } = require("colorful-printer");

printer.success(message);
printer.error(message);
printer.warn(message);
printer.info(message);
printer.log(message);
printer.custom({
  tag: "CustomTag",
  message: "This is custom log message!",
  textColor: "#e0d21f", //Printer uses hex based coloring
  background: "#e0d21f",
  isBold: true,
});
```

![Image](https://github.com/user-attachments/assets/436daa67-c85d-4fa4-a774-3cb37648da78)
***
# Utils

## Fast Styling

```js
printer.log("§c This is Red,§e This is Yellow, §a§oThis is italic");
```

![Image](https://github.com/user-attachments/assets/00dccbbe-18da-4ba8-9032-13c649154279)

### There is a color map for styling

### Color Map

```
§0 -> Black
§1 -> Dark Blue
§2 -> Dark Green
§3 -> Dark Aqua
§4 -> Dark Red
§5 -> Dark Purple
§6 -> Gold
§7 -> Gray
§8 -> Dark Gray
§9 -> Blue
§a -> Green
§b -> Aqua
§c -> Red
§d -> Light Purple
§e -> Yellow
§f -> White
§l -> Bold
§n -> Underline
§o -> Italic
§m -> Striketrough
§r -> Reset the color
```
***
