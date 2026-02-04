"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingBag,
    ShoppingCart,
    Download,
    CreditCard,
    Trash2,
    Plus,
    Minus,
    X,
    Filter,
    CheckCircle2,
    ArrowRight
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ShopSectionProps {
    dict: any;
    lang: string;
}

interface CartItem {
    id: string;
    title: string;
    price: string;
    category: string;
    quantity: number;
}

export function ShopSection({ dict, lang }: ShopSectionProps) {
    const [activeFilter, setActiveFilter] = useState("all");
    const [cart, setCart] = useState<CartItem[]>([]);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
    const [checkoutStep, setCheckoutStep] = useState(1);
    const [orderSuccess, setOrderSuccess] = useState(false);

    const searchParams = useSearchParams();

    // Check for success payment return
    useEffect(() => {
        if (searchParams.get('success') === 'true') {
            setOrderSuccess(true);
            setCart([]);
            localStorage.removeItem("monalisa-cart");
            window.history.replaceState({}, '', window.location.pathname); // Clean URL
        }
    }, [searchParams]);

    // Saved cart
    useEffect(() => {
        const savedCart = localStorage.getItem("monalisa-cart");
        if (savedCart) {
            try {
                setCart(JSON.parse(savedCart));
            } catch (e) {
                console.error("Failed to parse cart", e);
            }
        }
    }, []);

    // Save cart to localStorage
    useEffect(() => {
        if (cart.length > 0) { // Only save if not empty (avoids overwriting on initial load before clear)
            localStorage.setItem("monalisa-cart", JSON.stringify(cart));
        }
    }, [cart]);

    const products = Object.entries(dict.shop.products).map(([id, product]: [string, any]) => ({
        id,
        ...product
    }));

    const filteredProducts = activeFilter === "all"
        ? products
        : products.filter(p => p.category === activeFilter);

    const addToCart = (product: any) => {
        setCart(prev => {
            const existing = prev.find(item => item.id === product.id);
            if (existing) {
                return prev.map(item =>
                    item.id === product.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                );
            }
            return [...prev, { ...product, quantity: 1 }];
        });
        setIsCartOpen(true);
    };

    const removeFromCart = (id: string) => {
        setCart(prev => prev.filter(item => item.id !== id));
    };

    const updateQuantity = (id: string, delta: number) => {
        setCart(prev => prev.map(item => {
            if (item.id === id) {
                const newQty = Math.max(1, item.quantity + delta);
                return { ...item, quantity: newQty };
            }
            return item;
        }));
    };

    const cartTotal = cart.reduce((acc, item) => {
        const price = parseFloat(item.price.replace(" €", ""));
        return acc + (price * item.quantity);
    }, 0);

    const handleCheckout = async (e: React.FormEvent) => {
        e.preventDefault();
        if (checkoutStep < 2) {
            setCheckoutStep(2);
        } else {
            // Call Stripe API
            try {
                const response = await fetch('/api/checkout', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        items: cart,
                        cancel_url: window.location.href,
                        success_url: `${window.location.origin}/${lang}/shop?success=true`,
                        customer_email: (e.target as any).email?.value // Try to get email if available, or rely on Stripe input
                    }),
                });

                const data = await response.json();
                if (data.url) {
                    window.location.href = data.url;
                } else {
                    console.error("Stripe error:", data.error);
                    alert("Eroare la inițierea plății: " + dict.error?.generic || "Vă rugăm încercați din nou.");
                }
            } catch (err) {
                console.error("Checkout error:", err);
                alert("Eroare de conexiune.");
            }
        }
    };

    return (
        <main className="min-h-screen bg-background">
            <Navbar dict={dict.navbar} lang={lang} />

            {/* Shop Hero */}
            <section className="pt-32 pb-16 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-[120px] -z-10" />
                <div className="container px-4 mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                    >
                        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6">
                            {dict.shop.title} <span className="text-primary">{dict.shop.title_accent}</span>
                        </h1>
                        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
                            {dict.shop.subtitle}
                        </p>
                    </motion.div>
                </div>
            </section>

            {/* Shop Interface */}
            <section className="pb-32">
                <div className="container px-4 mx-auto">
                    <div className="flex flex-col md:flex-row gap-12">
                        {/* Sidebar Filters */}
                        <div className="w-full md:w-64 space-y-8">
                            <div>
                                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                                    <Filter className="w-4 h-4 text-primary" /> {dict.shop.filters.all}
                                </h3>
                                <div className="space-y-2">
                                    {Object.entries(dict.shop.filters).map(([key, label]: [string, any]) => (
                                        <button
                                            key={key}
                                            onClick={() => setActiveFilter(key)}
                                            className={cn(
                                                "w-full text-left px-4 py-2 rounded-lg transition-all text-sm font-medium",
                                                activeFilter === key
                                                    ? "bg-primary/10 text-primary border border-primary/20"
                                                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                                            )}
                                        >
                                            {label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Cart CTA if not mobile */}
                            <div className="hidden md:block p-6 rounded-2xl bg-secondary/20 border border-white/5">
                                <h4 className="text-white font-bold mb-2 flex items-center gap-2">
                                    <ShoppingCart className="w-4 h-4" /> {dict.shop.cart.title}
                                </h4>
                                <p className="text-sm text-zinc-500 mb-4">
                                    {cart.length === 0 ? dict.shop.cart.empty : `${cart.length} ${dict.shop.cart.title.toLowerCase()}`}
                                </p>
                                <button
                                    onClick={() => setIsCartOpen(true)}
                                    className="w-full py-2 bg-white text-black rounded-full font-bold text-sm hover:bg-zinc-200 transition-colors"
                                >
                                    {dict.shop.cart.checkout}
                                </button>
                            </div>
                        </div>

                        {/* Product Grid */}
                        <div className="flex-1">
                            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                                {filteredProducts.map((product) => (
                                    <motion.div
                                        layout
                                        key={product.id}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className="group bg-secondary/20 border border-white/5 rounded-3xl p-6 hover:bg-secondary/30 transition-all hover:border-primary/20"
                                    >
                                        <div className="w-12 h-12 bg-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary group-hover:scale-110 transition-transform">
                                            {product.category === 'ebooks' ? <Download /> : <ShoppingBag />}
                                        </div>
                                        <div className="space-y-2 mb-6">
                                            <div className="flex items-center justify-between">
                                                <span className="text-[10px] uppercase tracking-widest text-primary font-bold">{dict.shop.filters[product.category]}</span>
                                                <span className="text-xs text-zinc-500 font-medium">{dict.shop.digital_product}</span>
                                            </div>
                                            <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors">{product.title}</h3>
                                            <p className="text-sm text-zinc-400 line-clamp-2">{product.description}</p>
                                        </div>
                                        <div className="flex items-center justify-between mt-auto">
                                            <span className="text-2xl font-bold text-white">{product.price}</span>
                                            <button
                                                onClick={() => addToCart(product)}
                                                className="bg-white/5 hover:bg-primary hover:text-black p-3 rounded-xl transition-all border border-white/5 hover:border-primary"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Additional Info */}
                            <div className="mt-16 p-8 rounded-3xl bg-primary/5 border border-primary/10 flex flex-col md:flex-row items-center gap-6">
                                <div className="w-16 h-16 bg-primary/20 rounded-full flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-8 h-8 text-primary" />
                                </div>
                                <div className="text-center md:text-left">
                                    <h4 className="text-xl font-bold text-white mb-1">{dict.shop.instant_delivery}</h4>
                                    <p className="text-zinc-400 text-sm">Toate resursele digitale sunt livrate automat în format PDF direct pe adresa dumneavoastră de e-mail imediat după confirmarea plății.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Cart Drawer */}
            <AnimatePresence>
                {isCartOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCartOpen(false)}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[60]"
                        />
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed top-0 right-0 bottom-0 w-full max-w-md bg-secondary border-l border-white/10 z-[70] shadow-2xl flex flex-col"
                        >
                            <div className="p-6 border-b border-white/5 flex items-center justify-between">
                                <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                                    <ShoppingCart className="w-6 h-6 text-primary" /> {dict.shop.cart.title}
                                </h2>
                                <button
                                    onClick={() => setIsCartOpen(false)}
                                    className="p-2 hover:bg-white/5 rounded-full transition-colors"
                                >
                                    <X className="w-6 h-6 text-zinc-400" />
                                </button>
                            </div>

                            <div className="flex-1 overflow-y-auto p-6 space-y-6">
                                {cart.length === 0 ? (
                                    <div className="h-full flex flex-col items-center justify-center text-center space-y-4">
                                        <div className="w-20 h-20 bg-white/5 rounded-full flex items-center justify-center">
                                            <ShoppingBag className="w-10 h-10 text-zinc-600" />
                                        </div>
                                        <p className="text-zinc-500 font-medium">{dict.shop.cart.empty}</p>
                                    </div>
                                ) : (
                                    cart.map((item) => (
                                        <div key={item.id} className="flex gap-4 group">
                                            <div className="w-20 h-20 bg-primary/10 rounded-2xl flex items-center justify-center shrink-0">
                                                <Download className="text-primary w-8 h-8" />
                                            </div>
                                            <div className="flex-1 space-y-1">
                                                <h4 className="text-white font-bold group-hover:text-primary transition-colors">{item.title}</h4>
                                                <p className="text-sm text-zinc-500 uppercase text-[10px] tracking-widest">{dict.shop.filters[item.category]}</p>
                                                <div className="flex items-center gap-4 mt-2">
                                                    <div className="flex items-center bg-white/5 rounded-lg border border-white/10">
                                                        <button
                                                            onClick={() => updateQuantity(item.id, -1)}
                                                            className="p-1 hover:text-primary transition-colors"
                                                        >
                                                            <Minus className="w-4 h-4" />
                                                        </button>
                                                        <span className="w-8 text-center text-sm font-bold text-white">{item.quantity}</span>
                                                        <button
                                                            onClick={() => updateQuantity(item.id, 1)}
                                                            className="p-1 hover:text-primary transition-colors"
                                                        >
                                                            <Plus className="w-4 h-4" />
                                                        </button>
                                                    </div>
                                                    <span className="text-white font-bold ml-auto">{item.price}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => removeFromCart(item.id)}
                                                className="text-zinc-600 hover:text-red-500 transition-colors p-1"
                                            >
                                                <Trash2 className="w-5 h-5" />
                                            </button>
                                        </div>
                                    ))
                                )}
                            </div>

                            {cart.length > 0 && (
                                <div className="p-6 border-t border-white/5 bg-black/20 space-y-4">
                                    <div className="flex items-center justify-between text-xl font-bold">
                                        <span className="text-zinc-400">{dict.shop.cart.total}</span>
                                        <span className="text-white">{cartTotal} €</span>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setIsCartOpen(false);
                                            setIsCheckoutOpen(true);
                                            setCheckoutStep(1);
                                        }}
                                        className="w-full py-4 bg-primary text-black rounded-full font-bold text-lg hover:bg-emerald-400 transition-all flex items-center justify-center gap-2 group shadow-[0_0_30px_rgba(16,185,129,0.3)]"
                                    >
                                        {dict.shop.cart.checkout} <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Checkout Modal */}
            <AnimatePresence>
                {isCheckoutOpen && (
                    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsCheckoutOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-md"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: 20 }}
                            className="bg-secondary w-full max-w-2xl rounded-3xl border border-white/10 overflow-hidden relative z-10 shadow-2xl"
                        >
                            {!orderSuccess ? (
                                <form onSubmit={handleCheckout}>
                                    <div className="p-8 border-b border-white/5 flex items-center justify-between">
                                        <div>
                                            <h2 className="text-3xl font-bold text-white">{dict.shop.cart.checkout}</h2>
                                            <p className="text-zinc-500 text-sm mt-1">{checkoutStep === 1 ? "Informații contact" : "Detalii plată"}</p>
                                        </div>
                                        <div className="flex gap-2">
                                            <div className={cn("w-3 h-3 rounded-full transition-colors", checkoutStep >= 1 ? "bg-primary" : "bg-white/10")} />
                                            <div className={cn("w-3 h-3 rounded-full transition-colors", checkoutStep >= 2 ? "bg-primary" : "bg-white/10")} />
                                        </div>
                                    </div>

                                    <div className="p-8">
                                        {checkoutStep === 1 ? (
                                            <div className="space-y-6">
                                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                                    <div className="space-y-2">
                                                        <label className="text-sm text-zinc-400">Nume</label>
                                                        <input required type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                                    </div>
                                                    <div className="space-y-2">
                                                        <label className="text-sm text-zinc-400">Prenume</label>
                                                        <input required type="text" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                                    </div>
                                                </div>
                                                <div className="space-y-2">
                                                    <label className="text-sm text-zinc-400">Email (pentru livrarea produselor)</label>
                                                    <input required type="email" className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary transition-colors" />
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="space-y-6">
                                                <div className="p-6 rounded-2xl bg-primary/5 border border-primary/20 flex items-center justify-between">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                                                            <CreditCard className="text-primary w-6 h-6" />
                                                        </div>
                                                        <div>
                                                            <p className="text-white font-bold">Plată online securizată</p>
                                                            <p className="text-xs text-zinc-500">Card bancar (Stripe / Netopia)</p>
                                                        </div>
                                                    </div>
                                                    <span className="text-2xl font-bold text-white">{cartTotal} €</span>
                                                </div>
                                                <div className="space-y-4">
                                                    <div className="space-y-2">
                                                        <label className="text-sm text-zinc-400">Număr card</label>
                                                        <input placeholder="0000 0000 0000 0000" disabled className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed" />
                                                    </div>
                                                    <div className="grid grid-cols-2 gap-4">
                                                        <div className="space-y-2">
                                                            <label className="text-sm text-zinc-400">Expirare</label>
                                                            <input placeholder="MM/YY" disabled className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed" />
                                                        </div>
                                                        <div className="space-y-2">
                                                            <label className="text-sm text-zinc-400">CVC</label>
                                                            <input placeholder="***" disabled className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white/50 cursor-not-allowed" />
                                                        </div>
                                                    </div>
                                                </div>
                                                <p className="text-xs text-zinc-600 text-center italic">* Acesta este un demo. Integrarea plății va fi realizată în pasul următor.</p>
                                            </div>
                                        )}
                                    </div>

                                    <div className="p-8 border-t border-white/5 flex items-center justify-between">
                                        <button
                                            type="button"
                                            onClick={() => checkoutStep === 1 ? setIsCheckoutOpen(false) : setCheckoutStep(1)}
                                            className="text-zinc-400 hover:text-white transition-colors"
                                        >
                                            {checkoutStep === 1 ? "Anulează" : "Înapoi"}
                                        </button>
                                        <button
                                            type="submit"
                                            className="px-8 py-3 bg-primary text-black font-bold rounded-full hover:bg-emerald-400 transition-all flex items-center gap-2 group"
                                        >
                                            {checkoutStep === 1 ? "Continuă la plată" : "Confirmă Plata"} <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                        </button>
                                    </div>
                                </form>
                            ) : (
                                <div className="p-12 text-center space-y-8">
                                    <div className="w-24 h-24 bg-primary/20 rounded-full flex items-center justify-center mx-auto scale-110">
                                        <CheckCircle2 className="w-12 h-12 text-primary" />
                                    </div>
                                    <div className="space-y-4">
                                        <h2 className="text-4xl font-bold text-white">Comandă finalizată!</h2>
                                        <p className="text-zinc-400 text-lg">Vă mulțumim pentru achiziție. Produsele digitale au fost trimise pe adresa de e-mail furnizată.</p>
                                    </div>
                                    <button
                                        onClick={() => setIsCheckoutOpen(false)}
                                        className="px-10 py-4 bg-white text-black font-bold rounded-full hover:bg-zinc-200 transition-colors"
                                    >
                                        Înapoi la Magazin
                                    </button>
                                </div>
                            )}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            <Footer dict={dict.footer} lang={lang} />
        </main>
    );
}
