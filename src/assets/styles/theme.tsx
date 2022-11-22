export const theme = {
  colors: {
    gray30: "#C2C6CE",
    gray50: "#33373D",

    liner05: "#00ebf750",
    liner50: "#00C3CC",
  },
};

export const colors = (code: keyof typeof theme.colors) => {
  return theme.colors[code];
};