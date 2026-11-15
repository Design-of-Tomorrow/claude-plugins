# Colour fill

Command: `/colour-fill`. Edit an existing line-art page: fill its closed shapes with colour, keep every line. Shared terms and rules: `SKILL.md`. Light sentence and lighting ids: `COMPOSITION.md` §3 and §5.

## 1. Reference roles

| Image | Role | Source |
|---|---|---|
| (text) | **Page block.** Supplies the colour moment and lighting id. | `{{project_root}}/wip/<book>/book.md` (written by `/story`) |
| Image 1 | **Source image.** Controls all geometry, lines, faces, objects, framing. Immutable. | `{{project_root}}/…/{{source_image}}` (the approved line-art page) |
| Images 2 onward, one per character on the page | **Colour reference.** Supplies that character's reference colours only. | path in the `PROJECT.md` cast table |
| Optional | **Appearance reference.** One tile from `references/`, texture and shadow edge only. Attach only when the written recipe is ambiguous. | `{{skill_root}}/references/` |

Never attach the side-by-side look sheet to a generation call. It is for choosing a look.

## 2. Rendering settings

One value each. A look sets defaults; a page may override any single setting.

| Setting | Values |
|---|---|
| `palette.hue_budget` | 1 · 2 · 3–4 · 5+ (black, white, grey not counted) |
| `palette.roles` | dominant · support · accent · neutral |
| `values` | light-middle · mixed · middle-dark; contrast moderate / high |
| `saturation` | vivid · mixed · muted |
| `fill` | flat · mixed · blended |
| `shade.edge` | hard · soft · mixed |
| `shade.colour` | same-family · hue-shifted · neutral grey |
| `medium_look` | smooth marker · marker + white marks · grainy blend |
| `coverage` | coloured scene · white reserve · flat colour field · selective grey |
| `outline` | keep dark (always, in this command) |

## 3. Treatment order

Applied conceptually in this order, inside existing regions only. None adds new shapes, motifs or scenery.

1. Pattern: stripes, spots, checks, small motifs on fabric, roofs, caps.
2. Shadow: contact / form / cast; edge and colour from the settings.
3. Light: directional colour field · local glow · reflected tint. Only from a light source already drawn.
4. Material: translucent · texture marks · white overdraw.
5. Finishing marks: white strokes · coloured rims · dots · sparkle. Sparse, on the hero and lights.

## 4. Constraints

These are the rules a recipe may not break.

1. **Source first.** Fill existing shapes. Keep every line, face, object and contour. Add nothing, remove nothing. Outside the drawing stays pure white; on a page whose scene touches the page edge there is no outside, so every region is painted. Same framing and dimensions.
2. **Two hues need a light.** `hue_budget: 2` requires a directional light with a reason already in the drawing (sunset, fire, lamp, portal). Shadows fall away from it.
3. **Glow needs a darker surround.** A glow core is brighter than what is next to it.
4. **Light and shadow agree.** Every shadow and rim points to the declared light source.
5. **Busy scenes get varied local colours.** Repeated objects (caps, islands, houses) take different hues.
6. **Sparkle and white marks are rationed.** Hero and lights only.
7. **Small hue budgets are strict.** A 1–2 hue page declares whether white highlights are allowed and adds no stray hue in shade or glow.
8. **Eyes stay as drawn.** Original black eye marks are untouched; no highlight strokes inside eyes.
9. **Character colours.** Characters keep their colour-reference colours unless the chosen look restricts the palette (Two-Ink Light, Electric Rose, Paper Pop) and that override is named in the prompt.
10. **Three looks, three differences.** When a page gets three versions, no two share both `fill` and palette.

## 5. Looks

Eight named presets. Pick by scene eligibility, then resolve into prose for the prompt (§7).

