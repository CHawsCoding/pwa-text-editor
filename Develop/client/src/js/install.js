const butInstall = document.getElementById("buttonInstall");

// Logic for installing the PWA
// TODO: Add an event handler to the `beforeinstallprompt` event
// Event for handling the beforeinstallprompt
window.addEventListener("beforeinstallprompt", (event) => {
  // Prevent Chrome <= 67 from automatically showing the prompt
  event.preventDefault();
  // Store the event for triggering it later.
  window.deferredPrompt = event;
  // Update the install UI to notify the user app can be installed
  butInstall.removeAttribute("hidden");
});

// TODO: Implement a click event handler on the `butInstall` element
// Click event for the install button
butInstall.addEventListener("click", (event) => {
  // Hide the install button
  butInstall.setAttribute("hidden", true);
  // Show the prompt
  window.deferredPrompt.prompt();
  // Wait for the user to respond to the prompt
  window.deferredPrompt.userChoice.then((choiceResult) => {
    if (choiceResult.outcome === "accepted") {
      console.log("User accepted the install prompt");
    } else {
      console.log("User dismissed the install prompt");
    }
    window.deferredPrompt = null;
  });
});

// TODO: Add an handler for the `appinstalled` event
// Event for handling app installation
window.addEventListener("appinstalled", (event) => {
  console.log("👍", "appinstalled", event);
  // Clear the deferredPrompt variable, since it's no longer needed
  window.deferredPrompt = null;
});
