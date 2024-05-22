![image](https://github.com/cartaplassa/dorkerbox/assets/99555654/cf17a321-b00f-4a92-a330-2d5a1fcdc329)

## Supported search engines

- [Google](https://www.google.com/)
- [Duckduckgo](https://duckduckgo.com/)
- [Duckduckgo HTML](https://html.duckduckgo.com/html/)
- [Duckduckgo Lite](https://lite.duckduckgo.com/lite/)

## Installation

1. Clone this repository.
2. Install pnpm globally: `npm install -g pnpm` (check your node version >= 16.6, recommended >= 18)
3. Run `pnpm install`

### Chrome

4. Run:
    - Dev: `pnpm dev` or `npm run dev`
    - Prod: `pnpm build` or `npm run build`
5. Open in browser - `chrome://extensions`
6. Check - `Developer mode`
7. Find and Click - `Load unpacked extension`
8. Select - `dist` folder

### Firefox

4. Run:
    - Dev: `pnpm dev:firefox` or `npm run dev:firefox`
    - Prod: `pnpm build:firefox` or `npm run build:firefox`
5. Open in browser - `about:debugging#/runtime/this-firefox`
6. Find and Click - `Load Temporary Add-on...`
7. Select - `manifest.json` from `dist` folder

## Usage

1. Make a new search 
	- Injection from start page is not supported
2. Click "+" button
3. Enter text
4. Press "Enter" or click "V"
5. Click on text to insert it in search field

Customization is available in popup


