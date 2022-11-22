export const sliceURL = (url: string) => {
  const sliced = url.match(
    /(?<=.[http|https]:\/\/www\.)(.*?)(?=\/)|(?<=.[http|https]:\/\/)[^www\.](.*?)(?=\/)/g
  );

  return sliced![0] || url;
};
