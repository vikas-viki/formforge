import { Alegreya_Sans_SC, Inknut_Antiqua, Inter, Outfit, Poppins, Quicksand, Roboto } from "next/font/google";

export const outfit = Outfit({
    weight: ["300", "400", "500", "600", "700", "800", "900"],
    variable: "--font-outfit",
    subsets: ["latin"]
})

export const quickSand = Quicksand({
    weight: ["400", "500", "600", "700"],
    variable: "--font-quicksand",
    subsets: ["latin"]

})

export const poppins = Poppins({
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-poppins",
    subsets: ["latin"]

})

export const roboto = Roboto({
    weight: ["400", "500", "700", "900"],
    variable: "--font-poppins",
    subsets: ["latin"]

})

export const inkNut = Inknut_Antiqua({
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-inknut",
    subsets: ["latin"]
})


export const alegereya = Alegreya_Sans_SC({
    weight: ["100", "300", "400", "500", "700", "800", "900"],
    variable: "--font-inknut",
    subsets: ["latin"]
})

export const inter = Inter({
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-inknut",
    subsets: ["latin"]
})