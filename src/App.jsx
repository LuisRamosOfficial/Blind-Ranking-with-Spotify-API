import { createSignal } from 'solid-js';
import styles from './styles/layout.module.scss';
import SpotifySearch from './assets/SpotifySearch';
import GameWindow from './assets/GameWindow/GameWindow';

function App() {
	const [tracks, setTracks] = createSignal();

	return (
		<div class={styles.App}>
			<h1>Blind Song Ranking</h1>
			<hr></hr>
			{tracks() ? (
				<></>
			) : (
				<>
					<p class={styles.description}>
						Choose a Spotify playlist, get 5 random songs, and rank them without
						knowing the order. Test your musical instincts and discover hidden
						favorites in this exciting twist on playlist enjoyment.
					</p>
				</>
			)}
			{tracks() ? (
				<GameWindow setTracks={setTracks} tracks={tracks()} />
			) : (
				<SpotifySearch setTracks={setTracks} />
			)}
		</div>
	);
}

export default App;
