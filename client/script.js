document
  .getElementById("statusForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const url = document.getElementById("urlInput").value.trim();
    if (!url) {
      alert("Please enter a valid URL.");
      return;
    }

    const button = document.getElementById("checkButton");
    const buttonText = document.getElementById("buttonText");
    const loader = document.getElementById("loader");
    button.disabled = true;
    buttonText.style.visibility = "hidden";
    loader.style.display = "block";

    fetch(`http://localhost:8000/api/uptime?url=${encodeURIComponent(url)}`)
      .then((response) => response.json())
      .then((data) => {
        const statusResult = document.getElementById("statusResult");
        if (data.status === "UP") {
          statusResult.textContent = "Status: 🟢 Up";
          statusResult.style.color = "green";
        } else if (data.status === "DOWN") {
          statusResult.textContent = "Status: 🔴 Down";
          statusResult.style.color = "red";
        } else {
          statusResult.textContent = "Status: Unknown";
          statusResult.style.color = "gray";
        }
      })
      .catch((error) => {
        console.error("Error:", error);
        document.getElementById("statusResult").textContent =
          "Error fetching status.";
        document.getElementById("statusResult").style.color = "red";
      })
      .finally(() => {
        button.disabled = false;
        buttonText.style.visibility = "visible";
        loader.style.display = "none";
      });
  });
