import { createSignal } from 'solid-js';
import styles from './SpotifySearch.module.scss';
import { GetPlaylistTracks, GetToken } from './Requests';

const SpotifySearch = (props) => {
	const [inputValue, setInputValue] = createSignal();
	const [playlist, setPlaylist] = createSignal();
	const [loadingState, setLoadingState] = createSignal(0);

	const Loader = () => (
		<div class={styles.LoadingState}>
			<div></div>
			<div></div>
			<div></div>
		</div>
	);


	const SubmitPlaylist = () => {
		console.log(JSON.stringify(playlist().Tracks))
		props.setTracks(playlist().Tracks)
	}

	const SearchPlaylist = async () => {
		setLoadingState(1)
		const PlaylistID = inputValue()
			.slice(0, inputValue().lastIndexOf('?'))
			.slice(inputValue().lastIndexOf('/') + 1);
		const token = await GetToken();
		const PlaylistData = await GetPlaylistTracks(
			PlaylistID,
			token['access_token']
		);
		console.log(PlaylistData);
		setLoadingState(0);
		setPlaylist(PlaylistData);

		// const TracksList = PlaylistData.Tracks.map((item) => {return {
		// 	Name : item.name,
		// 	duration : item.duration_ms,
		// 	preview : item.preview_url,
		// 	Artist : item.artists[0].name
		// }})
	};

	return (
		<>
			<div class={styles.SearchBox}>
				<p class={styles.formLabel}>Enter a Spotify Playlist Link: </p>
				<div class={styles.inputBox}>
					<input
						onKeyUp={(e) => setInputValue(e.target.value)}
						onChange={(e) => setInputValue(e.target.value)}
					/>
					<button onClick={SearchPlaylist} />
				</div>
			</div>
			<Show when={loadingState() == 1}>
				<Loader />
			</Show>
			<Show when={playlist() != null}>
				<div class={styles.PlaylistPreviewBox}>
					<img src={playlist().Image} />
					<p class={styles.PlaylistName}>
						{playlist().Owner} - {playlist().Name}
					</p>
					<p class={styles.PlaylistTracks}>{playlist().Total} Tracks Total</p>
					<button onClick={SubmitPlaylist} class={styles.StartButton}>Start Game</button>
				</div>
			</Show>
		</>
	);
};

export default SpotifySearch;
