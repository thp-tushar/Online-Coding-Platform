import { SampleTestCaseProps } from "../fields/SampleTestCase";
import { ConstraintProps } from "../fields/Constraint";
import { TopicProps } from "../fields/Topic";
import { useState } from "react";
import { IconButton } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import { createProblemType, testCaseType } from "@zeditor/common";
import {
    createProblemAction,
    createProblemActionType,
} from "../../reducers/createProblemReducer";
import BackupIcon from "@mui/icons-material/Backup";
import toast, { Toaster } from "react-hot-toast";

type AccordionCustomProps = {
    prefix: string;
    ReactComponent:
        | React.FC<SampleTestCaseProps>
        | React.FC<ConstraintProps>
        | React.FC<TopicProps>;
    createProblemDispatch: React.Dispatch<createProblemAction>;
    action: createProblemActionType;
    createProblemState: createProblemType;
    field: string;
};

export const AccordionCustom: React.FC<AccordionCustomProps> = ({
    prefix,
    ReactComponent,
    createProblemDispatch,
    action,
    field,
    createProblemState,
}) => {
    const [accoridionElementState, setAccordionElementState] = useState<
        (testCaseType | string)[]
    >([]);

    const [accordionElements, setAccordionElements] = useState([
        { name: `${prefix}1` },
    ]);

    function handleAccordionSubmit() {
        createProblemDispatch({
            type: action,
            payload: {
                ...createProblemState,
                [field]: accoridionElementState,
            },
        });
        toast.success("data set");
    }

    function handleAddClick() {
        const sampleTestCount = accordionElements.length;
        setAccordionElements([
            ...accordionElements,
            { name: `${prefix}${sampleTestCount + 1}` },
        ]);
    }
    function handleDeleteClick() {
        const sampleTestCaseTemp = [...accordionElements];
        sampleTestCaseTemp.pop();
        setAccordionElements(sampleTestCaseTemp);
    }
    return (
        <div className="flex w-full justify-between">
            <div className="w-full">
                {accordionElements.map((accordionElement, index) => {
                    return (
                        <ReactComponent
                            name={accordionElement.name}
                            key={index}
                            index={index}
                            accoridionElementState={accoridionElementState}
                            setAccordionElementState={setAccordionElementState}
                        />
                    );
                })}
            </div>
            <IconButton onClick={handleAddClick}>
                <AddIcon />
            </IconButton>
            <IconButton
                onClick={handleDeleteClick}
                disabled={accordionElements.length === 1}
            >
                <DeleteIcon />
            </IconButton>
            <IconButton onClick={handleAccordionSubmit}>
                <BackupIcon />
            </IconButton>
            <Toaster />
        </div>
    );
};
