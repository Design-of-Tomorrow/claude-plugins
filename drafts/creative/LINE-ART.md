# Line art

Command: `/line-art`. Create one black-line colouring page from a page brief and character reference images. Shared terms and rules: `SKILL.md`. Camera line: `COMPOSITION.md` §5.

## 1. Inputs and reference roles

| Input | Source |
|---|---|
| Page block: beat, camera id + why, cast, verb, prop, inventory, fill list, colour moment | `{{project_root}}/wip/<book>/book.md` (written by `/story`) |
| Creature body plans | `## Creatures` in the same book.md |
| Theme, tone, density, costumes | `{{project_root}}/PROJECT.md` |
| Identity sheet, one per character: one or two large views, figure at least half the canvas tall | `identity` path in the `PROJECT.md` cast table |
| Turnaround sheet, one per character, attached only when the camera id is rear, side, top-down or high angle | `turnaround` path in the `PROJECT.md` cast table |
| Project line standard, optional override of §4 | `{{project_root}}/assets/LINE-ART.md` when `PROJECT.md` names one; otherwise §4 applies |
| Creature and prop sheets the brief lists | `{{project_root}}/assets/…` |
| Density board, always the last image; a page with no cast characters in it | `{{skill_root}}/references/density-standard.png` |

Role statement: "Image 1 defines {{character_1}}'s identity and proportions. Image 2 defines {{character_2}}'s. The last image defines line weight, density and margin only; nothing in it is copied." A turnaround gets "Image {{n}} shows {{character}} from the side, behind and above, for this camera only." Words add only who is present, what they do, and the one eye fact per character.

Why the sheets are split: a six-view turnaround gives the model six small figures, half of them faceless, and it invents its own character; one large front and three-quarter view holds identity. A density board that contains cast characters gets copied as the character design whatever its stated role, so the board is a page with the cast painted out.

## 2. Prompt order

1. **Task + scene.** The beat sentence from the page block. Then the camera line from its composition id, with the block's "why" as the device clause.
2. **Reference roles + cast.** One identity statement per character (§3). One line per creature, copied from book.md `## Creatures` with the page's count.
3. **Action + object contact.** Each prop with its owner and the body part touching it: "{{character_1}}'s {{limb}} nearest {{character_2}} holds the {{prop}} handle."
4. **Setting.** The page block's inventory, verbatim: "Setting: exactly {{n}} background masses: {{mass}}, {{mass}}, {{mass}}. {{counts}}. Nothing else is drawn." Each thing is named by how it looks, not by its story role ("one round ceiling lamp", never "the fridge light", which draws a fridge). The model adds furniture, clouds and scenery to any gap, so the list is the fence.
5. **Fill + colour moment.** The block's fill list as one sentence: "Many medium fillable shapes, each big enough for a marker: {{shape}}, {{shape}}, {{shape}}." Then the colour moment: "The {{colour moment}} is one large open shape with no detail inside."
6. **Composition + costumes.** Placement left/right with ground contact ("{{character_1}} stands on the floor, left of the table"), faces visible, the vignette sentence (§4). Costumes as items only: "{{character_1}}: {{item}} and {{item}}."
7. **Rendering + page constraints.** Density, page type, style block (§4), the density-board role.
Target: about 350 words for a standard page, under 150 for a low-detail page.

## 3. Identity, counts and contact

**Identity statement pattern** (one per character, about 15 words):

> {{Character}} exactly as in Image {{n}}. {{One eye fact as the reference draws it}}. {{The one body fact a static picture cannot show}}. {{Counts the action depends on}}. Markings exactly as Image {{n}}, nowhere else.

Example shape: "One {{character_1}} matching Image 1: {{its two {{limbs}} serve as its hands}}; {{each eye has one dot pupil}}. One {{character_2}} matching Image 2: {{two small solid black dot eyes}}, {{two long arms}}, {{one striped tail}}." Each bracketed fact comes from that character's reference sheet; include a fact only when the reference alone has lost it in past runs.

