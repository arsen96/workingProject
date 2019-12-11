window.addEventListener('DOMContentLoaded', () => {
    document.getElementById('page-spinner-container').style.display = 'flex'; // show spinner
});


postal.subscribe({
    channel: "electron",
    topic: "babylone.ready",
    callback: function (data, envelope) {
        document.getElementById('page-spinner-container').style.display = 'none'; // show spinner
    }
});
