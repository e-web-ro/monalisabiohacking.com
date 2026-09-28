"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Star, CheckCircle2, AlertTriangle, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const TEXTS = {
    ro: {
        title: "Lasă o recenzie",
        for: "pentru",
        rating: "Nota ta",
        name: "Numele afișat",
        text: "Recenzia ta",
        placeholder: "Ce ți-a plăcut? Cum te-a ajutat?",
        submit: "Trimite recenzia",
        min: "Scrie cel puțin 10 caractere.",
        chooseRating: "Alege o notă de la 1 la 5 stele.",
        thanks: "Mulțumim pentru recenzie!",
        thanksDesc: "Recenzia ta va apărea pe site după ce este verificată.",
        invalid: "Link-ul de recenzie nu este valid sau a expirat.",
        used: "Ai trimis deja o recenzie pentru acest produs. Mulțumim!",
        error: "A apărut o eroare. Te rugăm să încerci din nou.",
        back: "Înapoi la magazin",
    },
    en: {
        title: "Leave a review",
        for: "for",
        rating: "Your rating",
        name: "Display name",
        text: "Your review",
        placeholder: "What did you like? How did it help you?",
        submit: "Submit review",
        min: "Please write at least 10 characters.",
        chooseRating: "Choose a rating from 1 to 5 stars.",
        thanks: "Thank you for your review!",
        thanksDesc: "Your review will appear on the site after it is checked.",
        invalid: "This review link is invalid or has expired.",
        used: "You have already reviewed this product. Thank you!",
        error: "Something went wrong. Please try again.",
        back: "Back to shop",
    },
    de: {
        title: "Bewertung abgeben",
        for: "für",
        rating: "Deine Bewertung",
        name: "Angezeigter Name",
        text: "Dein Kommentar",
        placeholder: "Was hat dir gefallen? Wie hat es dir geholfen?",
        submit: "Bewertung senden",
        min: "Bitte schreibe mindestens 10 Zeichen.",
        chooseRating: "Wähle eine Bewertung von 1 bis 5 Sternen.",
        thanks: "Danke für deine Bewertung!",
        thanksDesc: "Deine Bewertung erscheint nach der Prüfung auf der Website.",
        invalid: "Dieser Bewertungslink ist ungültig oder abgelaufen.",
        used: "Du hast dieses Produkt bereits bewertet. Danke!",
        error: "Etwas ist schiefgelaufen. Bitte versuche es erneut.",
        back: "Zurück zum Shop",
    },
};

type State = "loading" | "form" | "sending" | "done" | "invalid" | "used";

export function ReviewForm({ token, lang }: { token: string; lang: string }) {
    const t = TEXTS[lang as keyof typeof TEXTS] || TEXTS.ro;
    const [state, setState] = useState<State>(token ? "loading" : "invalid");
    const [productTitle, setProductTitle] = useState("");
    const [name, setName] = useState("");
    const [rating, setRating] = useState(0);
    const [hover, setHover] = useState(0);
    const [text, setText] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        if (!token) return;
        fetch(`/api/reviews?token=${encodeURIComponent(token)}`, { cache: "no-store" })
            .then(async res => {
                if (res.status === 409) return setState("used");
                if (!res.ok) return setState("invalid");
                const data = await res.json();
                setProductTitle(data.productTitle);
                setName(data.name || "");
                setState("form");
            })
            .catch(() => setState("invalid"));
    }, [token]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        if (rating < 1) return setError(t.chooseRating);
        if (text.trim().length < 10) return setError(t.min);

        setState("sending");
        try {
            const res = await fetch("/api/reviews", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ token, rating, text, name }),
            });
            if (res.ok) return setState("done");
            if (res.status === 409) return setState("used");
            if (res.status === 404) return setState("invalid");
            setError(t.error);
        } catch {
            setError(t.error);
        }
        setState("form");
    };

    const card = "bg-secondary/20 border border-white/5 rounded-3xl p-8";

    if (state === "loading") {
        return (
            <div className={cn(card, "flex justify-center")}>
                <Loader2 className="w-8 h-8 text-primary animate-spin" />
            </div>
        );
    }

    if (state === "done" || state === "used" || state === "invalid") {
        const ok = state !== "invalid";
        return (
            <div className={cn(card, "text-center space-y-6")}>
                <div className={cn("w-20 h-20 rounded-full flex items-center justify-center mx-auto", ok ? "bg-primary/20" : "bg-yellow-500/10")}>
                    {ok ? <CheckCircle2 className="w-10 h-10 text-primary" /> : <AlertTriangle className="w-10 h-10 text-yellow-500" />}
                </div>
                <div className="space-y-2">
                    <h1 className="text-2xl font-bold text-white">
                        {state === "done" ? t.thanks : state === "used" ? t.used : t.invalid}
                    </h1>
                    {state === "done" && <p className="text-zinc-400">{t.thanksDesc}</p>}
                </div>
                <Link
                    href={`/${lang}/shop`}
                    className="inline-block px-8 py-3 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
                >
                    {t.back}
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className={cn(card, "space-y-6")}>
            <div>
                <h1 className="text-3xl font-bold text-white">{t.title}</h1>
                <p className="text-zinc-400 mt-1">
                    {t.for} <span className="text-primary font-medium">{productTitle}</span>
                </p>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-zinc-400">{t.rating}</label>
                <div className="flex gap-1" onMouseLeave={() => setHover(0)}>
                    {[1, 2, 3, 4, 5].map(n => (
                        <button
                            key={n}
                            type="button"
                            aria-label={`${n}/5`}
                            onClick={() => setRating(n)}
                            onMouseEnter={() => setHover(n)}
                            className="p-1"
                        >
                            <Star
                                className={cn(
                                    "w-8 h-8 transition-colors",
                                    n <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-zinc-600"
                                )}
                            />
                        </button>
                    ))}
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm text-zinc-400">{t.name}</label>
                <input
                    value={name}
                    maxLength={80}
                    onChange={e => setName(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
            </div>

            <div className="space-y-2">
                <label className="text-sm text-zinc-400">{t.text}</label>
                <textarea
                    required
                    rows={5}
                    maxLength={2000}
                    value={text}
                    placeholder={t.placeholder}
                    onChange={e => setText(e.target.value)}
                    className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors"
                />
            </div>

            {error && <p className="text-sm text-red-400">{error}</p>}

            <button
                type="submit"
                disabled={state === "sending"}
                className="w-full py-4 bg-primary text-black rounded-full font-bold text-lg hover:bg-emerald-400 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
            >
                {state === "sending" && <Loader2 className="w-5 h-5 animate-spin" />}
                {t.submit}
            </button>
        </form>
    );
}
