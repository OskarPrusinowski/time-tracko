import SettingsIcon from "@mui/icons-material/Settings";
import { Icon } from "@mui/material";
import { useEffect, useState } from "react";
import VerticalDivider from "../../components/VerticalDivider";
import SettingsDialog from "../../components/UserSettingDialog";

/* Simple - data which will be shown in data table
Simple user data:
    - id
    - name
    - surename
    - email
    - dateFrom
    - dateTo
    - projects (count)
*/

function Users() {
    const [usersData, setUsersData] = useState([]);
    const [isOpen, setIsOpen] = useState(false);
    const [settingsUserId, setSettingsUserId] = useState(null);

    const handleClickOpen = (id) => {
        setSettingsUserId(id);
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        // TODO: fetch basic users data here
        // id bedzie indexem w tablicy
        setUsersData([
            {
                id: 1,
                name: "Jan",
                surename: "Kowalski",
                email: "fabian.sucholas123@gmail.com",
                dateFrom: "2021-10-10",
                dateTo: "2021-10-10",
                projects: "3",
            },
            {
                id: 2,
                name: "Iza",
                surename: "Walczak",
                email: "fabian.sucholas123@gmail.com",
                dateFrom: "2021-10-10",
                dateTo: "2021-10-10",
                projects: "2",
            },
        ]);
    }, []);

    return (
        <div className="flex flex-col w-full items-center h-full overflow-hidden">
            <TableHeader />
            <TableData
                usersData={usersData}
                handleSettingsClick={handleClickOpen}
            />
            <SettingsDialog
                userId={settingsUserId}
                isOpen={isOpen}
                handleClose={handleClose}
            ></SettingsDialog>
        </div>
    );
}

function TableHeader() {
    return (
        <div className="flex flex-col w-4/5 items-center">
            <div className="flex flex-col pl-4 pr-4 pb-4 w-full ">
                <div className="flex flex-row w-full h-12 bg-backgroundColor items-center rounded-lg mt-4 justify-evenly text-fontColor">
                    <div className="w-[20%] text-center overflow-hidden">
                        <span>Imie i nazwisko</span>
                    </div>
                    <VerticalDivider />
                    <div className="w-[30%] text-center overflow-hidden">
                        e-mail
                    </div>
                    <VerticalDivider />
                    <div className="w-[12%] text-center overflow-hidden">
                        Data rozpoczecia
                    </div>
                    <VerticalDivider />
                    <div className="w-[12%] text-center overflow-hidden">
                        Data zakonczenia
                    </div>
                    <VerticalDivider />
                    <div className="w-[6%] text-center overflow-hidden">
                        Liczba projektow
                    </div>
                    <VerticalDivider />
                    <div className="w-[4%] text-center overflow-hidden">
                        Edycja
                    </div>
                </div>
            </div>
        </div>
    );
}

function TableData({ usersData, handleSettingsClick }) {
    let users = usersData
        .sort((a, b) => a.surename.localeCompare(b.surename))
        .map((user, index) => {
            return (
                <User
                    key={index}
                    id={user.id}
                    name={user.name}
                    surename={user.surename}
                    email={user.email}
                    dateFrom={user.dateFrom}
                    dateTo={user.dateTo}
                    projects={user.projects}
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
                {users}
            </div>
        </div>
    );
}

function User({
    id,
    name,
    surename,
    email,
    dateFrom,
    dateTo,
    projects,
    handleSettingsClick,
}) {
    return (
        <div className="flex flex-row w-full h-12 bg-backgroundColor items-center rounded-lg mt-4 justify-evenly text-fontColor">
            <div className="w-[20%] text-center overflow-hidden">
                <span>
                    {name} {surename}
                </span>
            </div>
            <VerticalDivider />
            <div className="w-[30%] text-center overflow-hidden">{email}</div>
            <VerticalDivider />
            <div className="w-[12%] text-center overflow-hidden">
                {dateFrom}
            </div>
            <VerticalDivider />
            <div className="w-[12%] text-center overflow-hidden">{dateTo}</div>
            <VerticalDivider />
            <div className="w-[6%] text-center overflow-hidden">{projects}</div>
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

export default Users;
