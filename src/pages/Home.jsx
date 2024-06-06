import Loading from "../components/Loading";

function Home() {
    return (
        <div className="flex flex-col justify-center">
            <h1 className="text-fontColor text-center">Home page</h1>
            <Loading />
        </div>
    );
}

export default Home;
