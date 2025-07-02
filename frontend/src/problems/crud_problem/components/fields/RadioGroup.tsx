type RadioGroupProps = {
    id: string;
    label: string;
    value: string;
    name: string;
    checked: boolean;
    type: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const RadioGroup: React.FC<RadioGroupProps> = ({
    value,
    checked,
    label,
    id,
    ...rest
}) => {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input value={value} checked={checked} id={id} {...rest} />
        </>
    );
};
