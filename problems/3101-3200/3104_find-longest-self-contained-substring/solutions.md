# Solutions — Find Longest Self-Contained Substring

Two structural facts prune the search: a self-contained window must
contain every occurrence of its own leading character (so it starts at
some letter's first occurrence — at most 26 candidate left ends), and its
right end always lands on the last occurrence of the character sitting
there. Between those endpoints, containment is purely per-letter book
keeping, which prefix counts answer in constant time.

## Anchored closure cascades over prefix counts

Build cumulative counts per letter, so "letter `d` occurs inside
`s[l..r]`" is one count difference. Enumerate each distinct letter's
first occurrence as anchor `l` with initial window ending at that
letter's last occurrence, then run a closure cascade: any letter occurring
inside drags the right end out to its own last occurrence; repeat until
the end stops moving. At such a fixpoint every occurring letter is fully
contained by construction, and validity reduces to one extra check — no
occurring letter starts before `l` (tracked alongside as the earliest
first occurrence in the window) and the window is not the whole string.

Fixpoints are not the only candidates, because adjacent closed blocks can
merge into a longer self-contained union (`"abacd"` joins `"aba"` with
`"c"` to form `"abac"`). After recording each fixpoint the cascade jumps
past it by absorbing the block starting at position `r + 1` wholesale and
re-stabilizes; this monotone chain visits each right end at most once,
and since any valid extension past a fixpoint must complete the very next
character's occurrences first, every mergeable boundary appears on the
chain. Total work is `O(26 * 26)` closures plus an `O(26n)` table —
linear with small constants, all loops iterative.

**Complexity:** `O(n * 26 * 26)` time worst case, `O(n * 26)` space for
the count table.
