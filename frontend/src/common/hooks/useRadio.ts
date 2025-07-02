import { useEffect, useState } from "react";
import { Difficulty, DifficultyType } from "@zeditor/common";

type InputProps = {
    name: string;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
export const useRadio = (
    name: string,
    defaultValue: DifficultyType
): [DifficultyType, InputProps] => {
    const [value, setValue] = useState<DifficultyType>(defaultValue);

    useEffect(() => {
        const storedValue = sessionStorage.getItem(name);
        const difficultyEnum =
            Difficulty.Enum[storedValue as keyof typeof Difficulty.Enum];
        setValue(difficultyEnum || defaultValue);
    }, [name, defaultValue]);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value;
        const difficultyEnum =
            Difficulty.Enum[newValue as keyof typeof Difficulty.Enum];
        if (difficultyEnum === undefined) {
            console.log("invalid difficulty value");
        }
        setValue(difficultyEnum);
        sessionStorage.setItem(name, newValue);
    };

    const inputProps = {
        name,
        type: "radio",
        onChange: handleChange,
    };

    return [value, inputProps];
};
