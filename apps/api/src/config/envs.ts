import "dotenv/config";
import { get } from "env-var"

export const envConfig = {
    PORT : get("PORT").required().asInt(),
}