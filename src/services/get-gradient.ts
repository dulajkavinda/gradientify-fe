export type GetGradientResponse = {
  type: "ERROR" | "SUCCESS";
  data: string;
};

const getGradient = async (
  imageBuffer: string,
  bluriness?: number,
  rotation?: number
): Promise<GetGradientResponse> => {
  if (!bluriness) {
    bluriness = 6;
  }

  if (!rotation) {
    rotation = 0;
  }

  const url =
    process.env.API_ENDPOINT_LOCAL || "http://localhost:4000/dev/getGradient";

  if (!url) {
    throw new Error("API endpoint is not defined");
  }

  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      file: imageBuffer,
      bluriness,
      rotation,
    }),
  })
    .then((response) => response.json())
    .then((data: GetGradientResponse) => {
      return data;
    })
    .catch((error) => {
      return {
        type: "ERROR",
        data: error.message,
      };
    });
};

export default getGradient;
