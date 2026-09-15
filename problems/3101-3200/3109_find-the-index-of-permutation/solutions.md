# Solutions — Find the Index of Permutation

Both solutions read the rank as the sum of the permutation's Lehmer digits:
slot `i` adds `(smaller still-available values) * (n - 1 - i)!`, totaled
modulo `10^9 + 7` over factorials precomputed to `(n - 1)!`. They differ
only in how the digits are harvested. The Fenwick tree walks the slots in
order, asking at each one how many unused values remain below it and
retiring the placed value on the spot. The merge sort banks one observation
— the values still unused at a slot are exactly its later slots, so every
digit is a count of smaller values sitting to the right — and recovers the
whole digit vector from a single divide-and-conquer pass, never processing
the slots in order at all.

## Lehmer code with a Fenwick tree

The lexicographic index is the Lehmer-code expansion: for each position `i`, every permutation that places a smaller still-unused value at `i` comes earlier, contributing `(count of unused values below perm[i]) * (n - 1 - i)!` to the index. Summing those contributions over all positions counts exactly the permutations preceding `perm`, so the answer is that sum modulo 10^9 + 7.

Factorials up to `(n-1)!` are precomputed modulo 10^9 + 7. The "unused values below `perm[i]`" count needs dynamic rank queries with point removals: a Fenwick tree is seeded with a 1 at every value `1..n`, and after each position contributes `query(perm[i] - 1) * fact[n - 1 - i]`, the value `perm[i]` is removed with a `-1` update so later positions see only what remains.

Each position costs two O(log n) tree operations, and since `perm` is a permutation, the tree drains to exactly zero by the end. The identity permutation naturally yields 0, and `n = 1` works with a single trivial factor.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Lehmer code by merge-sort divide and conquer

The Fenwick sweep harvests the digits one slot at a time; this one drains
them all from a single pass. The values still unused when slot `i` is
filled are exactly the values sitting in later slots, so slot `i`'s Lehmer
digit — how many of them are smaller than `perm[i]` — is an inversion
count: smaller values to the right of position `i`. A merge sort that
tallies, for every element, how many later elements fall below it in value
therefore produces the entire digit vector in one divide-and-conquer, and
the same factorial table then assembles the rank modulo `10^9 + 7`.

The sort carries `(value, original index)` pairs in its workspace. Each
merge confronts two runs already ordered by value; when a left-run pair is
finally placed, every right-run pair already placed ahead of it is smaller
and — living in the right half of the array — later, so `j - mid`, the
right run's placed prefix, accrues to that pair's original index. Left
pairs move only on a strict `<`, which is exactly the strict-smaller
counting the rank asks for; a permutation offers no equal values for a tie
to matter, the same distinctness the Fenwick tree leans on when its counts
drain to zero. A closing sweep multiplies each digit by `(n - 1 - i)!` and
sums.

Walked on `[4,2,1,3]`: the `4` has three smaller values to its right, the
`2` one, the `1` and `3` none — `3 * 3! + 1 * 2! = 20`, the same digits the
Fenwick tree read off slot by slot. The reversed input `[4,3,2,1]`
maximizes every digit at once and lands on `4! - 1 = 23`; the identity
collects zeros throughout and ranks 0.

Each recursion level merges linear work across the whole array, and there
are `log n` levels; the closing factorial-weighted sum is one more pass.

**Complexity:** `O(n log n)` time, `O(n)` space.
