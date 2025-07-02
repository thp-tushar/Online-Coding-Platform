import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import { testCaseType } from "@zeditor/common";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export interface ConstraintProps {
    name: string;
    index: number;
    setAccordionElementState: React.Dispatch<
        React.SetStateAction<(testCaseType | string)[]>
    >;
    accoridionElementState: (testCaseType | string)[];
}

export const Constraint: React.FC<ConstraintProps> = ({
    name,
    accoridionElementState,
    index,
    setAccordionElementState,
}) => {
    const [constraint, setConstraint] = useState("");
    function handleConstraintSubmit() {
        const temp = [...accoridionElementState];
        temp[index] = constraint;
        setAccordionElementState(temp);
        toast.success(`${name} data is set`);
    }

    function handleConstraintChange(e: React.ChangeEvent<HTMLInputElement>) {
        setConstraint(e.target.value);
    }

    return (
        <div>
            <Accordion>
                <AccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    {name}
                </AccordionSummary>
                <AccordionDetails>
                    <input
                        type="text"
                        className="border-2"
                        onChange={handleConstraintChange}
                    />
                    <Button variant="outlined" onClick={handleConstraintSubmit}>
                        Submit
                    </Button>
                </AccordionDetails>
            </Accordion>
            <Toaster />
        </div>
    );
};
