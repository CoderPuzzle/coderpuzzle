# Solutions — Find the Encrypted String

## Copy each position from its cyclic source

The definition already hands over the whole construction. "The kth character
after" the character at position `i`, read cyclically, is the character at
index `(i + k) mod n` of the same string — so no replacement pass is ever
needed. Building the answer is a single sweep that writes `n` characters,
each copied straight from its computed source index.

The only wrinkle is the size of `k`: it can reach `10⁴` while the string
holds at most `100` characters, so the raw index `(i + k)` may point past
the end. Taking it modulo `n` folds every completed lap back into range and
makes the large-`k` cases disappear into ordinary lookups — when `k` is a
multiple of `n` every character maps to itself (`"aaa"` with `k = 1`, or any
string with `k = n`), and when `k = n - 1` the answer is just the input
rotated by one place. On Example 1, `"dart"` with `k = 3` reads sources `3`,
`0`, `1`, `2` — `'t'`, `'d'`, `'a'`, `'r'` — assembling `"tdar"`.

Each of the `n` output positions costs one index computation and one
character read, so the work is linear in the length. The answer is a fresh
string of that same length, which is also the memory the algorithm holds.

**Complexity:** `O(n)` time, `O(n)` space.
