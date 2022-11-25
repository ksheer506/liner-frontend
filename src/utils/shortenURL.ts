export const shortenURL = (url: string) => {
  const shortened = url.match(
    /(?<=.[http|https]:\/\/www\.)(.*?)(?=\/)|(?<=.[http|https]:\/\/)[^www\.](.*?)(?=\/)/g
  );

  return shortened?.[0] || url;
};
