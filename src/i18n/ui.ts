import en from "@/en.json";
import es from "@/es.json";

export const languages = {
	en: "English",
	es: "Español",
};

export const isos = {
	en: "gb",
	es: "es",
};

export const showDefaultLang = false;
export const defaultLang = "en";

export const ui = {
	en,
	es,
} as const;
