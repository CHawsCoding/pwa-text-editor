(()=>{var e=document.getElementById("buttonInstall");window.addEventListener("beforeinstallprompt",(function(t){t.preventDefault(),window.deferredPrompt=t,e.removeAttribute("hidden")})),e.addEventListener("click",(function(t){e.setAttribute("hidden",!0),window.deferredPrompt.prompt(),window.deferredPrompt.userChoice.then((function(e){"accepted"===e.outcome?console.log("User accepted the install prompt"):console.log("User dismissed the install prompt"),window.deferredPrompt=null}))})),window.addEventListener("appinstalled",(function(e){console.log("👍","appinstalled",e),window.deferredPrompt=null}))})();