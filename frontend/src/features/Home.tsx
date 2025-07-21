import Header from "../components/Header/Header";
import Menu from "../components/Body/Menu"; // ✅ make sure path is correct



const Home: React.FC = () => {
    const menuButtons = [
        {
            title: "PLAY GAME",
            description: "Start a new game!",
            buttonText: "Play",
            buttonLink: "/game",
            buttonbackground: "green", // or a color like "blue"
        },
        {
            title: "SHOP",
            description: "Buy new skins",
            buttonText: "View",
            buttonLink: "/shop",
            buttonbackground: "gold",
        },
        {
            title: "SETTINGS",
            description: "Customize your experience",
            buttonText: "Open",
            buttonLink: "/settings",
            buttonbackground: "gray",
        },
        {
            title: "EXIT",
            description: "Logout from the game",
            buttonText: "Logout",
            buttonLink: "/settings",
            buttonbackground: "red",
        }
    ];


    return (
        <div>
            <Header pageTitle="Home page" />
            <Menu buttons={menuButtons} orientation="vertical" />
        </div>
    );
};

export default Home;
