# Composition library

Terms follow ShotBench (the cinematography label set used to auto-grade shots). **Shot size** = how much of the subject fills the frame. **Shot framing** = how many subjects and how they are grouped. **Camera angle** = camera height relative to the subject. **Lens size** = perspective feel, written as words, never millimetres. **Composition** = where the visual weight sits. **Lighting type** = the light source. **Lighting condition** = the light's quality and direction. Camera movement is a video term and is not used for pages.

Line art uses the first five dimensions. Colour fill uses the two lighting dimensions. A page brief never mixes them in one line.

## 1 Vocabulary

| Dimension | Tokens | Meaning for a drawn page |
|---|---|---|
| Shot size | `Extreme Wide` · `Wide` · `Medium Wide` · `Medium` · `Medium Close Up` · `Close Up` · `Extreme Close Up` | Subject height as a share of page height: under ⅛ · ¼ to ½ · mid-legs up · waist up · chest up · face fills the page · one detail fills the page |
| Shot framing | `Single` · `2 shot` · `3 shot` · `Group shot` · `Over the shoulder` · `Establishing shot` · `Insert` | One subject · two · three · four or more · seen past a near character's back · the place is the subject · one object detail |
| Camera angle | `Eye level` · `Low angle` · `High angle` · `Overhead` · `Aerial` · `Dutch angle` | Camera at the character's eye height, not an adult's · looking up · looking down · straight down · high exterior view · tilted horizon |
| Lens size | `Wide` · `Medium` · `Long Lens` · `Ultra Wide / Fisheye` | Deep space, big foreground · natural · flattened depth, subject isolated · curved exaggeration |
| Composition | `Center` · `Symmetrical` · `Balanced` · `Left heavy` · `Right heavy` · `Short side` | Subject on the centre line · mirrored · weight split · weight on one side with space ahead of the look · subject looks at the near edge |
| Lighting type | `Daylight` · `Sunny` · `Overcast` · `Moonlight` · `Firelight` · `Practical light` · `Artificial light` · `Mixed light` | Source of the light. `Practical light` = a lamp, candle or screen drawn in the scene |
| Lighting condition | `Soft light` · `Hard light` · `Low contrast` · `High contrast` · `Side light` · `Backlight` · `Edge light` · `Top light` · `Underlight` · `Silhouette` | Quality (soft/hard), contrast, and direction |

Extra staging devices, used in the device column only: `frame-within-frame` (door, window, arch in the foreground), `rear view` (subjects seen from behind looking into the scene), `isometric` (30° grid, no perspective), `lead room` (space ahead of travel or look).

## 2 Named compositions

Each row is one composition id. The first eight match the approved camera categories (`eye-level/*`, `isometric/*`, `top-down`); the rest extend the pool.

| Id | Shot size | Framing | Angle | Lens | Composition | Device | Use when |
|---|---|---|---|---|---|---|---|
| `eye-level/standard` | Medium Wide | 2 shot or Group shot | Eye level | Medium | Balanced | — | Default page. Characters and their immediate surroundings fill the page. |
| `eye-level/rear-view` | Wide | 2 shot | Eye level | Medium | Center | rear view | Characters look at something in the scene; the thing they look at is the point. |
| `eye-level/through-frame` | Wide | Establishing shot | Eye level | Medium | Center | frame-within-frame | Arrival, peeking, discovery. The frame is drawn in the foreground. |
| `eye-level/closeup` | Close Up | Single | Eye level | Long Lens | Center | — | One face or one character fills the page and is cropped at the edges. Emotion beats. |
| `eye-level/wide` | Extreme Wide or Wide | Establishing shot | Eye level | Wide | Balanced | — | The setting is the subject; characters are small. |
| `isometric/standard` | Wide | Establishing shot | High angle | Medium | Symmetrical | isometric | A room, slab or diorama on a 30° grid, floating or cut away. |
| `isometric/birdseye` | Wide | Group shot or Establishing shot | High angle | Medium | Balanced | isometric | Camera high above, looking down at an angle over floors, tables and paths. |
| `top-down` | Wide | Establishing shot or Insert | Overhead | Medium | Symmetrical | — | Straight down, like a floor plan or a table laid out. |
| `two-shot/dialogue` | Medium | 2 shot | Eye level | Medium | Balanced | — | Two characters facing each other, both faces visible. |
| `ots` | Medium | Over the shoulder | Eye level | Long Lens | Left heavy or Right heavy | — | One character reacts to the other; the near back is partial and unlined inside. |
| `insert/prop` | Extreme Close Up | Insert | Overhead or Eye level | Medium | Center | — | One object or ingredient is the page. |
| `group/tableau` | Wide | Group shot | Eye level | Medium | Symmetrical | — | Four or more characters posed together, each fully visible. |
| `travel/lead-room` | Wide | Single or 2 shot | Eye level | Medium | Left heavy or Right heavy | lead room | Journey pages. Subject at the trailing edge, open space ahead. Forward = left to right. |
| `hero/low-angle` | Medium Wide | Single | Low angle | Wide | Center | — | Brave, big, proud moments. |
| `tension/short-side` | Medium | Single | Eye level | Medium | Short side | — | Trapped or worried beats. Rare. |

