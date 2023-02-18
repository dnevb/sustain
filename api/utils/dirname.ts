import { dirname } from "path";
import { fileURLToPath } from "url";

const getDirname = (url: string) => dirname(fileURLToPath(url));

export default getDirname;
