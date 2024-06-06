import Dialog from "@mui/material/Dialog";
import Loading from "./Loading";

function SettingsDialog({
    projectId,
    isOpen,
    handleClose,
    changeSpecificProject,
}) {
    // TODO: fetch all project data related to specific project id
    // make possible to change it and send it to server
    // wait is data is save on server and show loading animation
    // change it in projectsData memory so its unnecessary to fetch again in projects page

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
                <span className="text-fontColor">{projectId}</span>
            </div>
        </Dialog>
    );
}

export default SettingsDialog;
