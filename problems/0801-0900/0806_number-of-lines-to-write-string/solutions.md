# Solutions — Number of Lines To Write String

## One sweep, two counters

The layout rule is greedy and purely local: letters are written in order, a letter joins the line being filled whenever it keeps the total within 100 pixels, and it opens the next line the moment it would push past that budget. Nothing that happens after a letter can change where it was placed, so the whole layout is decided by one left-to-right pass — no line ever needs to be revisited.

That pass keeps just two numbers: how many lines have been started, and how many pixels the current line already holds. For each letter the sweep looks up its width, and either accumulates it into the current line or, when `current + width` would exceed 100, increments the line count and restarts the width at that letter. The line count starts at 1 because a non-empty `s` always writes at least one line, and when the sweep ends the width counter is by construction the width of the last line.

Every value stays tiny and exact: widths are at most 10, a line holds at most 100 pixels, and a string of at most 1000 letters spans at most 1000 lines, so native 32-bit integers carry the arithmetic in every language.

**Complexity:** `O(n)` time, `O(1)` space.
