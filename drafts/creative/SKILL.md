---
name: creative
description: Plan a colouring book, draw its line art and colour-fill approved pages from a project brief and reference images. Commands /story, /line-art and /colour-fill.
---

# dotc:creative

| Command | Does | Guide |
|---|---|---|
| `/story` | Writes the book file: premise, creatures, one block per page with beat, camera, inventory, fill list and colour moment. Runs once, before any image. | `STORY.md` |
| `/line-art` | Creates one black-line page from a brief and identity references. Text-to-image. | `LINE-ART.md` |
| `/colour-fill` | Fills an approved line-art page with colour. Image edit; lines immutable. | `COLOUR-FILL.md` |

`/story` picks each page's composition and lighting ids from `COMPOSITION.md`; `/line-art` turns the id into the camera line, `/colour-fill` into the light sentence. Nothing about colour goes into a line-art prompt; nothing about drawing goes into a colour-fill prompt.

## Terms

**Image prompt** = the text sent with one image call. **Reference image** = an attached picture with one declared role, stated in the prompt ("Image 1 defines…"). **Scene** = the one visible moment. **Cast** = who appears, how many. **Constraints** = the "negative prompt", written as positive statements inside the prompt; the image model has no separate negative-prompt field.

## Rules shared by both commands

1. **Every attachment has one role**, named in the prompt. References carry identity and colour; words carry only what a picture cannot show.
2. **Constraints are written as the wanted result.** "Cast: one {{character_1}} and one {{character_2}}" replaces "no duplicates". A short prohibition only where it draws the task boundary ("No text."). No catalogues of unwanted things: each named thing is a thing the model can draw.
3. **Check, then correct once.** Inspect the output against the brief and references (each guide lists its checks). Each defect gets one targeted correction line on that page's next call (three defects, three lines), never a rewrite. One correction call per page; what still fails after it is logged and left. Page fixes stay with the page; a fix that repeats across pages is promoted into its guide.
4. **Log every defect** in `GENERATION-LOG.md`, entry format inside.
5. **Image model is the agent's pick**; the operator overrides in the request. Known generators and their calls are in "Image tools" below.

## Book plan, before any image

`/story` writes `{{project_root}}/wip/<book>/book.md` and runs its checks (`STORY.md` §4–5). `/line-art` and `/colour-fill` read their page block from it; neither starts until book.md is final.

## Image tools

| Generator | Call |
|---|---|
| Codex `image_gen` | `codex exec -C {{project_root}} -s workspace-write -c project_doc_max_bytes=0 -i {{ref_1}} -i {{ref_2}} - < {{prompt file}}` |

Codex notes: the prompt goes on stdin (the trailing `-` and `< file`); a prompt passed as an argument hangs. `-c project_doc_max_bytes=0` stops Codex loading any `AGENTS.md`, so the prompt file is self-contained and ends with one line: "Use the image_gen tool once and save the result as {{output path}}." Save each prompt file next to its output as `{{page}}-prompt.txt`. Codex never reads a guide; the agent does. Pages are independent: run several calls at once.

**Calibration.** The first three pages of a book run twice each (a second generator, or the same one at a different effort or model setting), side by side on one contact sheet. Pick the setup whose pages best match the density board and references; the rest of the book runs on that one setup.

## Where things live

| What | Path |
|---|---|
| Definitions, templates, appearance tiles, density board | this folder; tiles and `density-standard.png` in `references/` with `references/manifest.yaml` |
| Project file: series rules, premise, world, creatures, page count, camera mode, cast with `main` marks, identity and turnaround sheet paths, density | `{{project_root}}/PROJECT.md` |
| Book file (written by `/story`) | `{{project_root}}/wip/<book>/book.md` |
| Identity and colour references, project line standard override | `{{project_root}}/assets/…` |
| Generated output | `{{project_root}}/wip/<book>/line-art/` and `{{project_root}}/wip/<book>/colour/` |

`{{project_root}}` = `<facilitator>/<project>/`, the folder holding `PROJECT.md`. `{{skill_root}}` = this folder. `<book>` = the book slug from `PROJECT.md`. Tools never write into `assets/` or `approved/`.
