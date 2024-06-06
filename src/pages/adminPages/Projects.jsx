import SettingsIcon from "@mui/icons-material/Settings";
import AddIcon from "@mui/icons-material/Add";
import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import VerticalDivider from "../../components/VerticalDivider";
import Fab from "@mui/material/Fab";

import SettingsDialog from "../../components/ProjectSettingDialog";
import AddDialog from "../../components/ProjectAddDialog";

/* Simple - data which will be shown in data table
Simple project data:
    - id
    - name
    - description
    - employeesCount
*/

function Projects() {
    const [projectsData, setProjectsData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [isAddOpen, setIsAddOpen] = useState(false);
    const [settingsProjectsId, setSettingsProjectsId] = useState(null);

    const handleAddingNewProject = (newProject) => {
        setProjectsData((prevProjectsData) => [
            ...prevProjectsData.filter(
                (project) => project.id !== newProject.id
            ),
            newProject,
        ]);
    };

    const handleProjectSettingsChange = (id, simpleProjectData) => {
        // TODO: implement change simple data here
        // so it will be unnecessary to fetch again
    };

    const handleSettingsOpen = (id) => {
        setSettingsProjectsId(id);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    const handleAddOpen = () => {
        setIsAddOpen(true);
    };

    const handleAddClose = () => {
        setIsAddOpen(false);
    };

    useEffect(() => {
        // TODO: fetch projects basic data here
        // id bedzie indexem w tablicy
        setProjectsData([
            {
                id: 1,
                name: "Timertraco",
                description:
                    "Aplikacja dyuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu uuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuuu uuuuuuuuuuuuuuuuuuuuuuuuuuu uuuuuuufto zarzau uu u u u  uuuu  uu u u u u u u u uu u u uu u  uu u  u u u uu  u uu u u u  u u u uu  u u u u udzania czasem pracy",
                employeesCount: 3,
            },
        ]);
    }, []);

    return (
        <div className="flex flex-col w-full items-center h-full overflow-hidden">
            <TableHeader />
            <TableData
                projectsData={projectsData}
                handleSettingsClick={handleSettingsOpen}
            />
            <SettingsDialog
                projectId={settingsProjectsId}
                projectsData={projectsData}
                isOpen={isOpen}
                handleClose={handleClose}
                changeSpecificProject={handleProjectSettingsChange}
            />
            <Fab
                color="primary"
                aria-label="add"
                sx={{
                    position: "absolute",
                    bottom: "2rem",
                    right: "2rem",
                }}
                onClick={handleAddOpen}
            >
                <AddIcon />
            </Fab>
            <AddDialog
                isOpen={isAddOpen}
                handleClose={handleAddClose}
                addToProjectsData={handleAddingNewProject}
            />
        </div>
    );
}

function TableHeader() {
    return (
        <div className="flex flex-col w-4/5 items-center">
            <div className="flex flex-col pl-4 pr-4 pb-4 w-full ">
                <div className="flex flex-row w-full h-12 bg-backgroundColor items-center rounded-lg mt-4 justify-evenly text-fontColor">
                    <div className="w-[15%] text-center overflow-hidden">
                        Nazwa
                    </div>
                    <VerticalDivider />
                    <div className="w-[60%] text-center overflow-hidden">
                        Opis
                    </div>
                    <VerticalDivider />
                    <div className="w-[10%] text-center overflow-hidden">
                        Ilosc pracownikow
                    </div>
                    <VerticalDivider />
                    <div className="w-[4%] text-center overflow-hidden">
                        Wiecej
                    </div>
                </div>
            </div>
        </div>
    );
}

function TableData({ projectsData, handleSettingsClick }) {
    let projects = projectsData
        .sort((a, b) => a.name.localeCompare(b.name))
        .map((project, index) => {
            return (
                <Project
                    key={index}
                    id={project.id}
                    name={project.name}
                    description={project.description}
                    employeesCount={project.employeesCount}
                    handleSettingsClick={handleSettingsClick}
                />
            );
        });

    return (
        <div
            className="flex flex-col w-4/5 h-5/6 bg-primaryColor items-center rounded-lg 
                            overflow-y-scroll overflow-x-hidden border-2 border-primaryColor
                            pr-0"
        >
            <div className="flex flex-col pl-4 pr-[0.40rem] pb-4 w-full ">
                {projects}
            </div>
        </div>
    );
}

function Project({
    id,
    name,
    description,
    employeesCount,
    handleSettingsClick,
}) {
    return (
        <div className="flex flex-row w-full min-h-12 bg-backgroundColor items-center rounded-lg mt-4 justify-evenly text-fontColor">
            <div className="w-[15%] text-center overflow-hidden">{name}</div>
            <VerticalDivider />
            <div className="w-[60%] text-left overflow-hidden pt-2 pb-2 break-words">
                {description}
            </div>
            <VerticalDivider />
            <div className="w-[10%] text-center overflow-hidden">
                {employeesCount}
            </div>
            <VerticalDivider />
            <button
                className="w-[4%] text-center overflow-hidden"
                onClick={() => handleSettingsClick(id)}
            >
                <Icon
                    component={SettingsIcon}
                    sx={{
                        "&:hover": { color: "#195591" },
                    }}
                ></Icon>
            </button>
        </div>
    );
}

export default Projects;
