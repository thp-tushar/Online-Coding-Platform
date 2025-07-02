import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from "@mui/material";
import { testCaseType } from "@zeditor/common";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

export interface TopicProps {
    name: string;
    index: number;
    setAccordionElementState: React.Dispatch<
        React.SetStateAction<(testCaseType | string)[]>
    >;
    accoridionElementState: (testCaseType | string)[];
}

export const Topic: React.FC<TopicProps> = ({
    name,
    index,
    setAccordionElementState,
    accoridionElementState,
}) => {
    const [topic, setTopic] = useState("");
    function handleTopicChange(e: React.ChangeEvent<HTMLInputElement>) {
        setTopic(e.target.value);
    }
    function handleTopicSubmit() {
        const temp = [...accoridionElementState];
        temp[index] = topic;
        setAccordionElementState(temp);
        toast.success(`${name} data is set`);
    }
    return (
        <>
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
                        onChange={handleTopicChange}
                    />
                    <Button variant="outlined" onClick={handleTopicSubmit}>
                        Submit
                    </Button>
                </AccordionDetails>
            </Accordion>
            <Toaster position="top-center" />
        </>
    );
};
