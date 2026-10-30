---
name: review
description: Reviews the design of a public web page with your Design of Tomorrow plan. Run /dotc:review https://site.au
argument-hint: "<url>"
disable-model-invocation: true
---

# Design review

The review tools are not in this release yet. For now this command checks your account.

## Steps

1. Call the `account_status` tool from the `dot` MCP server (`mcp__plugin_dotc_dot__account_status`).
2. If it works, tell the person their plan, when it ends, and how many reviews they have left. If `message` is not null, say it as written.
3. If the tool is missing or fails, tell the person their token is missing or wrong. They can create one at https://app.designoftomorrow.au, then in Claude Code run `/plugin configure dotc@design-of-tomorrow`, paste the new token, and restart Claude Code.
4. Say that page reviews for the URL they gave arrive in the next release. Do not try to review the page yourself.

## Next release

The next release fills in these steps: start the review, wait for it, read the findings, and show them.

- Start a review for the URL.
- Check on it until it finishes.
- Show the findings.

Use short sentences. Write in Australian English.
