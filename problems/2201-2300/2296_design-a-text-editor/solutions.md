# Solutions — Design a Text Editor

## Two stacks around the cursor

Split the text at the cursor into two stacks: `left` holds the characters
before the cursor with the nearest one on top, and `right` holds the
characters after it in reverse, with the nearest one on top. The characters
adjacent to the cursor are therefore always the two tops, which is the only
place any operation ever touches.

`addText` pushes its characters onto `left`, leaving the cursor to their
right. `deleteText` pops up to `k` characters off `left` and returns how
many it got. Moving `k` positions left pops `min(k, len(left))` characters
from `left` onto `right`; moving right mirrors this by popping from `right`
onto `left`; either way the return value reads at most ten characters below
the top of `left`. Clamping falls out for free — an empty stack simply runs
out of characters to move or delete.

**Complexity:** `O(len(text))` for `addText`, `O(k)` for every other call,
`O(n)` space.
