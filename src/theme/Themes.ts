export interface Theme {
  isDark: boolean;
  body: string;
  text: string;
  highlight: string;
  title: string;
  paperbg: string;
  secondaryText: string;
  imageHighlight: string;
  jacketColor: string;
  boxShadowColor: string;
}

export const lightTheme: Theme = {
  isDark: false,
  body: "#FFFFFF",
  text: "#001C55",
  highlight: "#00b333",
  title: "#001C55",
  paperbg: "#ffffff",
  secondaryText: "#5F6D8C",
  imageHighlight: "#0E6BA8",
  jacketColor: "#0A2472",
  boxShadowColor: "rgba(0, 0, 0, 0.7)",
};

export const darkTheme: Theme = {
  isDark: true,
  body: "#171c28",
  text: "#FFFFFF",
  highlight: "#BB86FC",
  title: "#BB86FC",
  paperbg: "#2e333d",
  secondaryText: "#99a7c5",
  imageHighlight: "#E29F95",
  jacketColor: "#FB6376",
  boxShadowColor: "#646a77",
};
