# Generation issues log

One entry per defect, surprise or workaround from an image generation run that used these docs.

Entry format:

```text
## {{date}} · {{command}} · {{project}}/{{page}}
Prompt: {{path to the saved prompt or the prompt text}}
Attachments: Image 1 = …, Image 2 = …
Defect: {{what was wrong, in one sentence}}
Fix tried: {{the one correction line added}}
Result: {{fixed / not fixed / partial}}
Promote to guide: {{yes: which section / no}}
```

## 2026-11-02 · line-art · fridge-light-kingdom p01–p25

Defect: Hootie drawn as a stern heavy-browed owl with feather chevrons; Tabitha's flank and back stripes painted on her belly; cube penguins drawn as plain penguins. Refs and roles were correct.
Cause: (1) `density-standard.png` contained studio Hootie and Tabitha; the model copied them as the character design despite the "density only" role. (2) Six-view turnaround sheets give six small figures, three faceless; identity signal too weak. (3) Four marking facts in words scattered onto the wrong body parts.
Fix: density board with cast painted out; identity sheet = two large views cropped from Dawg's turnaround (`assets/<name>-identity.png`), turnaround attached only for rear/side/high cameras; markings line "exactly as Image n, nowhere else".
Result: fixed. 5-page test on gpt-6.1-sol medium (`wip/fridge-light-kingdom/test-fix/contact-sheet.png`): Hootie and Tabitha match their sheets on all 5 pages (round eyes, dot pupils, chest oval, forehead bars, flank stripes, belly oval, tail rings); cube penguin cube-bodied on p04. Left over: margin under 8% on p02 and p03 (door and slide touch the edge); p03 penguins too small to read as cubes; p04 one extra cheek stripe; density lighter than the board.
Promote to guide: done (LINE-ART.md §1, §3, §4; PROJECT.md cast table).

## 2026-11-02 · docs · all
Defect: Fridge Light Kingdom pages thinner than the studio's earlier books. Earlier prompts carried a scene inventory with exact counts (at most three background masses), a fill list of marker-sized shapes, one named colour moment per page, a camera device with a "why", a busy/quiet rhythm and a density board attached with the role "line weight, density and margin only"; the skill had none of these.
Fix tried: new `STORY.md` (`/story`) writes book.md with those fields per page and runs the book checks; `LINE-ART.md` §1, §2, §4, §5 take inventory, fill list, colour moment and the density board (`references/density-standard.png`); `COLOUR-FILL.md` names the colour moment; `SKILL.md` adds calibration on the first three pages. plan.md retired.
Result: untested on a full book.
Promote to guide: done.

## 2026-11-02 · docs · all
Defect: LINE-ART.md (then PROMPT-CORE.md) §3 and §5 examples used an owl and a cat (Hootie and Tabitha anatomy), so the guide was not project-agnostic.
Fix tried: examples neutralised to placeholders; the eye-fact and wing-as-hands facts moved into a generic pattern.
Result: fixed.
Promote to guide: done.

## 2026-11-02 · /line-art · test-hootie-and-tabitha/cosy-day p01
Prompt: test-hootie-and-tabitha/wip/cosy-day/line-art/p01-prompt-try1.txt
Attachments: Image 1 = assets/hootie-line.png, Image 2 = assets/tabitha-line.png
Defect: no 7–8% white margin (wall, counter, floor run to the page edge); scenery nobody asked for (cloud shapes in the window, counters and cabinets); Hootie's chest drawn with feather chevrons instead of his plain oval; Tabitha's belly oval missing.
Fix tried: one line after the cast block: "Hootie's chest shows one plain oval like his reference, with no feather marks. The scene is a vignette that ends inside the margin, so wall, counter and floor stop before the page edge." (p01-prompt-try2.txt)
Result: partial. Hootie and Tabitha chest ovals fixed. Margin not fixed. New defects: Hootie stands on the table; two extra chairs added.
Promote to guide: yes, LINE-ART §4/§5: a margin sentence alone does not stop a full-bleed room. A "setting" line should list every drawn object and say nothing else is drawn; or "stand left of the table" needs "on the floor".

## 2026-11-02 · /line-art · test-hootie-and-tabitha/cosy-day p01 (tool)
Defect: `codex exec` with a trailing prompt argument blocks on "Reading additional input from stdin..." unless stdin is redirected; first run also failed on a missing `timeout` binary (macOS).
Fix tried: add `</dev/null`.
Result: fixed.
Promote to guide: yes: SKILL.md or a runner note, if the skill documents the Codex call.

