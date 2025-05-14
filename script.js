// JavaScript file: script.js

function toggleTheme() {
  document.body.classList.toggle('dark-mode');
}

function processImage() {
  const imageInput = document.getElementById('imageInput');
  const resultBox = document.getElementById('ocrResult');
  const loading = document.getElementById('loading');

  if (!imageInput.files.length) {
    alert('Please upload an image first.');
    return;
  }

  const file = imageInput.files[0];
  const reader = new FileReader();

  reader.onload = function () {
    loading.style.display = 'block';
    resultBox.textContent = '';

    Tesseract.recognize(
      reader.result,
      'eng',
      {
        logger: (m) => console.log(m),
      }
    ).then(({ data: { text } }) => {
      loading.style.display = 'none';
      resultBox.textContent = text;
       console.log("OCR Text:", text); 

      // Mock AI Health Check
      if (i/sugar|paraben|preservative|salt|oil/i.test(text)) {
        resultBox.textContent += "\n\n⚠️ This product contains ingredients that may be harmful in excess. Use with caution.";
      } else {
        resultBox.textContent += "\n\n✅ This product seems generally safe based on the ingredients.";
      }
    });
  };

  reader.readAsDataURL(file);
}
