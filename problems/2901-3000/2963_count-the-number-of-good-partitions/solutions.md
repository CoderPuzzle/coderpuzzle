# Solutions — Count the Number of Good Partitions

No value may appear in two different subarrays, so all occurrences of a
value are chained into one unbreakable interval between its first and last
index, and the question reduces to how many independent cut decisions
survive between those intervals.

## Double at every free gap

The shortest segment containing a value v runs from v's first occurrence
to its last, and these intervals chain into maximal blocks: a cut inside a
block would split some value across two subarrays, while a cut between two
adjacent blocks is always safe. So the array decomposes into m maximal
blocks and a good partition is exactly a choice of which of the m - 1 gaps
between consecutive blocks become cuts — every gap independently cut or
not cut, and no other partition is good.

Count the gaps in one pass: record the last index of every value, sweep
the array keeping the furthest last occurrence seen so far, and each index
where that furthest reach equals the current position closes one block.
The count doubles per closed block after the first, giving 2^(m - 1) as a
running product modulo 10⁹ + 7; the product stays below 2 × 10⁹, which
fits exactly in 64-bit integer arithmetic and in JavaScript's doubles (far
under 2⁵³), and the returned value is already reduced below 2³¹.

**Complexity:** `O(n)` time, `O(n)` space.
