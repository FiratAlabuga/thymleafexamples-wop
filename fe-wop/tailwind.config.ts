import type { Config } from "tailwindcss";
import withMT from "@material-tailwind/react/utils/withMT";

const config: Config = withMT({
    content: [
        "./src/**/*.{js,jsx,ts,tsx}", // Projenizdeki tüm JS/TS/JSX/TSX dosyalarını tarar
    ],
    theme: {
        extend: {
            colors: {
                // Özel renkler ekleyebilirsiniz
                primary: "#3b82f6", // Örnek bir birincil renk
                secondary: "#6b7280", // Örnek bir ikincil renk
            },
            fontFamily: {
                // Özel fontlar ekleyebilirsiniz
                sans: ["Inter", "sans-serif"],
            },
        },
    },
    plugins: [
        // Ek Tailwind eklentileri ekleyebilirsiniz
    ],
});

export default config;