const captureButton = document.getElementById('captureButton');
const photoCanvas = document.getElementById('photoCanvas');
const serverEndpoint = '/photo'; 

captureButton.addEventListener('click', async () => {
    try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true });

        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        document.body.appendChild(videoElement);
        await videoElement.play();

        photoCanvas.width = videoElement.videoWidth;
        photoCanvas.height = videoElement.videoHeight;
        const context = photoCanvas.getContext('2d');
        context.drawImage(videoElement, 0, 0, photoCanvas.width, photoCanvas.height);

        stream.getVideoTracks()[0].stop();
        videoElement.remove();

        const imageDataURL = photoCanvas.toDataURL('image/jpeg');

        await fetch(serverEndpoint, {
            method: 'POST',
            body: JSON.stringify({ image: imageDataURL }),
            headers: {
                'Content-Type': 'application/json',
            },
        });

        console.log('Photo sent to server successfully.');
    } catch (error) {
        console.error('Error capturing and sending photo:', error);
    }
});
