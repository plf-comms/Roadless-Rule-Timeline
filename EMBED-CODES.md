# A Forest of Reversals: embed codes

Live site: https://plf-comms.github.io/roadless-rule-timeline/

Paste any of these into a Divi **Code** module (or a WordPress Custom HTML block).

---

## Option A: Searchable timeline only, with a "See the full story" button

Good for the case page. The button opens the full story in a new tab.

```html
<style>
  .forest-tl { width:100%; height:760px; border:0; display:block; }
  @media (max-width:820px) { .forest-tl { height:1160px; } }
  @media (max-width:420px) { .forest-tl { height:1300px; } }
</style>
<iframe class="forest-tl"
  src="https://plf-comms.github.io/roadless-rule-timeline/sections/05-search-the-record/index.html?full=1"
  title="Search the record: Roadless Rule reversals, 1998–2026"
  loading="lazy"></iframe>
```

Remove `?full=1` from the address to hide the button.

---

## Option B: The whole story in one iframe

Same format as the old scrollytelling.ai embed. The story scrolls inside its own frame.

```html
<iframe
  src="https://plf-comms.github.io/roadless-rule-timeline/"
  title="A Forest of Reversals"
  style="width:100%;height:100vh;min-height:600px;border:0;display:block"
  loading="lazy" allowfullscreen></iframe>
```

---

## Option C: The whole story, seamless (six sections plus a script)

Scrolls with the page itself instead of inside a frame. Paste the whole of
`forest-embed-snippet.html`; the addresses are already filled in.

---

## Updating

Edit the files in this repo (or replace them with a new export from Figma Make).
GitHub Pages republishes automatically within a minute or two, and every embed updates.
The embed codes never change.
