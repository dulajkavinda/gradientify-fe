import { GetGradientResponseStatus } from "@/types";

export type GetGradientResponse = {
  type: GetGradientResponseStatus;
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
    process.env.API_ENDPOINT || "http://localhost:4000/dev/getGradient";

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
        type: "ERROR" as GetGradientResponseStatus,
        data: error.message,
      };
    });
};

export default getGradient;
