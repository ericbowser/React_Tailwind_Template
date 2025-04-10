function convertWebPToPNG(webpImageBlob) {
    return new Promise((resolve, reject) => {
        // Create URL from the WebP blob
        const webpObjectUrl = URL.createObjectURL(webpImageBlob);

        // Create an image element and load WebP
        const img = document.createElement('img');
        img.onload = () => {
            // Create canvas
            const canvas = document.createElement('canvas');
            canvas.width = img.width;
            canvas.height = img.height;

            // Draw image to canvas
            const ctx = canvas.getContext('2d');
            ctx.drawImage(img, 0, 0);

            // Convert to PNG
            const pngDataUrl = canvas.toDataURL('image/png');

            // Clean up
            URL.revokeObjectURL(webpObjectUrl);

            // Convert data URL to Blob if needed
            fetch(pngDataUrl)
                .then(res => res.blob())
                .then(pngBlob => resolve(pngBlob))
                .catch(reject);
        };

        img.onerror = () => {
            URL.revokeObjectURL(webpObjectUrl);
            reject(new Error('Error loading WebP image'));
        };

        img.src = webpObjectUrl;
    });
}

export default convertWebPToPNG;