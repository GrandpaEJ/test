const TeraDood = require('@kodingkeundev/teradood');

document.getElementById('downloadButton').addEventListener('click', async () => {
    const url = document.getElementById('urlInput').value;

    try {
        const result = await TeraDood.terabox(url);
        // You can perform actions with the 'result' here
        document.getElementById('result').textContent = JSON.stringify(result, null, 2);
    } catch (error) {
        // Handle errors
        console.error('Something went wrong', error);
    }
});
