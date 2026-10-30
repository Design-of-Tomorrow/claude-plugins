# Recommendations

> DRAFT, awaiting founder approval.

The curated list for `/dotc:onboarding`. One section per answer path. Each path has exactly 3 entries. Every plugin is in the `claude-plugins-official` marketplace, which comes with Claude Code, so no `/plugin marketplace add` line is needed. If you add a plugin from another marketplace, give its entry an `Add marketplace:` line.

Section headings are the exact option text from `SKILL.md`, joined with ` > `. Run `npm run check` after any edit.

## Design work (UI, UX, brand) > Interfaces that look less generic

### 1. frontend-design
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Builds distinctive, polished interfaces that avoid the generic AI look.
- Install: `/plugin install frontend-design@claude-plugins-official`
- Run: `/frontend-design:frontend-design`

### 2. superdesign
- Maintainer: Superdesign dev, Inc.
- Marketplace: claude-plugins-official
- Good for: Design or redesign interfaces on a canvas, with a design system and branchable drafts.
- Install: `/plugin install superdesign@claude-plugins-official`
- Run: `/superdesign:superdesign`

### 3. modern-web-guidance
- Maintainer: Google Chrome
- Marketplace: claude-plugins-official
- Good for: Keeps Claude current on modern HTML, CSS and browser APIs, so it stops using dated patterns.
- Install: `/plugin install modern-web-guidance@claude-plugins-official`
- Run: `/modern-web-guidance:modern-web-guidance`

## Design work (UI, UX, brand) > Design systems and tokens

### 1. figma
- Maintainer: Figma
- Marketplace: claude-plugins-official
- Good for: Reads Figma files, variables and components, and turns designs into code.
- Install: `/plugin install figma@claude-plugins-official`
- Run: `/figma:figma-generate-library`

### 2. superdesign
- Maintainer: Superdesign dev, Inc.
- Marketplace: claude-plugins-official
- Good for: Design or redesign interfaces on a canvas, with a design system and branchable drafts.
- Install: `/plugin install superdesign@claude-plugins-official`
- Run: `/superdesign:superdesign`

### 3. canva
- Maintainer: Canva
- Marketplace: claude-plugins-official
- Good for: Checks Canva designs against your brand kit and flags off-brand colours, fonts and logos.
- Install: `/plugin install canva@claude-plugins-official`
- Run: `/canva:canva-brand-check`

## Design work (UI, UX, brand) > Accessibility and quality

### 1. chrome-devtools-mcp
- Maintainer: Google Chrome DevTools team
- Marketplace: claude-plugins-official
- Good for: Audits accessibility, keyboard focus and performance in a live Chrome browser.
- Install: `/plugin install chrome-devtools-mcp@claude-plugins-official`
- Run: `/chrome-devtools-mcp:a11y-debugging`

### 2. playwright
- Maintainer: Microsoft
- Marketplace: claude-plugins-official
- Good for: Drives a real browser to click through pages, take screenshots and run end-to-end tests.
- Install: `/plugin install playwright@claude-plugins-official`
- Run: see the plugin's README

### 3. modern-web-guidance
- Maintainer: Google Chrome
- Marketplace: claude-plugins-official
- Good for: Keeps Claude current on modern HTML, CSS and browser APIs, so it stops using dated patterns.
- Install: `/plugin install modern-web-guidance@claude-plugins-official`
- Run: `/modern-web-guidance:modern-web-guidance`

## Design work (UI, UX, brand) > Turning designs into code

### 1. figma
- Maintainer: Figma
- Marketplace: claude-plugins-official
- Good for: Reads Figma files, variables and components, and turns designs into code.
- Install: `/plugin install figma@claude-plugins-official`
- Run: `/figma:figma-design-to-code`

### 2. frontend-design
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Builds distinctive, polished interfaces that avoid the generic AI look.
- Install: `/plugin install frontend-design@claude-plugins-official`
- Run: `/frontend-design:frontend-design`

### 3. superdesign
- Maintainer: Superdesign dev, Inc.
- Marketplace: claude-plugins-official
- Good for: Design or redesign interfaces on a canvas, with a design system and branchable drafts.
- Install: `/plugin install superdesign@claude-plugins-official`
- Run: `/superdesign:superdesign`

## Building websites or web apps > Starting a new site or app

### 1. feature-dev
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: A guided workflow for new features: explore the codebase, design, build, then review.
- Install: `/plugin install feature-dev@claude-plugins-official`
- Run: `/feature-dev:feature-dev`

### 2. frontend-design
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Builds distinctive, polished interfaces that avoid the generic AI look.
- Install: `/plugin install frontend-design@claude-plugins-official`
- Run: `/frontend-design:frontend-design`

### 3. superpowers
- Maintainer: Jesse Vincent
- Marketplace: claude-plugins-official
- Good for: Teaches Claude to brainstorm and plan before it builds, then debug and test properly.
- Install: `/plugin install superpowers@claude-plugins-official`
- Run: `/superpowers:brainstorming`

## Building websites or web apps > Reviewing and tidying code

### 1. code-review
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Reviews a pull request with several agents and filters out low-confidence findings.
- Install: `/plugin install code-review@claude-plugins-official`
- Run: `/code-review:code-review`

### 2. pr-review-toolkit
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Review agents for comments, tests, error handling, types and code quality.
- Install: `/plugin install pr-review-toolkit@claude-plugins-official`
- Run: `/pr-review-toolkit:review-pr`

### 3. code-simplifier
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: An agent that tidies recently changed code for clarity without changing behaviour.
- Install: `/plugin install code-simplifier@claude-plugins-official`
- Run: see the plugin's README

