document.getElementById('enableMode').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'clean' });
    });
  });
  
  document.getElementById('theme').addEventListener('change', (event) => {
    let selectedTheme = event.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'applyTheme', theme: selectedTheme });
    });
  });
  
  document.getElementById('font').addEventListener('change', (event) => {
    let selectedFont = event.target.value;
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'applyFont', font: selectedFont });
    });
  });
  
  document.getElementById('downloadContent').addEventListener('click', () => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      chrome.tabs.sendMessage(tabs[0].id, { action: 'download' });
    });
  });