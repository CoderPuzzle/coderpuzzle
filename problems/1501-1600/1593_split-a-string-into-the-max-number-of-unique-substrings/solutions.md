# Solutions — Split a String Into the Max Number of Unique Substrings

## Backtracking over the next piece, with a set of used substrings

The only decision at any point is how long the next piece is: pick a
position `start` and try every length `1..n-start` for the substring that
starts there. A candidate is accepted only when it is not already in a
`used` set of pieces chosen so far; the walk then recurses on the position
right after it, and on return removes the piece from `used` so the next
candidate length at this position sees the same state its sibling did.
Every complete walk (`start == n`) is one valid split, and the answer is
the largest piece count seen across all of them — a plain exhaustive
search over the `2^(n-1)` ways to cut `s` into contiguous pieces.

One bound keeps the search from wasting time on branches that can never
win: from a partial split of `count` pieces with `n - start` characters
still unassigned, at most one more piece per remaining character can ever
be added, so `count + (n - start)` is an upper bound on what this branch
could still reach. Whenever that bound cannot beat the best complete split
found so far, the branch returns immediately instead of trying every
remaining length. Combined with the constraint's small `s.length <= 16`,
the full search — with or without this bound — finishes comfortably
within the judge's time limit.

**Complexity:** `O(2^n * n)` time in the worst case (every contiguous
partition explored, each piece comparison costing up to `O(n)`), `O(n^2)`
space for the substrings held in the `used` set.
