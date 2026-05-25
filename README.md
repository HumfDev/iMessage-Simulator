# iMessage Animation

Write a conversation, play it as an animation on your **skeleton iPhone PNG**, and export an MP4.

The skeleton image is never modified — we only **add** message bubbles, typing dots, and typewriter text inside the existing input field.

## Use it

```bash
npm install
npm run dev
```

Open http://localhost:5173

1. Add **Their line** / **My line** text in order.
2. **Play** — typing indicator and typewriter in the skeleton UI.
3. **Export Video** — downloads `imessage-animation.mp4` (1920×1080 green screen).

## Export (CLI)

```bash
npm run props -- ~/Downloads/props.json
npm run render
```

## Layout tuning

If bubbles or typewriter text are slightly misaligned, edit percentages in `src/lib/skeletonLayout.ts`.
