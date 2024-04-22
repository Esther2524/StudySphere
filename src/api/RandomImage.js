import { pexelsApiKey } from "@env";

export const changeRandomPicture = async () => {
  const randomPage = Math.ceil(Math.random() * 100);
  const perPage = 1;
  const url = `https://api.pexels.com/v1/search?query=Nature&per_page=${perPage}&page=${randomPage}`;
  try {
    const response = await fetch(url, {
      headers: {
        Authorization: pexelsApiKey,
      },
    });
    const result = await response.json();

    if (result.photos.length > 0) {
      // console.log(result);
      const randomIndex = Math.floor(Math.random() * result.photos.length);
      const randomImageUri = result.photos[randomIndex].src.portrait;
      // setRandomImage(randomImageUri);
      return randomImageUri;
    }
  } catch (error) {
    console.error("Error fetching image from Pexels:", error);
  }
};
