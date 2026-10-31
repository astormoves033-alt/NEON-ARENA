
// NEON ARENA - SERVER BROWSER

const playButton = document.getElementById("playButton");
const backButton = document.getElementById("backButton");

const hero = document.querySelector(".hero");
const lobby = document.getElementById("lobby");

const serverList = document.getElementById("serverList");
const serverSearch = document.getElementById("serverSearch");
const regionFilter = document.getElementById("regionFilter");
const refreshButton = document.getElementById("refreshButton");
const noServers = document.getElementById("noServers");

// Demo servers for testing
const servers = [
    {
        name: "Neon City",
        map: "Urban Arena",
        players: "6/10",
        ping: "42 ms",
        region: "Asia"
    },
    {
        name: "Shadow Zone",
        map: "Industrial Base",
        players: "8/10",
        ping: "58 ms",
        region: "Asia"
    },
    {
        name: "Pro Arena",
        map: "Desert Outpost",
        players: "3/10",
        ping: "71 ms",
        region: "Europe"
    },
    {
        name: "Nightfall",
        map: "Night City",
        players: "5/10",
        ping: "95 ms",
        region: "North America"
    }
];

// Open server browser
playButton.addEventListener("click", () => {
    hero.classList.add("hidden");
    lobby.classList.remove("hidden");

    displayServers();
});

// Return to homepage
backButton.addEventListener("click", () => {
    lobby.classList.add("hidden");
    hero.classList.remove("hidden");
});

// Display servers
function displayServers() {

    serverList.innerHTML = "";

    const searchText = serverSearch.value.toLowerCase();
    const selectedRegion = regionFilter.value;

    const filteredServers = servers.filter(server => {

        const matchesSearch =
            server.name.toLowerCase().includes(searchText) ||
            server.map.toLowerCase().includes(searchText);

        const matchesRegion =
            selectedRegion === "All" ||
            server.region === selectedRegion;

        return matchesSearch && matchesRegion;
    });

    noServers.classList.toggle(
        "hidden",
        filteredServers.length !== 0
    );

    filteredServers.forEach((server, index) => {

        const card = document.createElement("div");

        card.className = "server-card";

        card.innerHTML = `
            <div>
                <strong>${server.name}</strong>
                <small>${server.region}</small>
            </div>

            <span>${server.map}</span>

            <span>${server.players}</span>

            <span>${server.ping}</span>

            <button class="join-btn" data-index="${index}">
                JOIN
            </button>
        `;

        serverList.appendChild(card);
    });

    // Join button actions
    document.querySelectorAll(".join-btn").forEach(button => {

        button.addEventListener("click", () => {

            const index = Number(button.dataset.index);
            const server = filteredServers[index];

            alert(
                "You selected " + server.name +
                ". Multiplayer connection is coming soon!"
            );

        });

    });
}

// Search servers
serverSearch.addEventListener("input", displayServers);

// Filter by region
regionFilter.addEventListener("change", displayServers);

// Refresh server list
refreshButton.addEventListener("click", displayServers);


