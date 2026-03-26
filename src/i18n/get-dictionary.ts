import "server-only";
import fs from "fs/promises";
import path from "path";

const dictionaries = {
    en: () => fs.readFile(path.join(process.cwd(), "src/i18n/dictionaries/en.json"), "utf8").then(JSON.parse),
    ro: () => fs.readFile(path.join(process.cwd(), "src/i18n/dictionaries/ro.json"), "utf8").then(JSON.parse),
    de: () => fs.readFile(path.join(process.cwd(), "src/i18n/dictionaries/de.json"), "utf8").then(JSON.parse),
};

export const getDictionary = async (locale: "en" | "ro" | "de") =>
    dictionaries[locale]?.() ?? dictionaries.ro();
