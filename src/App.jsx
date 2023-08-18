import { createSignal } from 'solid-js';
import styles from './styles/layout.module.scss';
import SpotifySearch from './assets/SpotifySearch';


function App() {

//   const [first, setfirst] = createSignal()
  



  return (
		<div class={styles.App}>
			<h1>Blind Song Ranking</h1>
			<p class={styles.description}>
				Choose a Spotify playlist, get 5 random songs, and rank them without
				knowing the order. Test your musical instincts and discover hidden
				favorites in this exciting twist on playlist enjoyment.
			</p>
			<SpotifySearch />
		</div>
	);
}

export default App;
