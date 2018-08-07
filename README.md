# webview-tile-header
Adaptive mobile header for nexpaq webview tiles

NexpaqHeader.js file always contains latest version of WebView Tile Header.

## Install

If your are using npm, you can install webview tile header using the command below:

```bash

npm install https://github.com/moduware/webview-tile-header.git

```

## Usage

Usage example:
```javascript
document.addEventListener('DOMContentLoaded', function(e) {
  // Create header
  NexpaqHeader.create('Test app');
  
  // Add button to header (right side)
  NexpaqHeader.addButton({
    title: 'settings',
    number: 1,
    id: 'header-notifications-button'
  });
});
```