## 2026-11-02 · /line-art · test-hootie-and-tabitha/cosy-day p01 (attic) and p04 (bathroom)
Prompt: test-hootie-and-tabitha/wip/cosy-day/line-art/p01-prompt-try1.txt, p04-prompt-try1.txt
Attachments: p01 Image 1 = tabitha-line, Image 2 = wobbles-line; p04 Image 1 = gizmo-line, Image 2 = tabitha-line
Defect: foreground lines ran into the 7–8% margin (p01 hatch frame and ladder; p04 Gizmo's left arm and floor edge). Also p04 not isometric (perspective cutaway), p02 not clearly low angle.
Fix tried: one line after the cast block: "Everything, including {{objects}}, sits inside a clear white margin, with white space on every side."
Result: fixed on both.
Promote to guide: yes, LINE-ART §4 margin: name the edge-touching objects in the correction line (now carried by the new vignette sentence).

## 2026-11-02 · /colour-fill · test-hootie-and-tabitha/cosy-day p01 (rich-blend, soft-pastel, warm-handmade)
Prompt: test-hootie-and-tabitha/wip/cosy-day/colour/p01-<look>-prompt.txt
Attachments: Image 1 = line-art/p01.png, Image 2 = tabitha-colour.png, Image 3 = wobbles-colour.png
Defect: none against §8 (lines, eyes, outside-white all held). Notes: Tabitha's colour reference has forehead and tail stripes the line art lacks, so colour runs added stripe marks in one look and not the others; Wobbles took cheek blush from the reference in all three.
Fix tried: none needed.
Result: fixed (no defect).
Promote to guide: yes, COLOUR-FILL §4 constraint 9: say whether pattern marks present only in the colour reference are painted onto the page.

## 2026-11-02 · /line-art · test-hootie-and-tabitha/fridge-light-kingdom p01 p04 p06 p07 p08 p09 p12 p19 p21 p22 p23 p24 p25 (margin)
Prompt: wip/fridge-light-kingdom/line-art/pNN-prompt-try1.txt (try 1), pNN-prompt.txt (after correction)
Attachments: per page: identity line refs for the named characters; creatures carried by words only
Defect: the vignette sentence was in every prompt and still some pages ran lines to or within about 3% of the edge (kitchen counters, brick walls, tree rows, water ripples, foam).
Fix tried: one line after the cast block: "Everything, including {{objects}}, sits inside a clear white margin, with white space on every side."
Result: partial. p06, p07, p08, p12 fixed; p01, p04, p09, p20, p21, p22, p23, p25 improved but still within about 3% on one edge.
Promote to guide: yes, LINE-ART §4: the vignette sentence alone does not hold for full-room settings (kitchen, bricks, forests, water). Consider "keep every line at least 90 px inside the 1024 px canvas".

## 2026-11-02 · /line-art · fridge-light-kingdom p12 p21 p25 (identity)
Defect: p12 Wobbles drawn with open pupil eyes (ref: closed happy arcs). p21 Wobbles drawn as a fuzzy ball with antenna legs and no eyes. p25 Hootie and Tabitha drawn with closed laughing eyes (refs: dot eyes).
Fix tried: "{{character}}'s eyes exactly like its reference: {{eye fact}}." (p21 added body facts).
Result: fixed on all three.
Promote to guide: no; proven form works. But the eye fact for Wobbles ("closed happy arcs") is missing from PROJECT.md's identity facts: add it.

## 2026-11-02 · /line-art · fridge-light-kingdom p14 p18 p19 (creature drift)
Defect: Cube Penguins drew with solid black heads, flippers and feet (and a realistic penguin head), unlike the outline penguins on p03/p04. The three identity facts do not fix colour fill, silhouette detail or line weight.
Fix tried: "Cube Penguin's head, flippers and feet are outlined in black ink with white interiors, no solid black fill."
Result: fixed on all three.
Promote to guide: yes, LINE-ART §3 "Other creatures": creatures without a reference need a fourth, positive fact about how black is used ("outlined, white interior"), or a creature sheet in assets/.

## 2026-11-02 · /line-art · fridge-light-kingdom p24
Defect: setting line "a far lakeshore with the fridge light glowing above" drew a whole fridge appliance on the horizon.
Fix tried: "The glow in the far sky is one large round light with rays, not an appliance."
Result: fixed (drew a sun).
Promote to guide: yes, LINE-ART §2 Setting line: name drawn objects only by what they look like ("a large round light with rays"), never by what they are in the story.

## 2026-11-02 · /colour-fill · test-hootie-and-tabitha/fridge-light-kingdom p01 (rich-blend, soft-pastel, warm-handmade)
Prompt: wip/fridge-light-kingdom/colour/p01-<look>-prompt.txt
Attachments: Image 1 = line-art/p01.png, Image 2 = hootie-colour.png, Image 3 = tabitha-colour.png
Defect: Soft Pastel and Warm Handmade filled the back wall and floor to the page edge (line art is a full-bleed kitchen), so "outside the drawing stays pure white" did not hold; Rich Blend left it white. Warm Handmade painted a gingham curtain over the window because the recipe said "curtain" but Image 1 has no curtain. Soft Pastel recipe contained a stray phrase ("tea-towel-free surfaces") from the agent.
Fix tried: none (one correction call per page was kept for line art; colour logged only).
Result: not fixed.
Promote to guide: yes, COLOUR-FILL §7: the resolved recipe may name only objects visible in Image 1; and §4.1: say what happens to regions open at the page edge.
