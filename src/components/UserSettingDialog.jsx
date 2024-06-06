import Dialog from "@mui/material/Dialog";
import Loading from "./Loading";

function SettingsDialog({ userId, isOpen, handleClose }) {
    // How to change object by its property snipped
    // const updateState = () => {
    //     const newState = data.map((obj) => {
    //         if (obj.id === 2) {
    //             return { ...obj, country: "Denmark" };
    //         }
    //         return obj;
    //     });
    //     setData(newState);
    // };

    return (
        <Dialog
            onClose={handleClose}
            open={isOpen}
            PaperProps={{
                sx: {
                    margin: "0",
                    padding: "0",
                    backgroundColor: "#161718",
                    height: "70dvh",
                    maxHeight: "70dvh",
                    width: "70dvw",
                    maxWidth: "70dvw",
                },
            }}
        >
            <div className="bg-backgroundColor flex flex-col h-full w-full items-center">
                <span className="text-fontColor">{userId}</span>
            </div>
        </Dialog>
    );
}

export default SettingsDialog;
