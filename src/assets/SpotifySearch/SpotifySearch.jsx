import { createSignal } from 'solid-js';
import styles from './SpotifySearch.module.scss';
import {GetToken} from './getToken'

const SpotifySearch = () => {
	const [inputValue, setInputValue] = createSignal();

	const SearchPlaylist = async (e) => {
		e.preventDefault();
		const PlaylistID = inputValue()
			.slice(0, inputValue().lastIndexOf('?'))
			.slice(inputValue().lastIndexOf('/') + 1);
    
    const token = await GetToken()

	

	};

	return (
		<form
			onSubmit={(e) => {
				e.preventDefault();
				SearchPlaylist(e);
			}}
			class={styles.SearchBox}
		>
			<p class={styles.formLabel}>Enter a Spotify Playlist Link: </p>
			<div class={styles.inputBox}>
				<input
					onKeyUp={(e) => setInputValue(e.target.value)}
					onChange={(e) => setInputValue(e.target.value)}
				/>
				<button type="submit" />
			</div>
		</form>
	);
};

export default SpotifySearch;
