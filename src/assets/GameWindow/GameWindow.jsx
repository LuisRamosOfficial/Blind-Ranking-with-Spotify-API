import { createSignal } from 'solid-js';
import styles from './GameWindow.module.scss';
import localfiles from '../localfiles.png';

const Random = (number, array) => {
	let items = [];
	let TempList = [...array];

	for (let i = 0; i < number; i++) {
		const item = TempList[Math.floor(Math.random() * TempList.length)];
		items.push(item);
		const index = TempList.indexOf(item);
		TempList.splice(index, 1);
	}
	return items;
};

const GameWindow = (props) => {
	const allTracks = props.tracks;
	const [fiveTracks, setFiveTracks] = createSignal(Random(5, allTracks));
	const [blindRank, setBlindRank] = createSignal([0, 1, 2, 3, 4]);
	const [iteration, setIteration] = createSignal(0);
	const [finished, setFinished] = createSignal(false);
	console.log(fiveTracks()[iteration()]);

	const HandleChoice = (pos) => {
		let copyBlindRank = [...blindRank()];
		let Track = { ...fiveTracks()[iteration()] };
		if (Track.is_local) {
			Track.album.images.push({ url: localfiles });
		}
		copyBlindRank[pos] = Track;

		setBlindRank(copyBlindRank);
		if (iteration() < 4) {
			setIteration(iteration() + 1);
		} else {
			setFinished(true);
		}
	};

	return (
		<div class={finished() ? `${styles.Finished}` : styles.GameWindow}>
			<Show when={finished() == false}>
				<h2>
					{fiveTracks()[iteration()].name} -{' '}
					{fiveTracks()[iteration()].artists[0].name}
				</h2>
				{fiveTracks()[iteration()].is_local ? (
					<img class={styles.cover} src={localfiles} />
				) : (
					<img
						class={styles.cover}
						src={fiveTracks()[iteration()].album.images[0].url}
					/>
				)}
			</Show>
			<Show when={finished() == true}>
				<h1>Your Ranking:</h1>
				<div class={styles.Results}>
					<button
						onClick={() => {
							setFiveTracks(Random(5, allTracks));
							setIteration(0);
							setBlindRank([0, 1, 2, 3, 4]);
							setFinished(false);
						}}
						class={styles.TryAgainButton}
					>
						Try Again
					</button>
					<button
						onClick={() => {
							props.setTracks(null)
              }}
						class={styles.ChangePlaylistButton}
					>
						Change Playlist
					</button>
				</div>
			</Show>
			<div class={styles.Placements}>
				{blindRank()[0] == 0 ? (
					<button onClick={() => HandleChoice(0)}>1.</button>
				) : (
					<div class={styles.OpChoose}>
						<img src={blindRank()[0].album.images[0].url} />
						<span>1. {blindRank()[0].name}</span>
					</div>
				)}

				{blindRank()[1] == 1 ? (
					<button onClick={() => HandleChoice(1)}>2.</button>
				) : (
					<div class={styles.OpChoose}>
						<img src={blindRank()[1].album.images[0].url} />
						<span>2. {blindRank()[1].name}</span>
					</div>
				)}

				{blindRank()[2] == 2 ? (
					<button onClick={() => HandleChoice(2)}>3.</button>
				) : (
					<div class={styles.OpChoose}>
						<img src={blindRank()[2].album.images[0].url} />
						<span>3. {blindRank()[2].name}</span>
					</div>
				)}

				{blindRank()[3] == 3 ? (
					<button onClick={() => HandleChoice(3)}>4.</button>
				) : (
					<div class={styles.OpChoose}>
						<img src={blindRank()[3].album.images[0].url} />
						<span>4. {blindRank()[3].name}</span>
					</div>
				)}

				{blindRank()[4] == 4 ? (
					<button onClick={() => HandleChoice(4)}>5.</button>
				) : (
					<div class={styles.OpChoose}>
						<img src={blindRank()[4].album.images[0].url} />
						<span>5. {blindRank()[4].name}</span>
					</div>
				)}
			</div>
		</div>
	);
};

export default GameWindow;
