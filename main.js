let deferredPrompt;
const installBtn = document.querySelector("#install-button");

// 1. & 2. Listen for the event and store it
window.addEventListener("beforeinstallprompt", (e) => {
  // Prevent Chrome 67 and earlier from automatically showing the prompt
  e.preventDefault();
  // Stash the event so it can be triggered later.
  deferredPrompt = e;
  // Update UI to notify the user they can install the PWA
  installBtn.style.display = "block";
});

// 3. & 4. Trigger the prompt on button click
installBtn.addEventListener("click", async () => {
  if (deferredPrompt !== null) {
    // Show the prompt
    deferredPrompt.prompt();
    // Wait for the user to respond to the prompt
    const { outcome } = await deferredPrompt.userChoice;
    console.log(`User response: ${outcome}`);
    // We've used the prompt, and can't use it again
    deferredPrompt = null;
    // Hide the install button
    installBtn.style.display = "none";
  }
});
