# Room-Sized Focus

A cinematic focus space for a very large television. Pick a place, pick a session with a few clicks of the remote, and work with one clear task and a quiet countdown while the room breathes around you.

**Try it now:** https://claude.ai/artifact/1mKSPHetGQpmuKsucdjA1K (add `#demo` to the link to run sessions at one second per minute).

## What's inside

| Path | What it is |
| --- | --- |
| `web/app.html` | The whole app: scenes, screens, remote navigation, sound, timer. One file, no build step. |
| `scripts/build.mjs` | Wraps `web/app.html` into a standalone `web/dist/index.html` and copies it into the Android TV project. |
| `android-tv/` | A small Kotlin wrapper that runs the app full screen on Google TV / Android TV, with Back and keep-screen-on wired to the remote. |
| `.github/workflows/android-tv.yml` | Builds a debug APK on every push and pull request. Download it from the run's artifacts. |

## The experience

- **Four places**, each drawn live on canvas with its own light, palette and slow motion: the *Reading Room* (rain running down a library window), the *Night Train* (hills and passing poles under a moon), the *Dusk Field* (layered hills, mist and drifting light), and the *Fire Pit* (a flickering campfire, rising embers and pines under the stars).
- **Three sessions**: Sprint (25 min, 5 min break), Deep work (50 min, 10 min break), Quick reset (10 min, 3 min break).
- **Focus screen**: the task, a 330px countdown whose digits cross-fade instead of ticking, and only Pause/Resume, End, Sound and Scene. Controls dim after a few quiet seconds and wake on any key.
- **Transitions**: scenes cross-fade with a depth and blur shift and a wash of the new scene's light; sessions start with the room settling into focus; a finished session warms the scene before the break screen.
- **Progress without pressure**: each completed session changes its place for good. More windows light up across the street, more stars come out over the train, more flowers open in the dusk field, more lanterns glow along the fire pit's tree line. No streaks, no scores.
- **Breaks**: an eye-rest or stretch prompt with a slow breathing guide, then clear choices to continue or finish.
- **Sound**: Silence, Rain on glass, Night carriage, Evening wind, Fireside. All generated with Web Audio (no audio files), with its own volume. The timer and interface never make a sound; the end-of-session chime can be turned off.
- **Task entry without typing**: eight quick picks, an on-screen keyboard driven by the D-pad, and (in the Claude Artifact) a phone companion: scan the QR code, type on the phone, and the task appears on the TV.

## Remote controls

| Remote | Keyboard | Action |
| --- | --- | --- |
| D-pad | Arrow keys | Move focus |
| Select / OK | Enter | Choose |
| Back | Esc / Backspace | Close a panel; on the focus screen, ask to end the session |
| Play/Pause | Media key | Pause or resume |
| Fast-forward | `]` | Jump to the last few seconds of a session (for testing) |

## Run it on Google TV

**Easiest:** install the [Downloader](https://www.aftvnews.com/downloader/) app on the TV, allow it to install unknown apps (Settings → Apps → Security & restrictions → Unknown sources), and enter:

```
https://github.com/drny85/focus/releases/latest/download/focus.apk
```

Every push rebuilds the APK and publishes it at that same link, and new builds install over old ones.

**Or with adb:**

1. Download the APK from the latest **Android TV APK** workflow run (or build it yourself with `node scripts/build.mjs && gradle -p android-tv assembleDebug`, Gradle 8.7+, JDK 17, Android SDK 34).
2. On the TV, turn on developer options (Settings → System → About → click *Android TV OS build* seven times) and enable USB/network debugging.
3. `adb connect <tv-ip>` then `adb install app-debug.apk`. The app appears in Apps with its own banner.

The phone companion uses the Claude Artifact's per-user storage, so it works in the Artifact link but not yet inside the APK. Bringing it to the APK needs a small relay (for example a Firebase document keyed by a pairing code); the TV side is already written to listen for remote task updates.

## Design notes

- Laid out on a fixed 1920×1080 stage that scales to the screen, inside TV-safe margins of 128px × 84px.
- Smallest text is 22px on that stage; body and controls are 26–34px; the countdown is 330px.
- Type: Cormorant Garamond for the task, headlines and countdown; Jost for labels and controls.
- Scenes render at 960×540 and 30 fps, which keeps them soft and easy on TV hardware. `prefers-reduced-motion` removes parallax and slows ambient motion.
