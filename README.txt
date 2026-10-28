A FOREST OF REVERSALS: ONE-FOLDER SITE
=====================================
Everything the live page needs is in this folder. Nothing loads from scrollytelling.ai,
Netlify or Figma; the only outside request is Google Fonts.

index.html ............................ the full page (replaces the scrollytelling.ai page + Head code)
sections/01-opening/ .................. opening scroll video (frames in ketchikan/)
sections/02-stats/ .................... stats band
sections/03-rule-on-rule-off/ ......... Rule on. Rule off. chart
sections/04-tongass/ .................. Tongass chart
sections/05-search-the-record/ ........ searchable timeline (also works on its own; add ?full=1 for a 'See the full story' button)
sections/06-where-it-stands/ .......... Where it stands
timeline/ ............................. full static timeline (was splendid-paprenjak)
timeline/preview/ ..................... 960x1200 preview, now links to timeline/

Hosted on GitHub Pages: https://plf-comms.github.io/forest-of-reversals/
Embed codes for WordPress/Divi: see EMBED-CODES.md

To host anywhere else (any static host): upload this whole folder; index.html is the home page.
Open locally with a small server (e.g. `python3 -m http.server` in this folder), not by double-clicking,
so the sections can talk to the page.
