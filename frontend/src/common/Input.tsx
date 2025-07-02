type InputType = {
    label: string;
};

export function Input({ label }: InputType) {
    return (
        <div className="h-10 px-5 mb-10">
            <label htmlFor="" className="block mb-2">
                {label}
            </label>
            <input
                type="text"
                id="signin-email"
                className="block border border-black border-2 w-full"
            />
        </div>
    );
}
