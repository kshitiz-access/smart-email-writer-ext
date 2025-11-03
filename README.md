# Email Writer Chrome Extension

Chrome extension that adds AI-powered email reply generation directly to Gmail.

## Features

- **Gmail Integration** - Seamless integration with Gmail compose window
- **One-Click Generation** - Generate professional email replies instantly
- **Smart Content Detection** - Automatically extracts email context
- **Professional Styling** - Beautiful gradient button design
- **Error Handling** - User-friendly error messages
- **Cross-Browser Support** - Works with Chrome, Brave, Edge

## Installation

### Development Mode
1. Open Chrome/Brave and go to `chrome://extensions/`
2. Enable "Developer mode" (toggle in top right)
3. Click "Load unpacked"
4. Select the `email-writer-ext/` folder
5. Extension will appear in your extensions list

### Production (Chrome Web Store)
1. Visit Chrome Web Store
2. Search for "Email Writer Assistant"
3. Click "Add to Chrome"

## Usage

1. **Open Gmail** in your browser
2. **Compose a new email** or **reply to existing email**
3. **Look for the "✨ AI Reply" button** in the compose toolbar
4. **Click the button** to generate an AI-powered reply
5. **Generated text appears** in the compose box
6. **Edit as needed** and send

## Technical Details

### Manifest V3
- Uses latest Chrome extension standards
- Secure content script injection
- Proper permissions handling

### Files Structure
```
email-writer-ext/
├── manifest.json       # Extension configuration
├── content.js          # Main functionality
├── content.css         # Styling (empty)
└── README.md          # This file
```

### Permissions
- `activeTab` - Access current Gmail tab
- `storage` - Store user preferences
- `http://localhost:8080/*` - Development API access
- `https://*.railway.app/*` - Production API access
- `*://mail.google.com/*` - Gmail access

## Configuration

### API Endpoints
The extension automatically detects environment:
- **Development**: `http://localhost:8080`
- **Production**: `https://your-backend-url.railway.app`

### Supported Gmail Views
- Compose new email
- Reply to email
- Forward email
- All Gmail layouts (new and classic)

## Development

### Local Testing
1. Ensure backend is running on `http://localhost:8080`
2. Load extension in developer mode
3. Open Gmail and test functionality
4. Check browser console for debug messages

### Debugging
1. Right-click in Gmail → "Inspect"
2. Go to "Console" tab
3. Look for messages starting with "Email Writer Extension"
4. Check for any error messages

### Code Structure

#### content.js
- **Button Creation** - Creates styled AI reply button
- **Email Detection** - Extracts email content from Gmail
- **API Communication** - Sends requests to backend
- **DOM Manipulation** - Inserts generated replies

#### Key Functions
- `createAIButton()` - Creates the UI button
- `getEmailContent()` - Extracts email text
- `findComposeToolbar()` - Locates Gmail toolbar
- `injectButton()` - Adds button to Gmail

## Browser Compatibility

- **Chrome** 88+
- **Brave** (all versions)
- **Microsoft Edge** 88+
- **Opera** 74+

## Security

- Content Security Policy compliant
- No external script loading
- Secure API communication
- No sensitive data storage

## Troubleshooting

### Button Not Appearing
1. Check if extension is enabled
2. Refresh Gmail page
3. Check browser console for errors
4. Verify Gmail is fully loaded

### "Failed to Fetch" Error
1. Ensure backend API is running
2. Check network connectivity
3. Verify API URL in console
4. Check CORS configuration

### Button Appears But No Response
1. Check backend API health endpoint
2. Verify Gemini API key is set
3. Check browser network tab for API calls
4. Look for error messages in console

## Customization

### Button Styling
Edit the `button.style.cssText` in `content.js`:
```javascript
button.style.cssText = `
    margin-right: 8px;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    border-radius: 4px;
    padding: 8px 12px;
    cursor: pointer;
    font-size: 12px;
    font-weight: 500;
`;
```

### API Configuration
Update `API_BASE_URL` in `content.js` for different environments.

## Publishing to Chrome Web Store

1. **Prepare Extension**
   - Test thoroughly
   - Update manifest version
   - Create icons (16x16, 48x48, 128x128)

2. **Create Developer Account**
   - Visit Chrome Web Store Developer Dashboard
   - Pay one-time $5 registration fee

3. **Upload Extension**
   - Zip the extension folder
   - Upload to dashboard
   - Fill out store listing details

4. **Review Process**
   - Google reviews extension (1-3 days)
   - Address any feedback
   - Extension goes live after approval

## License

MIT License

## Support

For issues and feature requests:
1. Check existing GitHub issues
2. Create new issue with:
   - Browser version
   - Extension version
   - Steps to reproduce
   - Console error messages