| Look | Recipe | Eligibility |
|---|---|---|
| **Rich Blend** | 5+ hues, vivid · blended fill · soft, hue-shifted shade · marker + white marks · sparse glossy shine | Regular. Glow only where the drawing has a light. Keep white shine off padded borders and bedding. |
| **Soft Pastel** | 5+ hues, muted/mixed · light-middle values · flat or mixed fill · one hard same-family contact-shadow step · light pattern | Regular. Keep adjacent pale regions distinct. |
| **Warm Handmade** | warm dominant (cream, ochre, coral, rust, pink) + 1–2 cool accents (sage, teal, dusty blue) · grainy blend · same-family soft shade · knit/quilt/gingham patterns · texture dabs on wood, stone, fabric | Regular. Faces and small creatures stay clean. Cosy interiors, bedtime, giants. |
| **Clear Storybook** | 5+ varied local hues, mixed saturation · flat fill · one hard same-family shadow step per shape · few white strokes on eyes-adjacent glossy objects | Regular. Full value range (unlike Soft Pastel); no blends or glow (unlike Rich Blend). |
| **Moonlit Magic** | cool dominant (navy, violet, teal), middle-dark, high contrast · mixed fill · hue-shifted shade · 2–4 small warm lights with short falloff · rims, star dots, sparkle on sky and lit objects | Night pages with light sources already drawn. Never used to turn a day scene into night or make ordinary objects glow. Exterior whitespace stays white. |
| **Two-Ink Light** | hue budget 2 · one hard directional light field · shadows away from the source · no sparkle · only the two tones plus black | Only with a scene light that explains the field (constraint 2). Declare the white-highlight policy. |
| **Paper Pop** | white architectural reserve · a few large flat saturated blocks (red, blue, yellow) · hard edges · no grain, no glow | Needs large existing regions to block. "Paper" adds no collage shapes. |
| **Electric Rose** | hue budget 1 (pink), near-black rose to pale pink · blended shade · the one existing lamp is the only light | Pages with one drawn light. Not for busy repeated-object pages (constraint 5). Characters turn pink; name the override. |

**Default trio** when a page gets three versions: Rich Blend + Soft Pastel + one by scene: night with drawn lights → Moonlit Magic; strong drawn directional light → Two-Ink Light; neither → Warm Handmade. Clear Storybook, Paper Pop and Electric Rose are extra looks.

## 6. Page schema

The agent resolves this before writing the prompt. Only the resolved prose goes to the model.

```yaml
page: "{{page_id}}"
source_image: "{{source_image}}"
colour_refs: ["{{character_colour_ref_1}}", "{{character_colour_ref_2}}"]
look: rich-blend
overrides: {}                      # any single §2 setting
colour_moment: "the jelly dome"       # from the page block; the hero of the palette
light_source: "bedside lamp, centre"   # must already be drawn; "none" otherwise
lighting: practical/glow           # COMPOSITION.md §3 id
palette_override: false            # true only for Two-Ink Light, Electric Rose, Paper Pop
page_fix: ""                       # one correction for this page only, ≤25 words
checks: [source-unchanged, eyes-unchanged, light-agrees, local-colours, no-added-content]
```

## 7. Prompt template

Base (70–100 words) + resolved recipe (40–90 words) + optional page fix (≤25 words). Base always comes first. The recipe names only objects visible in Image 1; a pattern or material for an object the page does not show invites the model to add it.

```text
Colour Image 1 exactly as drawn. Fill only its existing closed shapes. Keep every black line, face, shape, character, object and contour unchanged. Do not add or remove content. Image 1 controls all geometry and framing. Image 2 supplies {{character_1}}'s colours only, Image 3 {{character_2}}'s, and so on for each character on the page. Everything outside the drawing stays pure white. Preserve the framing and source dimensions. Crisp black lines on top. No text.

Look: {{look_name}}. {{resolved recipe in prose: palette and roles, values, fill, shade edge and colour, medium, treatment order items used}}. {{light sentence: the existing X is the only light source; shadows fall away from it}}. The {{colour moment}} carries the page's strongest colour; every other region is quieter than it. Characters keep their reference colours.

{{page_fix}}
```

Resolved recipe example (Clear Storybook): "Use varied local colours with subdued supporting hues and stronger saturation on the focal subject. Give each existing shape one uniform base and one hard same-family shadow step. Place a few white strokes inside existing glossy regions."

## 8. Output checks

After generation, compare against Image 1. Reject on: any line, object or contour changed, added or removed; eyes altered; scenery, sky or motifs added; light or shadow pointing away from the declared source; a 1–2 hue page carrying a stray hue; colour outside the drawing. The page-fix line never grows the base.

## 9. References

`references/manifest.yaml` lists each file, its look, and what to observe. Tiles are competitor studies: look at them to understand a treatment, describe the treatment in words, never name the competitor or copy a composition, character or motif.
