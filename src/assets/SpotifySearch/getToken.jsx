

export const GetToken =  async () => {
    const response = await fetch('https://accounts.spotify.com/api/token', {
      method : 'POST',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
			},
			body: `grant_type=client_credentials&client_id=${
				import.meta.env.VITE_SPOTIFY_CLIENT
			}&client_secret=${import.meta.env.VITE_SPOTIFY_SECRET_CLIENT}`,
		});
    return response.json() ;


}


