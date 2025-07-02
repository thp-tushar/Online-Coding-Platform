import { Snackbar, Alert, AlertColor } from "@mui/material";

type Variant = "standard" | "filled" | "outlined";
type Horizontal = "left" | "center" | "right";
type Vertical = "top" | "bottom";
type Toast = {
    severity: AlertColor;
    variant: Variant;
    content?: string;
    open: boolean;
    setOpen: React.Dispatch<React.SetStateAction<boolean>>;
    horizontal: Horizontal;
    vertical: Vertical;
};

export const Toast: React.FC<Toast> = ({
    severity,
    variant,
    content,
    open,
    setOpen,
    horizontal,
    vertical,
}: Toast) => {
    function handleClose() {
        setOpen(false);
    }

    return (
        <>
            <Snackbar
                anchorOrigin={{ horizontal, vertical }}
                open={open}
                autoHideDuration={6000}
                onClose={handleClose}
            >
                <Alert
                    onClose={handleClose}
                    severity={severity}
                    variant={variant}
                    sx={{ width: "100%" }}
                >
                    {content}
                </Alert>
            </Snackbar>
        </>
    );
};
