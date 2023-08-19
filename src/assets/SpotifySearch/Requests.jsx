export const GetToken = async () => {
	const response = await fetch('https://accounts.spotify.com/api/token', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/x-www-form-urlencoded',
		},
		body: `grant_type=client_credentials&client_id=${
			import.meta.env.VITE_SPOTIFY_CLIENT
		}&client_secret=${import.meta.env.VITE_SPOTIFY_SECRET_CLIENT}`,
	});
	return response.json();
};

export const GetPlaylistTracks = async (PlaylistID, token) => {
	const request = await fetch(
		`https://api.spotify.com/v1/playlists/${PlaylistID}/tracks`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ` + token,
			},
		}
	);
	const response = await request.json();


	const playlistRequest = await fetch(
		`https://api.spotify.com/v1/playlists/${PlaylistID}`,
		{
			method: 'GET',
			headers: {
				Authorization: `Bearer ` + token,
			},
		}
	);
	const PlaylistResponse = await playlistRequest.json();

	const PlaylistDetails = {
		Name : PlaylistResponse.name,
		Owner : PlaylistResponse.owner.display_name,
		Image : PlaylistResponse.images[0].url,
		Total : PlaylistResponse.tracks.total
	}

	let LeftOut = response.total - 100;
	let TrackList = response.items.map((item) => item.track);
	let offset = 100;
	while (LeftOut > 0) {
		const request = await fetch(
			`https://api.spotify.com/v1/playlists/${PlaylistID}/tracks?offset=${offset}`,
			{
				method: 'GET',
				headers: {
					Authorization: `Bearer ` + token,
				},
			}
		);
		const response = await request.json();
		TrackList = [...TrackList, ...response.items.map((item) => item.track)];
		LeftOut -= 100;
		offset += 100;
	}

	return {
		...PlaylistDetails,	
		Tracks: TrackList,
	};
};
