# Design of Tomorrow plugins for Claude Code

A small Claude Code marketplace from [Design of Tomorrow](https://designoftomorrow.au). It has one plugin, **Design of Tomorrow Companion** (`dotc`).

The plugin has one command for now, `/dotc:design-taste`. It loads tasteskill v2 (MIT, by Leonxlnx), art direction that stops pages looking generic. Test release.

Needs the latest Claude Code.

## Install

In Claude Code:

```
/plugin marketplace add Design-of-Tomorrow/claude-plugins
/plugin install dotc@design-of-tomorrow
```

## Run

```
/dotc:design-taste
```

Then describe the page or site you want designed or reviewed.

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

The plugin doesn't send anything to us. It runs inside your Claude Code.

It has no server, no hooks and no MCP config, and it writes nothing to your machine.

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
