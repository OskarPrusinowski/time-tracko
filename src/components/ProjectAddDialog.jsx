import Dialog from "@mui/material/Dialog";
import { useEffect, useState, useRef, useLayoutEffect } from "react";

/* Simple - data which will be shown in data table
Simple project data:
    - id
    - name
    - description
    - employeesCount
*/

function AddDialog({ isOpen, handleClose, addToProjectsData }) {
    // TODO: make server call for adding project wait for response
    // while showing loading screen then show success or error
    // then add to projectsData memory so its unnecessary to fetch again

    // fetch all employees so they can be added to project
    const [allEmployees, setAllEmployees] = useState([]);
    const [selectedEmployeesIDs, setSelectedEmployeesIDs] = useState([]);
    const [uploadedImage, setUploadedImage] = useState(null);

    useEffect(() => {
        // fetch employees here
        setAllEmployees([
            { id: 1, name: "fabian", surename: "sucholas" },
            { id: 2, name: "wiktoria", surename: "nowak" },
            { id: 3, name: "cezary", surename: "stranc" },
            { id: 4, name: "lukasz", surename: "kowalski" },
            { id: 5, name: "justyna", surename: "przychodzka" },
            { id: 6, name: "kamil", surename: "kapiela" },
            { id: 7, name: "milosz", surename: "bala" },
            { id: 8, name: "remigusz", surename: "pawlowski" },
            { id: 9, name: "amelia", surename: "sucholas" },
            { id: 10, name: "sebastian", surename: "sucholas" },
            { id: 11, name: "marzena", surename: "sucholas" },
            { id: 12, name: "dariusz", surename: "sucholas" },
        ]);
    }, []);

    function handleSubmition(e) {
        e.preventDefault();

        let values = e.target;
        // selectedEmployeesIDs.forEach((id) => {});
        // uploadedImage;

        // 1. Get all from data
        // 2. Send it to server
        // 3. Wait for response of its id
        // 4. Add it to projectsData with returned id

        addToProjectsData({
            id: 2,
            name: values.name.value,
            description: values.description.value,
            employeesCount: selectedEmployeesIDs.length,
        });

        setSelectedEmployeesIDs([]);
    }

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
                <DataForm
                    handleSubmition={handleSubmition}
                    selectedEmployeesIDs={selectedEmployeesIDs}
                    setSelectedEmployeesIDs={setSelectedEmployeesIDs}
                    allEmployees={allEmployees}
                    uploadedImage={uploadedImage}
                    setUploadedImage={setUploadedImage}
                    closeDialog={handleClose}
                />
            </div>
        </Dialog>
    );
}

