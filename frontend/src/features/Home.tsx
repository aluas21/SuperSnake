import Header from '../components/Header/Header';
import Menu from '../components/Menu/Menu'; // ✅ make sure path is correct

const Home: React.FC = () => {
  
  const menuButtons = [
    {
      title: 'PLAY GAME',
      description: 'Start a new game!',
      buttonText: 'Play',
      buttonLink: '/game-modes',
      buttonBackground: 'green', // or a color like "blue"
    },
    {
      title: 'SHOP',
      description: 'Buy new skins',
      buttonText: 'View',
      buttonLink: '/shop',
      buttonBackground: 'gold',
    },
    {
      title: 'SETTINGS',
      description: 'Customize your experience',
      buttonText: 'Open',
      buttonLink: '/settings',
      buttonBackground: 'gray',
    },
    {
      title: 'EXIT',
      description: 'Logout from the game',
      buttonText: 'Logout',
      buttonLink: 'handleLogout', // This should be a function or a route that handles logout
      buttonBackground: 'red',
    },
  ];

  

  return (
    <div>
      <Header pageTitle="Home" />
      <Menu buttons={menuButtons} orientation="vertical" />
    </div>
  );
};

export default Home;
