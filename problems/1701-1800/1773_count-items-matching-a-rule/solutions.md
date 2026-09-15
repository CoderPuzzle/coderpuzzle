# Solutions — Count Items Matching a Rule

Every item is a `[type, color, name]` triple, and the rule names one of
those three columns by key plus the value that column must hold. Counting
the matching items is therefore a column selection followed by an equality
count over the rows.

## Resolve the rule key to its column index

The three possible rule keys are exactly the three positions of every
item, so the key can be resolved once, up front, into an index — `"type"`
to `0`, `"color"` to `1`, `"name"` to `2`. After that single dispatch the
key is never tested again inside the loop: the pass over `items` compares
one fixed field of each row against `ruleValue` and counts the hits.

Selecting the column first also keeps the rule exclusive per row. A row
holds all three strings, so `ruleValue` may well occur in the two columns
the rule does not name — Example 2's `["computer","silver","phone"]` has
`"phone"` as its name while the rule asks for the type — and only the
field at the resolved index decides the match.

**Complexity:** `O(n)` time, `O(1)` space, over `n` items; each row does
one string comparison whose length the constraints bound by `10`.
