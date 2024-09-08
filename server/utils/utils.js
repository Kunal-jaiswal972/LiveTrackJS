import axios from "axios";
import * as cheerio from "cheerio";
import { redisClient } from "../db/redis.js";

const TWO_DAYS_IN_SECONDS = 2 * 24 * 60 * 60;

export async function getFavicon(url) {
  const cacheKey = `favicon:${url}`;

  try {
    const cachedFavicon = await redisClient.get(cacheKey);
    if (cachedFavicon) {
      return cachedFavicon;
    }

    const fullUrl = `https://${url}`;
    const response = await axios.get(fullUrl);
    const $ = cheerio.load(response.data);

    let favicon = $('link[rel~="icon"]').attr("href");

    if (favicon && !favicon.startsWith("http")) {
      try {
        favicon = new URL(favicon, fullUrl).href;
      } catch (error) {
        console.error(`Invalid favicon URL for site: ${url}`, error);
        return null;
      }
    }

    favicon = favicon || null;

    if (favicon) {
      await redisClient.set(cacheKey, favicon, TWO_DAYS_IN_SECONDS);
    }

    return favicon;
  } catch (error) {
    console.error(`Error fetching favicon for site: ${url}`, error.message);
    return null;
  }
}