## Building websites or web apps > Testing and debugging

### 1. chrome-devtools-mcp
- Maintainer: Google Chrome DevTools team
- Marketplace: claude-plugins-official
- Good for: Inspects a live Chrome page: console, network, performance traces and browser actions.
- Install: `/plugin install chrome-devtools-mcp@claude-plugins-official`
- Run: `/chrome-devtools-mcp:chrome-devtools`

### 2. playwright
- Maintainer: Microsoft
- Marketplace: claude-plugins-official
- Good for: Drives a real browser to click through pages, take screenshots and run end-to-end tests.
- Install: `/plugin install playwright@claude-plugins-official`
- Run: see the plugin's README

### 3. superpowers
- Maintainer: Jesse Vincent
- Marketplace: claude-plugins-official
- Good for: Teaches Claude to find the cause of a bug before proposing a fix.
- Install: `/plugin install superpowers@claude-plugins-official`
- Run: `/superpowers:systematic-debugging`

## Building websites or web apps > Deploying and hosting

### 1. vercel
- Maintainer: Vercel
- Marketplace: claude-plugins-official
- Good for: Deploys to Vercel, checks build status and logs, and manages domains.
- Install: `/plugin install vercel@claude-plugins-official`
- Run: `/vercel:deploy`

### 2. netlify-skills
- Maintainer: Netlify
- Marketplace: claude-plugins-official
- Good for: Netlify deploys, functions, forms, config and the CLI.
- Install: `/plugin install netlify-skills@claude-plugins-official`
- Run: `/netlify-skills:netlify-deploy`

### 3. cloudflare
- Maintainer: Cloudflare
- Marketplace: claude-plugins-official
- Good for: Cloudflare Workers, Wrangler and deployment help.
- Install: `/plugin install cloudflare@claude-plugins-official`
- Run: `/cloudflare:wrangler`

## Agency or client work > Planning a client project

### 1. superpowers
- Maintainer: Jesse Vincent
- Marketplace: claude-plugins-official
- Good for: Teaches Claude to brainstorm and plan before it builds, then debug and test properly.
- Install: `/plugin install superpowers@claude-plugins-official`
- Run: `/superpowers:writing-plans`

### 2. feature-dev
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: A guided workflow for new features: explore the codebase, design, build, then review.
- Install: `/plugin install feature-dev@claude-plugins-official`
- Run: `/feature-dev:feature-dev`

### 3. project-artifact
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Builds a shareable project status page: success criteria, workstreams and next steps.
- Install: `/plugin install project-artifact@claude-plugins-official`
- Run: `/project-artifact:project-artifact`

## Agency or client work > Writing up docs and notes

### 1. notion
- Maintainer: Notion Labs
- Marketplace: claude-plugins-official
- Good for: Searches and writes Notion pages and databases from Claude Code.
- Install: `/plugin install notion@claude-plugins-official`
- Run: see the plugin's README

### 2. project-artifact
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Builds a shareable project status page: success criteria, workstreams and next steps.
- Install: `/plugin install project-artifact@claude-plugins-official`
- Run: `/project-artifact:project-artifact`

### 3. playground
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Makes interactive HTML explorers, including templates for design and document critique.
- Install: `/plugin install playground@claude-plugins-official`
- Run: `/playground:playground`

## Agency or client work > Checking work before it goes to the client

### 1. code-review
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Reviews a pull request with several agents and filters out low-confidence findings.
- Install: `/plugin install code-review@claude-plugins-official`
- Run: `/code-review:code-review`

### 2. canva
- Maintainer: Canva
- Marketplace: claude-plugins-official
- Good for: Checks Canva designs against your brand kit and flags off-brand colours, fonts and logos.
- Install: `/plugin install canva@claude-plugins-official`
- Run: `/canva:canva-brand-check`

### 3. playwright
- Maintainer: Microsoft
- Marketplace: claude-plugins-official
- Good for: Drives a real browser to click through pages, take screenshots and run end-to-end tests.
- Install: `/plugin install playwright@claude-plugins-official`
- Run: see the plugin's README

## Agency or client work > Tracking tasks and feedback

### 1. linear
- Maintainer: Linear
- Marketplace: claude-plugins-official
- Good for: Creates and updates Linear issues and projects without leaving Claude Code.
- Install: `/plugin install linear@claude-plugins-official`
- Run: see the plugin's README

### 2. asana
- Maintainer: Asana
- Marketplace: claude-plugins-official
- Good for: Creates and tracks Asana tasks and projects from Claude Code.
- Install: `/plugin install asana@claude-plugins-official`
- Run: see the plugin's README

### 3. notion
- Maintainer: Notion Labs
- Marketplace: claude-plugins-official
- Good for: Searches and writes Notion pages and databases from Claude Code.
- Install: `/plugin install notion@claude-plugins-official`
- Run: see the plugin's README

## Something else

### 1. superpowers
- Maintainer: Jesse Vincent
- Marketplace: claude-plugins-official
- Good for: Teaches Claude to brainstorm and plan before it builds, then debug and test properly.
- Install: `/plugin install superpowers@claude-plugins-official`
- Run: `/superpowers:brainstorming`

### 2. code-review
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Reviews a pull request with several agents and filters out low-confidence findings.
- Install: `/plugin install code-review@claude-plugins-official`
- Run: `/code-review:code-review`

### 3. commit-commands
- Maintainer: Anthropic
- Marketplace: claude-plugins-official
- Good for: Commands for git commits, push and pull request creation.
- Install: `/plugin install commit-commands@claude-plugins-official`
- Run: `/commit-commands:commit`
