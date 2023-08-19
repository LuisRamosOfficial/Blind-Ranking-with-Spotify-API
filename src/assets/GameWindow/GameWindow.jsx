import styles from './GameWindow.module.scss';

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
	const fiveTracks = Random(5, allTracks);

  
	return <div>GameWindow</div>;
};

export default GameWindow;
