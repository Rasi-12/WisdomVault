# WisdomVault

## Current State
- React PWA without a proper manifest or app icons
- AudioPlayer component uses simulated playback (fake progress timer), no speech synthesis
- ElderVoicesScreen has a large play button with onPlayStateChange callback
- BrowseScreen shows knowledge cards with AudioPlayer (compact), each entry has a language field (Tamil, Telugu, Hindi)
- index.html has no PWA manifest link and no theme-color meta tag

## Requested Changes (Diff)

### Add
- PWA manifest file (`/manifest.json`) with:
  - `name: "WisdomVault"`, `short_name: "WisdomVault"`
  - `display: "standalone"`
  - `start_url`, `background_color`, `theme_color` matching brand green
  - icons array pointing to `/assets/uploads/logo-1.jpeg` (192x192 and 512x512)
- Link manifest in `index.html` + add `<meta name="theme-color">` and apple-touch-icon
- Web Speech Synthesis integration in AudioPlayer:
  - New optional prop: `speechText?: string` and `speechLang?: string`
  - When play is toggled ON: cancel any ongoing speech, call `window.speechSynthesis.speak()` with given text/lang
  - When play is toggled OFF or audio ends: call `window.speechSynthesis.cancel()`
- ElderVoicesScreen: pass `speechText` (the Tamil remedy sentence) and `speechLang="ta-IN"` to the featured AudioPlayer
- BrowseScreen: pass each entry's `description` as `speechText` and map language to lang code (Tamil→`ta-IN`, Telugu→`te-IN`, Hindi→`hi-IN`) to AudioPlayer

### Modify
- `index.html`: add manifest link, theme-color meta, apple-touch-icon
- `AudioPlayer.tsx`: add `speechText` and `speechLang` props; trigger speech synthesis on play/pause
- `ElderVoicesScreen.tsx`: supply speechText and speechLang to featured AudioPlayer
- `BrowseScreen.tsx`: supply speechText and speechLang to each card's AudioPlayer

### Remove
- Nothing removed

## Implementation Plan
1. Create `src/frontend/public/manifest.json` with standalone display, brand colors, icon references
2. Update `src/frontend/index.html` to link manifest and add PWA meta tags
3. Update `AudioPlayer.tsx` to accept and trigger Web Speech Synthesis
4. Update `ElderVoicesScreen.tsx` with Tamil speech text
5. Update `BrowseScreen.tsx` to map language → lang code and pass description as speech text
