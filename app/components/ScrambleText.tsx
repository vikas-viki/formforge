import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { useMemo } from "react";

// delay: delay for the initial start
// text: the text to scramble
// speed: the speed of the scramble

const ScrambleText = ({ text, delay = 0, speed, reverse }: { text: string, delay: number, speed: number, reverse: boolean }) => {
    const chars = "QmZ3T8fP5oY7aLgR1WdCbXvsKJq0n4V9hMDy2kA6HNxUBOEtlcGpFjSwzi";
    const [scrambled, setScrambled] = useState(delay > 0 ? chars.slice(0, text.length) : text);

    const scrambleStraight = (text: string, i: number) => {
        return text
            .split("")
            .map((char, index) =>
                index < i ? char : chars[Math.floor(Math.random() * chars.length)]
            )
            .join("").slice(0, i < text.length - 3 ? -3 : text.length);
    };


    const scrambleReverse = (text: string, i: number) => {
        return text
            .split("")
            .map((char, index) => {
                return index >= text.length - i ? char : chars[Math.floor(Math.random() * chars.length)]
            })
            .join("").slice(0, i < text.length - 3 ? -3 : text.length);
    };


    useEffect(() => {
        let timeout: NodeJS.Timeout;
        let i = 0;

        const scramble = () => {
            if (i <= text.length) {
                setScrambled(
                    reverse ? scrambleReverse(text, i) : scrambleStraight(text, i)
                );
                i++;
                timeout = setTimeout(scramble, speed);
            }
        };

        setTimeout(scramble, delay);
        return () => clearTimeout(timeout);
    }, [text]);

    return <motion.span>{scrambled}</motion.span>;
};


export default ScrambleText;