function DataForm({
    handleSubmition,
    selectedEmployeesIDs,
    setSelectedEmployeesIDs,
    allEmployees,
    uploadedImage,
    setUploadedImage,
    closeDialog,
}) {
    // Don't look at this :)
    const first = useRef(null);
    const third = useRef(null);
    const fourth = useRef(null);

    const [employeesMaxHeight, setEmployeesMaxHeight] = useState("200");
    const employeesMaxHeightStyled = { maxHeight: employeesMaxHeight + "px" };

    useLayoutEffect(() => {
        function updateSize() {
            setEmployeesMaxHeight(
                window.innerHeight * 0.7 -
                    first.current.clientHeight -
                    third.current.clientHeight -
                    fourth.current.clientHeight -
                    32
            );
        }
        window.addEventListener("resize", updateSize);
        updateSize();
        return () => window.removeEventListener("resize", updateSize);
    }, []);
    // You can look below this line
    const [searchEmployee, setSearchEmployee] = useState("");

    function handleFileUpload(e) {
        setUploadedImage(URL.createObjectURL(e.target.files[0]));
    }

    function cancelForm() {
        setSelectedEmployeesIDs([]);
        setUploadedImage(null);
        closeDialog();
    }

    function allEmployeesFilter(f) {
        if (selectedEmployeesIDs !== undefined)
            if (selectedEmployeesIDs.includes(f.id)) return false;

        return (
            f.name.includes(searchEmployee) ||
            f.surename.includes(searchEmployee) ||
            (f.name + " " + f.surename).includes(searchEmployee) ||
            searchEmployee === ""
        );
    }

    const showSplitLine =
        selectedEmployeesIDs.length !== 0 &&
        selectedEmployeesIDs.length !== allEmployees.length;

    const selectedEmployeesChips = selectedEmployeesIDs.map((id, index) => {
        return (
            <button
                key={index}
                type="button"
                className="flex flex-row p-2 border bg-green-600 border-green-600 m-1 rounded-md
                             hover:bg-red-600 hover:border-red-600"
                value={id}
                onClick={(e) => {
                    setSelectedEmployeesIDs(
                        selectedEmployeesIDs.filter(
                            (f) => f !== parseInt(e.target.value)
                        )
                    );
                }}
            >
                {allEmployees.find((f) => f.id === id).name +
                    " " +
                    allEmployees.find((f) => f.id === id).surename}
            </button>
        );
    });

    const allEmployeesChips = allEmployees
        .filter((f) => {
            return allEmployeesFilter(f);
        })
        .map((employee, index) => {
            return (
                <button
                    key={index}
                    type="button"
                    className="flex flex-row p-2 bg-gray-600 border border-gray-600 m-1 rounded-md
                                 hover:bg-green-600 hover:border-green-600"
                    value={employee.id}
                    onClick={(e) => {
                        setSelectedEmployeesIDs([
                            ...selectedEmployeesIDs,

                            parseInt(e.target.value),
                        ]);
                    }}
                >
                    {employee.name + " " + employee.surename}
                </button>
            );
        });

    return (
        <form
            onSubmit={handleSubmition}
            className="bg-backgroundColor grid grid-rows-[min-content_max-content_min-content] auto-cols-[1fr] gap-[0px 0px] grid-flow-row 
                            w-[70dvw] h-[70dvh] max-w-[70dvw] max-h-[70dvh]"
        >
            <div className="[grid-area:1_/_1_/_2_/_2]" ref={first}>
                <div className="flex flex-col w-full h-full">
                    <label
                        htmlFor="name"
                        className="mt-2 ml-4 text-fontColor text-lg font-bold"
                    >
                        Nazwa projektu:
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Nazwa..."
                        required
                        className="bg-backgroundColor text-fontColor resize-none m-4 p-2 mt-0 border border-gray-500 rounded-md"
                    />
                </div>
            </div>
            <div className="grid grid-cols-[42%_34%_24%] auto-rows-[1fr] gap-[0px 0px] grid-flow-row [grid-area:2_/_1_/_3_/_2] ml-2 mr-2">
                <div className="[grid-area:1_/_1_/_2_/_2]">
                    <div className="h-full flex flex-col w-full p-2">
                        <label
                            htmlFor="description"
                            className=" text-fontColor text-lg font-bold"
                        >
                            Opis projektu:
                        </label>
                        <textarea
                            type="text"
                            id="description"
                            name="description"
                            placeholder="Opis..."
                            required
                            className="bg-backgroundColor text-fontColor resize-none h-full w-full p-2 mt-0  border border-gray-500 rounded-md"
                        />
                    </div>
                </div>
                <div className="grid grid-cols-[1fr] grid-rows-[min-content_auto] gap-[0px 0px] [grid-template-areas:'.'_'.'] [grid-area:1_/_2_/_2_/_3] p-2">
                    <div className="w-full" ref={fourth}>
                        <label
                            htmlFor="description"
                            className=" text-fontColor text-lg font-bold"
                        >
                            Pracownicy:
                        </label>
                        <input
                            type="text"
                            id="searchEmployee"
                            name="searchEmployee"
                            placeholder="Imie lub nazwisko aby wyszukac..."
                            className="bg-backgroundColor text-fontColor resize-none p-2 mt-0 border border-gray-500 rounded-md w-full"
                            onChange={(e) => setSearchEmployee(e.target.value)}
                        />
                    </div>
                    <div className="w-full">
                        <div
                            className="bg-backgroundColor text-fontColor mt-4 p-2 border border-gray-500 rounded-md overflow-y-scroll flex flex-row flex-wrap"
                            style={employeesMaxHeightStyled}
                        >
                            {selectedEmployeesChips}
                            {showSplitLine && (
                                <div className="w-full h-[1px] bg-gray-500 m-1" />
                            )}
                            {allEmployeesChips}
                        </div>
                    </div>
                </div>
                <div className="[grid-area:1_/_3_/_2_/_4]">
                    <div className="h-full flex flex-col w-full p-2">
                        <label
                            htmlFor="name"
                            className="text-fontColor text-lg font-bold"
                        >
                            Ikona projektu:
                        </label>
                        <input
                            type="file"
                            name="icon"
                            id="icon"
                            accept="image/png, image/jpeg, image/jpg, image/svg+xml"
                            onChange={handleFileUpload}
                            className="hidden"
                        />
                        <label
                            htmlFor="icon"
                            className="p-2 bg-secondaryColor w-full text-center text-fontColor rounded-lg mb-4

                        hover:bg-accentColor hover:text-white"
                        >
                            Dodaj ikone
                        </label>
                        <div className="w-full flex flex-col items-center justify-center border border-gray-500 rounded-md h-full">
                            <img src={uploadedImage} />
                        </div>
                    </div>
                </div>
            </div>
            <div className="[grid-area:3_/_1_/_4_/_2]" ref={third}>
                <div className="flex w-full justify-center pb-2 pt-2 gap-6">
                    <button
                        type="submit"
                        className="p-4 bg-secondaryColor w-1/4 text-center text-fontColor rounded-lg
                            hover:bg-accentColor hover:text-white"
                    >
                        Dodaj projekt!
                    </button>
                    <button
                        type="reset"
                        className="p-4 bg-secondaryColor w-1/4 text-center text-fontColor rounded-lg
                            hover:bg-accentColor hover:text-white"
                        onClick={cancelForm}
                    >
                        Anuluj
                    </button>
                </div>
            </div>
        </form>
    );
}

export default AddDialog;
