# Design of Tomorrow plugins for Claude Code

A small Claude Code marketplace from [Design of Tomorrow](https://designoftomorrow.au). It has one plugin, **Design of Tomorrow Companion** (`dotc`).

The plugin has two commands. `/dotc:design-taste` loads tasteskill v2 (MIT, by Leonxlnx), art direction that stops pages looking generic. `/dotc:review` reviews the design of a public page with your Design of Tomorrow plan. In this release it checks your account status. The review tools come in the next release.

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
2. Install the plugin. Claude Code asks for your Design of Tomorrow token. Paste it.

The token is stored as a secret and is not shown again.

Replaced your token? Run `claude plugin configure dotc@design-of-tomorrow` and paste the new one. You can also use `/plugin` and choose Configure.

## Run

```
/dotc:design-taste
/dotc:review https://site.au
```

For `/dotc:design-taste`, describe the page or site you want designed or reviewed.

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

`/dotc:review` sends the page URL you give it and your token to app.designoftomorrow.au. `/dotc:design-taste` still sends nothing. It runs inside your Claude Code.

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
