export type FieldProps = {
    name: string;
    inputElement: React.ReactElement;
    left?: string;
    right?: string;
};

export const Fields: React.FC<FieldProps> = ({
    name,
    inputElement,
    left = "1/2",
    right = "1/2",
}) => {
    return (
        <div className="flex">
            <div className={`w-${left}`}>{name}</div>
            <div className={`w-${right}`}>{inputElement}</div>
        </div>
    );
};
