
let url = "";

let qrCode;

const input = document.querySelector("#urlInput");
input.addEventListener("change", (event) => {
    url = event.target.value;
});

const searchButton = document.querySelector(".search-button");
searchButton.addEventListener("click", () => {
    renderShow();
});



async function renderShow() {
    const body = document.body;

    const element = `
    <nav id="nav-bar">
        <img src="assets/logo-qr-generator.svg">
    </nav>
    <main class="qr-code-container">
    </main>
    <div class="action-buttons">
        <div class="action-button" onclick="changeState()">
            <p>Download</p>
            <span class="material-icons">download</span>
        </div>
        <div class="action-button" onclick="changeState()">
            <p>Share</p><span class="material-icons">share</span>
        </div>
    </div>
    `;

    body.innerHTML = element;

    const qrCodeContainer = document.querySelector(".qr-code-container");
    qrCodeContainer.innerHTML = `<span class="loader"></span>`;

    await new Promise(resolve => setTimeout(resolve, 500)).then(() => {
        qrCodeContainer.innerHTML = `<section></section><div id="qr-code">`;
        qrCode = new QRCode(document.querySelector("#qr-code"), {
            text: url,
            width: 200,
            height: 200,
            colorDark: "#000000",
            colorLight: "#ffffff",
            correctLevel: QRCode.CorrectLevel.H,
        });
    });


    const downloadButton = document.querySelector(".action-button:nth-child(1)");
    const shareButton = document.querySelector(".action-button:nth-child(2)");

    downloadButton.addEventListener("click", () => {
        const code = document.querySelector("#qr-code > img");
        const link = document.createElement("a");
        link.download = "qr-code.png";
        link.href = code.src;
        link.click();
    });

    shareButton.addEventListener("click", () => {
        const code = document.querySelector("#qr-code > img");
        navigator.clipboard.writeText(code.src);
    });
}


