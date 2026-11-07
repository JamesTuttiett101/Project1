# SENSORA impact page

The page lives at `/sensora-impact/` on jamestuttiett.uk. It is unlisted, and the `noindex, nofollow` tag keeps it out of search engines. Unlisted is not private: anyone with the link can open it, and this GitHub repository is public, so only put approved, public information here.

## How to update a number or a fact

1. Open `data.js`.
2. Find the line you want, for example `display: "over £200,000"`.
3. Change only the text between the quotes. Keep the quotes and the comma at the end of the line.
4. Change `lastUpdated` near the top to today's date (`YYYY-MM-DD`).
5. Save and refresh the page to check it.

You never need to edit `index.html`, `styles.css` or `app.js` to change content.

### Adding things later

- **Ways to help:** add items to `fundraisingOpportunities`, for example
  `{ type: "Host a table", title: "Host a table at SENSORA 2027", text: "One line about it.", link: "https://..." }`.
  The section and its filter buttons appear automatically.
- **Research support:** add Charity-approved items to `researchOpportunities`. Same shape, without `type`.
- **A chef portrait:** put the black-and-white image in `assets/chefs/` and add its path as `image` on that chef. Without an image, the page shows a text card.
- **Video captions:** save the caption file as `assets/video/mark-and-james.vtt` and set `captions: "assets/video/mark-and-james.vtt"` in `data.js`.

## How to preview on your computer

Double-click `index.html`. It opens in your browser and works without the internet or any setup. One exception: Chrome does not show the video captions on a page opened this way. They work on the live site.

## When the Charity signs off

1. Remove the yellow banner: in `index.html`, delete the line that starts `<div class="approval"`.
2. Decide whether the page should appear in search engines. If yes, delete the line containing `noindex, nofollow` in `index.html`.

## Rules for this folder

- Only confirmed, Charity-approved facts. Leave a list empty rather than guessing.
- No donor names, prices, sponsor prospects, private notes or medical advice.
- Never mark Fallow as Michelin-starred. Spellings: Goodwin-Allen, Byerley, Middleton-Joseph, Nicolai Tram, Will Murray, Northcote.
- No analytics, no paid services, no autoplaying sound.
- The chef carousel moves on its own but stops for anyone whose device is set to reduce motion, and always has a pause button.
