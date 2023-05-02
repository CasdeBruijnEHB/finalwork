var client_id = "57c1daec36f24f40b21aa8b9dfe3e15b";
var client_secret = "4b462df074a5417faa79cd92918e05dd";

async function getToken() {
  const response = await fetch("https://accounts.spotify.com/api/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: client_id,
      client_secret: client_secret,
      grant_type: "client_credentials",
    }),
  });
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }

  const data = await response.json();
  return data.access_token;
}

async function getData() {
  const access_token = await getToken();
  const id = "3Sz7ZnJQBIHsXLUSo0OQtM";
  console.log("accesstoken: " + access_token);

  const res = await fetch(`https://api.spotify.com/v1/artists/${id}`, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return res.json();
}

export default async function Spotify() {
  const data = await getData();
  console.log(data);
  return (
    <>
      <p>Spotifypage</p>
    </>
  );
}
