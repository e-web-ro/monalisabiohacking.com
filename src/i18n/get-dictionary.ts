import "server-only";
import fs from "fs/promises";
import path from "path";
import { kv } from "@vercel/kv";

const dictionaries = {
    en: () => fs.readFile(path.join(process.cwd(), "src/i18n/dictionaries/en.json"), "utf8").then(JSON.parse),
    ro: () => fs.readFile(path.join(process.cwd(), "src/i18n/dictionaries/ro.json"), "utf8").then(JSON.parse),
    de: () => fs.readFile(path.join(process.cwd(), "src/i18n/dictionaries/de.json"), "utf8").then(JSON.parse),
};

export const getDictionary = async (locale: "en" | "ro" | "de") => {
    try {
        // Try reading from KV first for real-time updates
        const cached = await kv.get(`dict_${locale}`);
        if (cached) {
            return cached as any;
        }
    } catch (error) {
        console.error("KV error:", error);
    }
    
    // Fallback to static files
    return dictionaries[locale]?.() ?? dictionaries.ro();
};
