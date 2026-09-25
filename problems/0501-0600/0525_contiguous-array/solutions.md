# Solutions — Contiguous Array

## Prefix balance with a first-occurrence map

Treat every 0 as -1 and every 1 as +1 and carry the running total — the
balance — across the array. A stretch holds equal numbers of 0s and 1s exactly
when the balance is the same at both of its edges, since the equal counts
cancel inside, so whenever the same balance reappears at positions i < j the
elements between them form an equal-count subarray of length j - i. The answer
is the longest such stretch anywhere in the array.

Only the first index at which each balance value occurs needs remembering:
every later repeat is measured against that earliest witness, so
j - first[balance] is the longest equal-count subarray ending at j. Seeding
the map with balance 0 at index -1 lets a balanced prefix that begins at the
very first element count too. The shipped code keeps a hash map in every
language; since the balance only ever ranges over -n..n, a plain 2n+1 array
indexed by balance + n is an equivalent drop-in.

![Example 3's [0, 1, 1, 1, 1, 1, 0, 0, 0] with the running balance -1, 0, 1, 2,
3, 4, 3, 2, 1: balance 1 recurs at i = 8 against its first sighting at i = 2,
making [1, 1, 1, 0, 0, 0] the longest equal-count stretch, of length 6.](figures/solution-balance-first-seen.svg)

The scan examines each element exactly once and records each distinct balance
at most once, so the whole method is a single linear pass that never revisits
an element — it reads only the running balance and the earliest place it was
seen.

**Complexity:** `O(n)` time, `O(n)` space.
