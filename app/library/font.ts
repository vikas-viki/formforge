import { Outfit, Quicksand, Roboto } from "next/font/google";

export const outfit = Outfit({
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-outfit",
})

export const roboto = Roboto({
    weight: ["400", "500", "600", "700", "800", "900"],
    variable: "--font-roboto",
})

export const quickSand = Quicksand({
    weight: ["400", "500", "600", "700"],
    variable: "--font-quicksand",
})