Web app goals:
1. Live multicolour spectrogram (waterfall) from microphone

2. Time scrolls as it fills the screen (newest at the right)

3. Frequency zooming: control bottom and top frequency (and later more direct touch controls)

4. Keep phone usability as a first-class target (touch interaction, portrait/landscape)

5. Optional musical-note overlay lines

6. Optional second plot: spectrum (dB vs Hz)

7. Optional log frequency scale

8. PWA/offline capability (eventually)


What is implemented now
Spectrogram core
Live microphone capture via WebAudio + FFT.
Waterfall spectrogram rendering in a multicolour map.
Newest data drawn at the right; scrolls over time.
Spectra-history design: previous frames are stored so changing frequency scale/range can redraw the full image consistently.

Frequency controls
Bottom Hz and Top Hz controls.
Touch drag on the left Hz axis (“grab-a-frequency” behaviour) to adjust bottom/top Hz.
Linear and log frequency scaling toggle.
Axis tick labels (no grid).

dB controls
dB bottom and dB top controls (replacing the earlier gain/ceiling/range model).
Auto dB mode that updates bottom/top based on the current signal window (and exposes the chosen values through the sliders).

Spectrum plot
Separate spectrum plot showing the latest frame (dB vs Hz).
Shares linear/log and Hz range with the spectrogram.

Musical notes overlay
Notes overlay option: rainbow-coloured horizontal note lines with labels.
Works as an overlay layer without blocking the spectrogram (overlay transparency fixed).
Debug note: needs a minimum frequency limit (see future work) to avoid excessive rendering at very low frequencies.

Phone usability improvements
Touch dragging no longer scrolls the page (via touch-action:none and event handling).
Spectrogram is scaled large in CSS for phones (not “tiny”).
Debug overlay tint option to make it obvious what layer is on top / what is obscuring what.





# Items noted for future work
Musical notes stability
✅ Clamp note rendering to ≥ 27.5 Hz (A0) to avoid “infinite notes” behaviour as frequency approaches 0 Hz.
✅Also ensure log scale never attempts log(0); minimum already enforced for log, but note rendering should independently clamp.

dB interaction parity with Hz interaction
Add draggable dB axis control on the spectrum plot:
Drag near top adjusts dB top
Drag near bottom adjusts dB bottom
Same “grab-a-value” model as Hz axis

✅ Show current dB limits on the spectrum plot for clarity.

Offline/PWA validation
Test behaviour offline after first load.
Decide whether to reintroduce a service worker once UI stabilizes.
Verify microphone permissions and offline mode across Android Chrome and iOS Safari/PWA constraints.

Fullscreen
✅ Add a fullscreen toggle (using the Fullscreen API) for the spectrogram (and possibly “spectrogram only” mode).

UI cleanup / production mode
Move “debug” sliders into a collapsible menu or settings panel.
Keep only high-level controls visible by default (Hz range, dB range, linear/log, notes toggle, start/stop).
✅ Increase axis panel width (roughly 2×) for readability and easier touch targeting.
Fix axis/note label readability: current text is squeezed; address via wider axis strip and/or larger font with layout that doesn’t compress.

Desktop layout refinement
✅ Spectrum plot does not currently fill available width in desktop mode; revise responsive layout so spectrum can expand or reflow more naturally.

Note overlay enhancements
✅ Render musical notes on the spectrum plot as well (same colours, labels C/D/E…).
Keep note colour consistent across spectrogram + spectrum…. Actually they were there just too small to see…

Stop behavior
✅ “Stop” should stop acquisition but not clear existing spectrogram/spectrum visuals.

Cursor/inspection interaction
When the user touches/presses on the spectrogram:
Spectrum plot should display the spectrum for the corresponding time column (frame) under the finger.
On release, spectrum returns to the latest frame.

This implies mapping x-position → history index, and either storing per-column spectra (already done) or selecting the nearest stored frame.

These notes capture the intended direction: transition from a debug-friendly build to a phone-first tool with direct manipulation (Hz and dB) and inspection workflows (touch-to-scrub spectra), with robust note overlays and optional offline/fullscreen packaging.

The axis drag area appears to only start from the top 25% of the screen (same issue on the bottom 25%). It should really split in the middle so there is no dead touch zone there.

