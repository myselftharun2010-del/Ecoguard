const viewer = document.getElementById("modelViewer");
const loading = document.getElementById("loading");
const fileInput = document.getElementById("fileInput");

let rotating = true;

/* Model loaded */
if (viewer) {
    viewer.addEventListener("load", () => {
        if (loading) {
            loading.innerText = "3D Model Loaded";
            
            setTimeout(() => {
                loading.style.opacity = "0";
            }, 1500);
        }
    });
}

/* Reset camera */
function resetCamera() {
    if (viewer) {
        viewer.cameraOrbit = "0deg 75deg 105%";
        viewer.fieldOfView = "30deg";
    }
}

/* Auto rotation */
function toggleRotation() {
    if (!viewer) return;
    rotating = !rotating;

    if (rotating) {
        viewer.setAttribute("auto-rotate", "");
    } else {
        viewer.removeAttribute("auto-rotate");
    }
}

/* Fullscreen */
function toggleFullscreen() {
    const box = document.querySelector(".viewer-box");
    if (!box) return;

    if (!document.fullscreenElement) {
        box.requestFullscreen();
    } else {
        document.exitFullscreen();
    }
}

/* Upload GLB / GLTF */
if (fileInput) {
    fileInput.addEventListener("change", function(event) {
        const file = event.target.files[0];
        if (!file || !viewer) return;

        const url = URL.createObjectURL(file);
        viewer.src = url;

        if (loading) {
            loading.innerText = "Loading New Model...";
            loading.style.opacity = "1";
        }
    });
}
