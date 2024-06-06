/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    theme: {
        extend: {
            height: {
                screen: ["100vh", "100dvh"],
            },
            colors: {
                fontColor: "#E6E7E7",
                backgroundColor: "#161718",
                primaryColor: "#9CBCDC",
                secondaryColor: "#195591",
                accentColor: "#3094F8",
            },
        },
        screens: {
            "2xl": { max: "1535px" },
            xl: { max: "1279px" },
            lg: { max: "1023px" },
            md: { max: "767px" },
            sm: { max: "639px" },
        },
    },
    plugins: [],
};
