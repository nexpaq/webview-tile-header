# webview-tile-header
Adaptive mobile header for moduware webview tiles

WebViewTileHeader.js file always contains latest version of WebView Tile Header.

Usage example:
```javascript
document.addEventListener('DOMContentLoaded', function(e) {
  // Create header
  WebViewTileHeader.create('Test app');
  
  // Add button to header (right side)
  WebViewTileHeader.addButton({
    title: 'settings',
    number: 1,
    id: 'header-notifications-button'
  });
});
```
