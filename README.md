# Design of Tomorrow plugins for Claude Code

A small Claude Code marketplace from [Design of Tomorrow](https://designoftomorrow.au). It has one plugin, **Design of Tomorrow Companion** (`dotc`).

The plugin has two commands. `/dotc:design-taste` loads tasteskill v2 (MIT, by Leonxlnx), art direction that stops pages looking generic. `/dotc:review` reviews the design of a public page with your Design of Tomorrow plan.

Needs Claude Code 2.1.281 or later.

## Install

In Claude Code:

```
/plugin marketplace add Design-of-Tomorrow/claude-plugins
/plugin install dotc@design-of-tomorrow
```

## Connect

`/dotc:review` needs a token.

1. Sign in at [app.designoftomorrow.au](https://app.designoftomorrow.au) and create a token on Home.
2. Install the plugin. Claude Code asks for your Design of Tomorrow token. Paste it. If it didn't ask, or you updated from 0.1.0, run `/plugin configure dotc@design-of-tomorrow`.

The token is stored as a secret and is not shown again.

Replaced your token? In Claude Code, run `/plugin configure dotc@design-of-tomorrow`, paste the new token, then restart Claude Code.

## Run

```
/dotc:design-taste
/dotc:review https://site.au
```

For `/dotc:design-taste`, describe the page or site you want designed or reviewed.

For `/dotc:review <url> [focus]`, give a public page and, if you like, what to look at (for example `/dotc:review https://site.au the pricing section`). It shows progress, then the top three findings, three scores and a link to the full review on your dashboard.

## Update

Third-party marketplaces don't update on their own by default. Run:

```
claude plugin update dotc@design-of-tomorrow
```

## Uninstall

```
claude plugin uninstall dotc@design-of-tomorrow
claude plugin marketplace remove design-of-tomorrow
```

## Privacy

Once you set a token, Claude Code connects to app.designoftomorrow.au with it each time it starts. `/dotc:review` sends the page URL, any focus you add, and your token. Without a token the plugin sends nothing. `/dotc:design-taste` sends nothing either way. It runs inside your Claude Code.

The plugin has no hooks and writes nothing to your machine.

## Support

Questions or a bad recommendation? Email [hello@designoftomorrow.au](mailto:hello@designoftomorrow.au).

## Working on this repo

The recommendation list is `plugins/dotc/skills/onboarding/recommendations.md`. To change it, edit that file, bump `version` in `plugins/dotc/.claude-plugin/plugin.json`, and push.

```
npm test        # unit tests for the checker (Node 24, no dependencies)
npm run check   # check the list against SKILL.md and the public marketplaces
npm run validate  # claude plugin validate, plugin and marketplace
```

`npm run check -- --offline` skips the check that each plugin exists in its marketplace.

## Licence

MIT. See [LICENSE](LICENSE).

## Credits

`/dotc:design-taste` bundles [tasteskill v2](https://github.com/Leonxlnx/taste-skill) by Leonxlnx, MIT licence. Its licence is in `plugins/dotc/skills/design-taste/LICENSE`.

The `/dotc:onboarding` draft is parked in `drafts/onboarding/` and not shipped.
