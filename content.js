// Import the html2pdf library to handle PDF generation (added via a CDN or local file)
importScripts('html2pdf.bundle.min.js');

// Function to clean and extract the main content using Readability.js
function cleanPage() {
  let article = new Readability(document.cloneNode(true)).parse();
  document.body.innerHTML = '';
  let content = document.createElement('div');
  content.id = 'cleaned-content';
  content.innerHTML = `<h1>${article.title}</h1>${article.content}`;
  document.body.appendChild(content);
}

// Apply theme selected by the user
function applyTheme(theme) {
  if (theme === 'dark') {
    document.body.style.backgroundColor = '#333';
    document.body.style.color = '#fff';
  } else if (theme === 'sepia') {
    document.body.style.backgroundColor = '#f4ecd8';
    document.body.style.color = '#5b4636';
  } else {
    document.body.style.backgroundColor = '#fff';
    document.body.style.color = '#000';
  }
}

// Apply the selected font to the cleaned content
function applyFont(font) {
  document.body.style.fontFamily = font;
}

// Function to download the cleaned content as PDF
function downloadPDF() {
  let element = document.getElementById('cleaned-content');
  html2pdf()
    .from(element)
    .set({
      margin: 1,
      filename: 'Cleaned_Content.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' }
    })
    .save();
}

// Listen for messages from the popup to clean content, apply theme, apply font, or download content
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === "clean") {
    cleanPage();
  } else if (message.action === "applyTheme") {
    applyTheme(message.theme);
  } else if (message.action === "applyFont") {
    applyFont(message.font);
  } else if (message.action === "download") {
    downloadPDF();
  }
});
