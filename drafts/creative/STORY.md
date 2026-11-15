# Story

Command: `/story`. Turn a project brief into one book file that every page is drawn from. Runs once per book, before any image. Shared terms and rules: `SKILL.md`. Composition and lighting ids: `COMPOSITION.md` §2 and §3.

## 1. Inputs and output

| Input | Source |
|---|---|
| Series rules, premise, world, cast with `main` marks, creature list, page count, camera mode, lighting default | `{{project_root}}/PROJECT.md` |
| Composition pool and lighting ids | `COMPOSITION.md` |
| Camera mode | `camera:` in the request or `PROJECT.md`: `camera: eye-level/wide` (one id, every page) · `camera: [eye-level/wide, top-down, ots]` (pick from this set only) · `camera: rich` (pick from every non-experimental id in `COMPOSITION.md` §2; each of the three primaries `eye-level`, `isometric`, `top-down` appears at least once; `experimental/*` only when named). Missing → ask: "One angle, a set, or rich random?" |

Output: `{{project_root}}/wip/<book>/book.md`, written in full before page 1 is drawn. Page count missing from the project file and the request → ask.

## 2. book.md layout

```text
# {{Title}}
Premise: {{one sentence: who, the way in, the world}}.
Blurb: {{two sentences for the back cover}}.

## Creatures
{{Name}} ({{count in the book}}): {{body plan}}; {{face as one word}}; {{parts the picture needs}}; black only on {{where}}, everything else white outline. Size: {{knee-high / waist-high / chest-high}} to {{main character}}.

## Pages
### p{{nn}} · {{setting}}
Beat: {{one sentence, something mid-motion, told by the picture alone}}.
Camera: {{composition id}} · why: {{what this angle shows that eye level would hide}}.
Lighting: {{lighting id}}.
Cast: {{named characters}} · {{creature}} ×{{n}}.
Verb: {{the one action verb}}. Prop: {{the page's one unique prop}}, held by {{character}}.
Inventory: exactly {{1–3}} background masses: {{mass}}, {{mass}}, {{mass}}. Counts: {{n}} {{thing}}, {{n}} {{thing}}.
Fill: {{medium fillable shapes, each big enough for a marker}}: {{shape}}, {{shape}}, {{shape}}.
Colour moment: {{one large open shape kept free of detail}}.
Rhythm: {{busy / quiet}}.
```

Each field is one line. A creature line in `## Creatures` is the only place a creature's body plan is written; page blocks name creatures and counts only.

## 3. Field rules

- **Beat.** No words on the page, so the beat is visible: what is happening, what is mid-motion, where in the world. Never two characters standing side by side on a blank floor.
- **Camera + why.** The id comes from the camera mode. The "why" is the staging device in one clause ("cutaway shows the three shelves at once", "seen through the fridge-door gap as they arrive", "worm's-eye makes the broccoli trees tower"). A why that eye level could satisfy → pick again. Framing sets the subject count, creatures included (`Single` = 1, `2 shot` = 2, `3 shot` = 3, `Establishing` = any, `Group shot` = 4+).
- **Inventory.** At most three background masses, named by how they look, never by story role ("one round ceiling lamp", never "the great fridge light"). Counts for every repeated thing. The line-art prompt draws exactly this and nothing else, so anything the beat needs is listed here.
- **Fill.** Three to six kinds of medium shape a child can colour with a marker: scallops, planks, bubbles, spots, cobbles, tiles. These make the page dense; the density number in `PROJECT.md` only checks the result.
- **Colour moment.** One large open shape per page (a dome, a lake, a sky patch, a cape). Line art keeps it free of detail; colour fill paints it as the hero.
- **Rhythm.** `busy` = three masses, full fill list, four or more subjects. `quiet` = one mass, short fill list, one or two subjects, big colour moment.
- **Prop.** Every page has one prop no other page has. A story object that recurs (a boat, a kite) is scenery in the inventory, never the page's prop.
- **Lighting.** The `PROJECT.md` default; another id only when that page's inventory draws the light (lamp, fire, moon).

## 4. Book checks

Every statement must be TRUE for the whole book. One FALSE → change that page, check again.

1. Each verb appears once. "Folding clothes" and "folding sheets" are both *folding* → FALSE.
2. If a setting appears on two pages, the second has a different composition id.
3. No composition id on two pages in a row (skipped when `camera:` is one id).
4. Each page has one prop no other page has.
5. Main characters may appear on every page. Every other character in the project file appears at least once and never on two pages in a row.
6. At most two creature types on a page; a creature's size to the main character is the same on every page.
7. No two `busy` pages in a row. Pages 1, 2 and the last page are `quiet`.
8. One device page (`through-frame`, `isometric/*`, `top-down`, `rear-view` or `ots`) in every run of five pages.
9. Every inventory has one to three masses, every count is a number, every fill list has three or more kinds, every colour moment is one shape.
10. No lettering, signs or numbers anywhere in an inventory.
11. The last page shows one thing that came home from the world.

## 5. Plan review

After the checks, read the book once as a reader: does each beat follow from the one before, is the small problem set up before its fix, does the big fun moment land on the pages the series shape gives it (`PROJECT.md`)? Fix in book.md, then start `/line-art` at page 1. Pages are independent once book.md is final.
