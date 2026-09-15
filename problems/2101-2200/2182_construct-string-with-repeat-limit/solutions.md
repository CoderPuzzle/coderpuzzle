# Solutions — Construct String With Repeat Limit

## Greedy with a separator from the next letter down

The lexicographically largest construction always emits the largest
remaining letter, as many as the run limit allows. If that letter still
has copies left but cannot extend its run, one copy of the next largest
letter is spent as a separator and emission of the big letter resumes;
when no smaller letter remains to separate, the leftover copies of the
big letter are simply unused. Since every decision appends the largest
feasible letter, no other valid string can beat it position by position.

Counting 26 buckets keeps each scan constant-time, so the whole
construction is linear in the output length.

**Complexity:** `O(n + 26^2)` time (bucket scans amortize over `n`
emissions), `O(n)` space.
