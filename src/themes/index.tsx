import { useState } from "react";
import useDarkTheme from "./dark";

export type ThemeType = Record<
  | "background"
  | "button"
  | "disabled"
  | "secondaryBackground"
  | "primaryColor"
  | "MainAppBar"
  | "headingColor",
  string
>;

export function useTheme() {
  const darkTheme = useDarkTheme();
  const [currentTheme, setCurrentTheme] = useState(darkTheme);

  return [currentTheme, setCurrentTheme];
}
