import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Normal pages
import Login from "./pages/Login";
import Home from "./pages/Home";
import WorkHistory from "./pages/WorkHistory";
import NoPage from "./pages/NoPage";

// Admin pages
import Users from "./pages/adminPages/Users";
import Projects from "./pages/adminPages/Projects";

// Components
import SideBar from "./components/SideBar";

export default function App() {
    const [user, setUser] = useState({
        isLogged: false,
        isAdmin: false,
        name: "",
        surname: "",
        email: "",
    });

    function loginHandle(e) {
        e.preventDefault();

        // TODO: Walidacja danych logowania
        let formData = e.target;
        let email = formData.email.value;

        // SHA-256
        // aktualnie bez zadnych walidacji
        // cryptedPassword jest to promise wiec do wyslalnie bedzie trzeba na niego poczekac
        const utf8 = new TextEncoder().encode(formData.password.value);
        let cryptedPassword = crypto.subtle
            .digest("SHA-256", utf8)
            .then((hashBuffer) => {
                const hashArray = Array.from(new Uint8Array(hashBuffer));
                const hashHex = hashArray
                    .map((bytes) => bytes.toString(16).padStart(2, "0"))
                    .join("");
                return hashHex;
            });

        // Dane do wyslalania na serwer do sprawdzenia
        console.log(email);
        console.log(cryptedPassword);

        setUser({
            isLogged: true,
            isAdmin: true,
            name: "Jan",
            surname: "Kowalski",
            email: "jan.kowalski@gmail.com",
        });
    }

    return (
        <div className="h-screen bg-backgroundColor flex flex-col">
            {user.isLogged ? (
                <BrowserRouter>
                    {/* Sidebar zawsze dostepny niezaleznie od otwartej strony */}
                    <SideBar
                        isAdmin={user.isAdmin}
                        userName={user.name}
                        userSurename={user.surname}
                    />
                    <Routes>
                        <Route index element={<Home />} />
                        <Route path="/WorkHistory" element={<WorkHistory />} />
                        <Route path="/*" element={<NoPage />} />

                        {user.isAdmin && (
                            <Route path="/admin/users" element={<Users />} />
                        )}
                        {user.isAdmin && (
                            <Route
                                path="/admin/projects"
                                element={<Projects />}
                            />
                        )}
                    </Routes>
                </BrowserRouter>
            ) : (
                <Login loginHandle={loginHandle} />
            )}
        </div>
    );
}