Rules:
- State anatomy once, positively, in the character's own terms. Legs, ears, belly: visible in the reference, so omitted. Markings are never listed in words (a list of stripes gets painted onto the wrong body part); the sheet shows them and the prompt says "markings exactly as Image {{n}}, nowhere else". Colour words never enter a line-art prompt; a `PROJECT.md` fact like "purple headband" becomes "headband".
- Counts need owners. "Two wings" belongs to a named character, never to the scene.
- Anatomical count is not visible count. If both arms must show, say it in the contact line ("both paws visible, one on the cushion").
- No pronouns when two characters share a scene. "{{character_2}} holds the cup."
- Each named character appears once: "Cast: one {{character_1}} and one {{character_2}}."

**Other creatures:** body plan first, face as one word, parts the picture needs, then where black goes ("eyes as two black dots, everything else white outline"); without that line the model fills small creatures solid black. "Crab guard: round shell, a friendly face, two big claws, six small legs." "Paper cranes (3): plain folded paper cranes, no face." Say "face", never list eyes, nose, mouth. For a limbless creature say what it is ("a floating ink splat with a face"), never "0 arms".

## 4. Rendering and page standard

Style block, used verbatim unless the project's optional line standard (§1) overrides it:

> Pure black ink contours on a pure white background. Bold, smooth, closed outlines with white interiors. Solid black areas only where the identity references require them. No grey shading, hatching or text.

Page standard (default; a project file may override any value):

| Item | Value |
|---|---|
| Ratio | 1:1. Prompt values assume a 1024 px square canvas. |
| Final export | 2550 × 2550 px at 300 DPI (8.5 in). The model returns its own size (Codex image_gen: 1254 px); the upscale happens once, after approval, outside the generation loop. |
| Stroke | about 12 px at the 1024 px canvas. |
| Margin | clear white margin of 7–8% on every side. Prompt sentence: "The whole scene is a vignette on white: floor, walls and sky end before the page edge, leaving a clear white margin of about 8% on every side." A bare "margin" word does not stop a full-bleed room. |
| Density | set per series by the brief, e.g. "about 45–70 closed regions"; the fill list (§2 step 5) is what produces it, the number only checks it. |
| Density board | `references/density-standard.png`, attached last on every call: "The last image defines line weight, density and margin only." It contains no cast characters. |

Each goes into the prompt as one sentence, with the page type.

## 5. Template

```text
Create one square black-line page: {{beat sentence}}. {{camera line, with the why as its device clause}}

References: Image 1 defines {{character_1}}'s identity and proportions. Image 2 defines {{character_2}}'s. Image {{last}} defines line weight, density and margin only; nothing in it is copied.

Cast: one {{character_1}} and one {{character_2}}, matching their references. {{identity statement 1}} {{identity statement 2}} {{creature lines}}

Setting: exactly {{n}} background masses: {{masses}}. {{counts}}. Nothing else is drawn. Many medium fillable shapes, each big enough for a marker: {{fill list}}. The {{colour moment}} is one large open shape with no detail inside.

{{placement with ground contact}}. {{prop: owner, body part, contact}}. {{second prop}}. {{"Both faces clearly visible." only when the composition id shows faces; dropped for rear-view, ots and top-down}}

Costumes: {{character_1}}: {{items}}. {{character_2}}: {{items}}.

{{density sentence}}. The whole scene is a vignette on white: floor, walls and sky end before the page edge, leaving a clear white margin of about 8% on every side. Pure black ink contours on a pure white background. Bold, smooth, closed outlines with white interiors, about 12 px at a 1024 px square canvas. Solid black areas only where the identity references require them. No grey shading, hatching or text.
```

## 6. Output checks

Inspect against the references and page block: character count; eyes as the reference draws them; wing/arm/tail counts; every prop with its owner and contact; every inventory mass and count present, nothing added; fill shapes present and marker-sized; the colour moment open; stroke, density and margin like the density board; camera as the composition id says (`COMPOSITION.md` §6).

Correction lines go after the cast block, one line per defect. Proven form: "{{character}}'s eyes exactly like its reference: {{eye fact}}." No trailing list of wrong eye types.
