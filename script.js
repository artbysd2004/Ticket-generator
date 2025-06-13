document.getElementById("ticketForm").addEventListener("submit", function(event) {
    event.preventDefault();
    
    document.getElementById("ticketName").textContent = document.getElementById("name").value;
    document.getElementById("ticketEvent").textContent = document.getElementById("event").value;
    document.getElementById("ticketDate").textContent = document.getElementById("date").value;
    document.getElementById("ticketSeat").textContent = document.getElementById("seat").value;

    const ticketDiv = document.getElementById("ticket");
    ticketDiv.style.display = "block";

    // Handle image upload
    const imageInput = document.getElementById("image").files[0];
    const ticketImage = document.getElementById("ticketImage");
    if (imageInput) {
        const reader = new FileReader();
        reader.onload = function(e) {
            ticketImage.src = e.target.result;
            ticketImage.style.display = "block";
        };
        reader.readAsDataURL(imageInput);
    }

    // Center QR code
    document.getElementById("qrcode").innerHTML = "";
    new QRCode(document.getElementById("qrcode"), {
        text: `Name: ${document.getElementById("name").value}, Event: ${document.getElementById("event").value}, Date: ${document.getElementById("date").value}, Seat: ${document.getElementById("seat").value}`,
        width: 100,
        height: 100
    });
});

// Fix Download Functionality
document.getElementById("downloadBtn").addEventListener("click", function() {
    html2canvas(document.getElementById("ticket")).then(canvas => {
        let link = document.createElement("a");
        link.href = canvas.toDataURL("image/png");
        link.download = "ticket.png";
        link.click();
    });
});

// Print Functionality
document.getElementById("printBtn").addEventListener("click", function() {
    window.print();
});