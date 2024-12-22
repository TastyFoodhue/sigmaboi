// app.js

let previousData = null; // Store previous data to detect changes

// Check if Notification API is supported
if ("Notification" in window) {
    // Request permission to send notifications when the page loads
    Notification.requestPermission().then(function(permission) {
        if (permission === "granted") {
            // Start polling for updates from the JSON file as soon as the page loads
            startPolling();
        } else {
            alert("Notification permission denied");
        }
    });

    // Function to start polling for the JSON file updates every 30 seconds
    function startPolling() {
        setInterval(() => {
            fetchNotifications();
        }, 30000);  // Check every 30 seconds
    }

    // Function to fetch and display notifications from the JSON file
    function fetchNotifications() {
        fetch('notifications.json')  // Replace with your actual JSON file path
            .then(response => response.json())
            .then(data => {
                // Check if the JSON data has changed by comparing it with the previous data
                if (JSON.stringify(data) !== JSON.stringify(previousData)) {
                    previousData = data;  // Update previous data to the new one
                    sendNotifications(data);  // Send notifications
                }
            })
            .catch(error => {
                console.error('Error fetching JSON file:', error);
            });
    }

    // Function to send notifications based on the JSON data
    function sendNotifications(data) {
        data.forEach(notificationData => {
            const notification = new Notification(notificationData.title, {
                body: notificationData.body,
                icon: notificationData.icon
            });

            // Event listener for notification click
            notification.onclick = function() {
                window.open("https://example.com");  // Optional: open a link on click
            };
        });
    }

} else {
    alert("Your browser does not support notifications.");
}
