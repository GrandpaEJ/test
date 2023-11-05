document.addEventListener('DOMContentLoaded', () => {
    const fetchInfoButton = document.getElementById('fetchInfoButton');
    const videoRadio = document.getElementById('videoRadio');
    const audioRadio = document.getElementById('audioRadio');
    const resolutionSelect = document.getElementById('resolutionSelect');
    const generateDownloadLinkButton = document.getElementById('generateDownloadLinkButton');
    const downloadAnchor = document.getElementById('downloadAnchor');

    fetchInfoButton.addEventListener('click', async () => {
        const videoUrl = document.getElementById('videoUrl').value;
        if (!videoUrl) return;

        const videoInfoResponse = await fetch(`https://www.youtubeinmp4.com/fetch/?format=JSON&video=${videoUrl}`);
        const videoInfo = await videoInfoResponse.json();
        if (videoInfo.status === 'ok') {
            resolutionSelect.innerHTML = '';
            videoInfo.formats.forEach((format, index) => {
                resolutionSelect.innerHTML += `<option value="${index}">${format.quality}</option>`;
            });
        } else {
            console.error('Failed to fetch video info');
        }
    });

    generateDownloadLinkButton.addEventListener('click', () => {
        const videoUrl = document.getElementById('videoUrl').value;
        const selectedFormatIndex = resolutionSelect.value;
        const downloadType = videoRadio.checked ? 'video' : 'audio';
        
        if (!videoUrl || selectedFormatIndex === '') return;

        const downloadFormat = videoRadio.checked ? 'video' : 'audio';
        const videoInfoResponse = fetch(`https://www.youtubeinmp4.com/fetch/?video=${videoUrl}`);
        videoInfoResponse
            .then((response) => response.json())
            .then((videoInfo) => {
                if (videoInfo.status === 'ok') {
                    const format = videoInfo.formats[selectedFormatIndex];
                    const downloadUrl = format[downloadType];
                    downloadAnchor.href = downloadUrl;
                    downloadAnchor.style.display = 'block';
                }
            })
            .catch((error) => {
                console.error('Failed to fetch video info: ', error);
            });
    });
});
            
