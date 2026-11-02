<script>
  function processConversion() {
    const url = document.getElementById('ytUrlInput').value;
    if (!url) {
      alert('Mangyaring maglagay ng valid na YouTube URL.');
      return;
    }

    const progressBox = document.getElementById('progressBox');
    const progressBar = document.getElementById('progressBar');
    const progressPercent = document.getElementById('progressPercent');
    const statusText = document.getElementById('statusText');
    const downloadContainer = document.getElementById('downloadContainer');

    progressBox.classList.remove('hidden');
    downloadContainer.classList.add('hidden');
    let progress = 0;

    const interval = setInterval(() => {
      progress += 10;
      progressBar.style.width = progress + '%';
      progressPercent.innerText = progress + '%';

      if (progress === 40) {
        statusText.innerText = 'Extracting audio payload...';
      } else if (progress === 80) {
        statusText.innerText = 'Encoding to selected bitrate...';
      } else if (progress >= 100) {
        clearInterval(interval);
        statusText.innerText = 'Conversion Complete!';
        
        // Ipakita ang Download Button
        downloadContainer.classList.remove('hidden');
        
        // Note: Dito mo ilalagay ang totoong file link galing sa backend server mo mamaya
        const downloadBtn = document.getElementById('downloadBtn');
        downloadBtn.href = "#"; // Palitan ng totoong file URL mula sa server
      }
    }, 300);
  }
</script>