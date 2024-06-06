import { useState, Fragment } from "react";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import Icon from "@mui/material/Icon";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

// TODO: Dac jako odzielny plik
const pagesLinks = {
    admin: [
        {
            name: "Użytkownicy",
            link: "/admin/users",
        },
        {
            name: "Projekty",
            link: "/admin/projects",
        },
    ],
    user: [
        {
            name: "Strona główna",
            link: "/",
        },
        {
            name: "Historia",
            link: "/WorkHistory",
        },
    ],
};

function SideBar({ isAdmin, userName, userSurename }) {
    const anchor = "left";
    const [isOpen, setIsOpen] = useState(false);

    const toggleDrawer = (open) => (event) => {
        if (
            event.type === "keydown" &&
            (event.key === "Tab" || event.key === "Shift")
        ) {
            return;
        }

        setIsOpen(open);
    };

    let userLinks = Object.keys(pagesLinks.user).map((key, index) => {
        return (
            <LinkButton
                key={index}
                link={pagesLinks.user[key]["link"]}
                name={pagesLinks.user[key]["name"]}
                toggleDrawer={toggleDrawer}
            />
        );
    });

    let adminLinks = Object.keys(pagesLinks.admin).map((key, index) => {
        return (
            <LinkButton
                key={index}
                link={pagesLinks.admin[key]["link"]}
                name={pagesLinks.admin[key]["name"]}
                toggleDrawer={toggleDrawer}
            />
        );
    });

    return (
        <Fragment key={anchor}>
            <div className="flex flex-row justify-between">
                <Button onClick={toggleDrawer(true)} sx={{ width: "1rem" }}>
                    <Icon component={MenuIcon} />
                </Button>
                <div className="flex h-full text-fontColor items-center pr-4">
                    Zalogowany: {userName} {userSurename}
                </div>
            </div>
            <Drawer anchor={anchor} open={isOpen} onClose={toggleDrawer(false)}>
                <div className="flex flex-col h-screen w-48 bg-secondaryColor">
                    {userLinks}
                    {isAdmin && <hr className="mt-2" />}
                    {isAdmin && adminLinks}
                </div>
            </Drawer>
        </Fragment>
    );
}

function LinkButton({ link, name, toggleDrawer }) {
    return (
        <Link
            to={link}
            className="text-fontColor"
            onClick={toggleDrawer(false)}
        >
            <div className="flex w-full pt-4 pb-4 justify-center hover:bg-primaryColor transition-all duration-300">
                {name}
            </div>
        </Link>
    );
}

export default SideBar;
