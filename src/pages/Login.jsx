import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

function Login({ loginHandle }) {
    return (
        <div className="bg-backgroundColor w-full h-screen flex justify-center">
            <div className="flex border-white mt-48 h-max bg-primaryColor rounded-lg">
                <form onSubmit={loginHandle} className="flex flex-col p-6">
                    <TextField
                        key="email"
                        id="standard-basic1"
                        name="email"
                        label="Email"
                        variant="outlined"
                        size="medium"
                        type="email"
                        sx={{ width: "400px" }}
                        required
                    />

                    <div className="m-4"></div>

                    <TextField
                        key="password"
                        id="standard-basic2"
                        name="password"
                        label="Password"
                        variant="outlined"
                        size="medium"
                        type="password"
                        sx={{ width: "400px" }}
                        required
                    />

                    <div className="m-4"></div>

                    <Button variant="outlined" type="submit">
                        Login
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default Login;
