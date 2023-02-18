import { join } from "path";
import { DataSource } from "typeorm";
import getDirname from "./utils/dirname";

export default new DataSource({
  type: "postgres",
  url: process.env["DB_URL"]!,
  entities: [join(getDirname(import.meta.url), "models", ".*{js,ts}")],
});