**Experimental** rows. Not in any project's default pool; a brief names them by id to test whether the model obeys them. 

| Id | Shot size | Framing | Angle | Lens | Composition | Device | Use when |
|---|---|---|---|---|---|---|---|
| `experimental/dutch` | Medium Wide | Single or 2 shot | Dutch angle | Medium | Left heavy or Right heavy | — | Tilted horizon for comic wobble, dizziness, a tipping moment. State the tilt: "horizon tilted about 15 degrees". |
| `experimental/fisheye` | Wide | Single or 2 shot | Eye level | Ultra Wide / Fisheye | Center | — | Curved, bulging exaggeration; subject close to the lens looks huge, edges bend. Peeking through a peephole or bubble. |
| `experimental/aerial` | Extreme Wide | Establishing shot | Aerial | Wide | Balanced | — | High exterior view of a town, forest or island from the sky; characters tiny or absent. |

## 3 Lighting setups

Lighting is chosen in the colour-fill step and needs a light source already drawn on the page (colour-fill constraint 2). Each setup is one lighting type plus one or two conditions.

| Id | Type | Condition | Use when |
|---|---|---|---|
| `day/soft` | Daylight | Soft light, Low contrast | Default. No drawn light source needed. |
| `sunny/side` | Sunny | Hard light, Side light | Sun or window drawn on one side; shadows fall away from it. |
| `overcast/flat` | Overcast | Soft light, Low contrast | Rain, snow, quiet weather pages. |
| `moonlight/edge` | Moonlight | High contrast, Edge light | Night exteriors with a drawn moon. |
| `firelight/warm` | Firelight | Soft light, Side light | Campfire, hearth, candles drawn in the scene. |
| `practical/glow` | Practical light | Low contrast, Backlight or Side light | One drawn lamp, screen or lantern is the only light. |
| `spooky/under` | Practical light or Firelight | Underlight, High contrast | Brief "spooky but safe" beats only. Never a default. |

`Silhouette` is used only when the brief asks for it.

## 4 How a brief picks a composition

1. **Id only** (`composition: eye-level/closeup`): use exactly that row.
2. **Primary only** (`composition: eye-level`): pick one id with that prefix at random, `standard` included.
3. **Include** (`composition: eye-level, include: [closeup, wide]`): pick at random from the listed ids.
4. **Exclude** (`composition: eye-level, exclude: [rear-view]`): pick at random from the rest.
5. **Lighting** (`lighting: moonlight/edge`): same rules, lighting ids only, colour-fill step only.
6. Record the ids picked in the page's prompt record, for example `eye-level/wide` and `day/soft`.

## 5 Prompt phrasing

**Line art camera line** (goes in the task + scene step of the line-art prompt, under 25 words):

```
Camera: {{shot size}}, {{framing}}, {{angle}}, {{lens}} lens feel, {{composition}}{{, device}}.
```

Example shape: `Camera: wide, establishing shot, eye level, wide lens feel, balanced, seen through a doorway drawn in the foreground.`

Size is also stated as a page fraction when the model has missed it before: "the characters stand about one third of the page height".

**Colour-fill light sentence** (replaces `{{light sentence}}` in the colour-fill template):

```
The existing {{drawn source}} is the only light source: {{type}}, {{condition}}; shadows fall away from it.
```

Example shape: `The existing bedside lamp is the only light source: practical light, low contrast, side light; shadows fall away from it.`

## 6 Output checks

After generation, check the page against its ids. Reject on: subject height outside the shot-size fraction; wrong subject count for the framing; camera height not matching the angle; weight on the wrong side for the composition; a device missing (no foreground frame, characters not seen from behind). Fix with one targeted camera line, never by rewriting the prompt.

## 7 Sources

- ShotBench project page: https://vchitect.github.io/ShotBench-project/ · paper: https://arxiv.org/abs/2506.21356 · code: https://github.com/Vchitect/ShotBench · dataset: https://huggingface.co/datasets/Vchitect/ShotBench (label vocabulary above is the resolved answer set of `test.tsv`)
- ShotVL (labels shots in images, usable for auto-checking section 6): https://huggingface.co/collections/Vchitect/shot-vl-685e541cdc5583148b36c12f
- Approved camera categories: `/Users/hellodesign/Documents/Project/SillyTaters/.agent/sessions/2026-10-29-business-wip/pocket-world/CAMERA-SYSTEM.md`
- Cinematography research: `/Users/hellodesign/Documents/Design of Tomorrow/art system /research/round2/C-art-director-cinematography.md`
- Saved for later: Wan prompt guide https://www.alibabacloud.com/help/en/model-studio/text-to-video-prompt · StudioBinder camera shots https://www.studiobinder.com/blog/ultimate-guide-to-camera-shots/
