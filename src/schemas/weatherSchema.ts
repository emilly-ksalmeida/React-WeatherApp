import { z } from "zod";

export const currentWeatherSchema = z.object({
  currentTime: z.date(),
  temperature: z.number().int(),
  relativeHumidity: z.number().int().min(0).max(100),
  rain: z.number().min(0)
});