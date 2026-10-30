---
name: onboarding
description: Asks two short questions about your work, then recommends three Claude Code plugins with install commands.
disable-model-invocation: true
---

# Onboarding

Recommend three plugins that already exist in Claude Code marketplaces. Ask two questions, one at a time. Then print exactly three recommendations.

Style: short sentences, Australian English, "you", no em dashes, no hype.

While asking and recommending, do not use the network, write files or run commands. Only read `${CLAUDE_SKILL_DIR}/recommendations.md`.

## Flow

1. Ask question 1. Show the options as a numbered list. Wait for the answer. Accept a number or the option text.
2. If the answer is not "Something else", ask the matching question 2. Wait for the answer.
3. Read `${CLAUDE_SKILL_DIR}/recommendations.md`.
4. Find the section for the answer path. The heading is `## <question 1 option> > <question 2 option>`, or just `## Something else`.
5. Print its three entries in the output format below. Use the entries as written. Do not add, swap or reorder them.

If the user stops partway, or says they don't want to continue, reply only: "No worries. Run the command again when you're ready."

## Question 1

What do you mostly use Claude Code for?

1. Design work (UI, UX, brand)
2. Building websites or web apps
3. Agency or client work
4. Something else

## Question 2

Ask only the block that matches question 1. Skip it for "Something else".

### If Design work (UI, UX, brand)

Which part needs the most help right now?

1. Interfaces that look less generic
2. Design systems and tokens
3. Accessibility and quality
4. Turning designs into code

### If Building websites or web apps

Which part needs the most help right now?

1. Starting a new site or app
2. Reviewing and tidying code
3. Testing and debugging
4. Deploying and hosting

### If Agency or client work

Which part needs the most help right now?

1. Planning a client project
2. Writing up docs and notes
3. Checking work before it goes to the client
4. Tracking tasks and feedback

## Output format

Print this, with the three entries filled in from the recommendations file:

```
Three plugins worth trying:

1. <name> (<maintainer>)
   Good for: <good for line>
   Install:  <install command>
   Then run: <run command>

2. ...
3. ...

Questions or a bad recommendation? Email hello@designoftomorrow.au
```

Rules:

- Use the entry's `Install` and `Run` lines exactly as written. If `Run` says "see the plugin's README", print that.
- The `claude-plugins-official` marketplace comes with Claude Code. Do not add a marketplace line for it.
- If an entry has an `Add marketplace:` line, print it as `Add it:   <command>` directly above that entry's `Install` line.
- Do not install anything yourself. If the user then asks you to install one (for example "install the first one"), run `claude plugin install <name>@<marketplace>` for that entry, after they confirm.

## Edge case: "Something else"

Print the three general picks in the same format. Then, before the email line, add:

```
Tell us what you were after: hello@designoftomorrow.au
```

## Edge case: the user stops partway

Reply "No worries. Run the command again when you're ready." and nothing else.
