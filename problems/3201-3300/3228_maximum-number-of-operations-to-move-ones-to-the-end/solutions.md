# Solutions — Maximum Number of Operations to Move Ones to the End

One operation takes a `'1'` that sits directly left of a `'0'` and slides it
across the entire block of 0's it faces, parking it just before the next `'1'`
or at the string's end. The 0's themselves never move, so the whole process is
a traffic of 1's hopping over fixed blocks of 0's — and the answer turns out
to be a pure count of pairs, no simulation needed.

## Count one per one-before-a-zero-block pair

Call a _pair_ any combination of a `'1'` and a maximal block of 0's that opens
strictly to its right in the initial string. Each operation moves one `'1'`
across one such block, and once a `'1'` has landed past a block's positions it
stays past them forever — so no pair is ever spent twice, which bounds the
answer by the number of pairs. The bound is reachable: always operating on the
lowest legal index drains the leftmost unfinished run of 1's first, each of its
1's hopping over exactly the one block ahead of it and stacking onto the next
run, so every `'1'` eventually crosses every zero-block that opened to its
right — exactly once apiece. The maximum operation count is therefore the
number of these pairs.

A single sweep tallies them without building anything: walk `s` left to right,
counting 1's seen so far, and every time a fresh block of 0's opens (a `'0'`
that follows another `'0'` or nothing adds nothing; a `'0'` after a `'1'`
opens one), add the running count — each of those 1's lies strictly left of
the new block and forms one pair with it. For `"1001101"` the blocks open
after one and three 1's respectively, giving `1 + 3 = 4`; for `"00111"` the
only zero-block opens before any `'1'`, adding `0`, matching the examples.
Every intermediate total stays below the final answer, whose worst case at
`s.length = 10⁵` — a heavy opening run of 1's followed by lone 1's separated
by single 0's — stays under `1.67 × 10⁹`, safely within 32 bits.

**Complexity:** `O(n)` time, `O(1)` space.
