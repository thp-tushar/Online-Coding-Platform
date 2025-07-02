import { ExpandMore } from "@mui/icons-material";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Button,
} from "@mui/material";
import { Fields } from "../common/Fields";
import { useReducer, useState } from "react";
import { useFile } from "../../../../common/hooks/useFile";
import {
    sampleTestCaseActionType,
    sampleTestCaseInitialState,
    sampleTestCaseReducer,
} from "../../reducers/sampleTestCaseReducer";
import { testCaseType } from "@zeditor/common";
import toast, { Toaster } from "react-hot-toast";

export interface SampleTestCaseProps {
    name: string;
    index: number;
    setAccordionElementState: React.Dispatch<
        React.SetStateAction<(testCaseType | string)[]>
    >;
    accoridionElementState: (testCaseType | string)[];
}

export const SampleTestCase: React.FC<SampleTestCaseProps> = ({
    name,
    index,
    setAccordionElementState,
    accoridionElementState,
}) => {
    const [uploadFile] = useFile();
    const [image, setImage] = useState<File | null>(null);
    const [rateLimit, setRateLimit] = useState(true);
    const [loading, setLoading] = useState(false);

    const [sampleTestCaseState, sampleTestCaseDispatch] = useReducer(
        sampleTestCaseReducer,
        sampleTestCaseInitialState
    );

    function handleImageInputClick(e: React.MouseEvent<HTMLInputElement>) {
        (e.target as HTMLInputElement).value = "";
    }

    function handleImageInputChange(e: React.ChangeEvent<HTMLInputElement>) {
        if (!e.target.files) {
            return;
        }

        setRateLimit(true);
        setImage(e.target.files[0]);
        toast.success(`image set for ${name}`);
    }

    async function handleImageUpload() {
        if (!(image && rateLimit)) {
            return;
        }

        setLoading(true);
        setRateLimit(false);
        const url = await uploadFile(image);
        // setUploadImageToast(true);
        setLoading(false);
        sampleTestCaseDispatch({
            type: sampleTestCaseActionType.SET_IMAGE,
            payload: { ...sampleTestCaseState, image: url },
        });
        toast.success(`image uploaded for ${name}`);
    }

    function handleInputTestCaseChange(
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) {
        sampleTestCaseDispatch({
            type: sampleTestCaseActionType.SET_INPUT,
            payload: {
                ...sampleTestCaseState,
                input: e.target.value,
            },
        });
    }

    function handleOutputTestCaseChange(
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) {
        sampleTestCaseDispatch({
            type: sampleTestCaseActionType.SET_OUTPUT,
            payload: {
                ...sampleTestCaseState,
                output: e.target.value,
            },
        });
    }

    function handleExplanationChange(
        e: React.ChangeEvent<HTMLTextAreaElement>
    ) {
        sampleTestCaseDispatch({
            type: sampleTestCaseActionType.SET_EXPLANATION,
            payload: {
                ...sampleTestCaseState,
                explanation: e.target.value,
            },
        });
    }

    function handleTestCaseSubmit() {
        const temp = [...accoridionElementState];
        temp[index] = sampleTestCaseState;
        setAccordionElementState(temp);
        toast.success(`${name} data is set`);
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
                    <Fields
                        name="image"
                        inputElement={
                            <div className="space-x-4 flex">
                                <Button
                                    onClick={handleImageUpload}
                                    variant="outlined"
                                >
                                    {loading ? "Uploading" : "Upload"}
                                </Button>
                                <input
                                    type="file"
                                    className="border-2"
                                    onClick={handleImageInputClick}
                                    onChange={handleImageInputChange}
                                />
                            </div>
                        }
                        right="3/4"
                    />
                    <Fields
                        name="input"
                        inputElement={
                            <textarea
                                onChange={handleInputTestCaseChange}
                                className="border-2"
                            />
                        }
                        right="3/4"
                    />
                    <Fields
                        name="output"
                        inputElement={
                            <textarea
                                onChange={handleOutputTestCaseChange}
                                className="border-2"
                            />
                        }
                        right="3/4"
                    />
                    <Fields
                        name="explanation"
                        inputElement={
                            <textarea
                                onChange={handleExplanationChange}
                                className="border-2"
                            />
                        }
                        right="3/4"
                    />
                    <Button variant="outlined" onClick={handleTestCaseSubmit}>
                        Submit
                    </Button>
                </AccordionDetails>
            </Accordion>
            <Toaster />
        </div>
    );
};
