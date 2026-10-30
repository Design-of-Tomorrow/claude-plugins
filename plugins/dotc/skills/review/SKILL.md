---
name: review
description: Reviews the design of a public web page with your Design of Tomorrow plan. Run /dotc:review https://site.au [focus]
argument-hint: "<url> [focus]"
disable-model-invocation: true
---

# Design review

Review the page the person gives you. Use only the `dot` MCP server tools. Do not review the page yourself.

## Steps

1. Take the URL from the arguments. Anything after it is the focus (optional, up to 500 characters). If there is no URL, ask for one and stop.
2. Call `mcp__plugin_dotc_dot__start_review` with `url` and, if given, `focus`. It returns `review_id` and `dashboard`.
3. If the tool is missing or fails because of the token, tell the person their token is missing or wrong. They can create one at https://app.designoftomorrow.au, then in Claude Code run `/plugin configure dotc@design-of-tomorrow`, paste the new token, and restart Claude Code. Stop.
4. If the result has `isError`, say its text as written and stop.
5. Poll `mcp__plugin_dotc_dot__get_review` with `review_id`. Between polls run `sleep 10` with Bash. Poll up to 24 times. On each poll, tell the person the stage only when it changes:
   - `queued`: "Queued…"
   - `loading`: "Loading page…"
   - `measuring`: "Measuring…"
   - `lighthouse`: "Lighthouse…"
   - `critique`: "Critique…"
   - `saving`: "Saving…"
6. If a poll has `isError`, say its text as written and stop.
7. `status` is `done`: show the top 3 findings. For each give the title, the evidence, and the fix. Then give the three scores (performance, accessibility, SEO) and the `dashboard` link. If there are no findings, say "No findings."
8. `status` is `failed`: say `error` as written, plus the `dashboard` link. Stop.
9. Still not finished after 24 polls: say the review is still running and give the `dashboard` link. Stop.

## Next release

The design-system questions (create a design system from the review) arrive in the next release. Do not ask them.

Use short sentences. Write in Australian English.
