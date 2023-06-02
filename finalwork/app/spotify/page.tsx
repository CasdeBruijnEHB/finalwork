"use client";
async function getData() {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/");
  return response.json();
}

async function getSpotiData() {
  const response = await fetch("http://localhost:3001/testPoint");
  return response.json();
}

export default async function Spotify() {
  //const user = await fetch("http://localhost:3001/login");

  async function handleButtonclick() {
    console.log("Button click!");
  }
  return (
    <>
      <div>Connect to spotify page!</div>
      <p>
        Do you want to connect your own Spotify or want to generate a room based
        on an existing playlist?
      </p>
      <button onClick={handleButtonclick}>
        <a href="http://localhost:3001/login">Button click handle</a>
      </button>
    </>
  );
}
