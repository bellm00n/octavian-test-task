import Loader from './components/Loader';
import "../public/styles/styles.css"

window.onload = () => {
  const game = new Loader();
  game.start();
};
