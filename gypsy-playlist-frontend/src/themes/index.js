import { useState } from "react";
import useDarkTheme from "./dark";

export function useTheme() {
  const darkTheme = useDarkTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  return [currentTheme, setCurrentTheme];
}
