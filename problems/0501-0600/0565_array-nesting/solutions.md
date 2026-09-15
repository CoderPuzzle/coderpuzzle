# Solutions — Array Nesting

## Cycle walk with a visited array

Because `nums` is a permutation, the mapping `i -> nums[i]` is a graph in
which every node has exactly one successor and exactly one predecessor, so
the array decomposes into disjoint cycles. The set `s[k]` is precisely the
cycle containing `k`, walked from `nums[k]` until the next element would be
a repeat — the construction stops one step before the duplicate closes the
loop. Every starting point inside one cycle generates that same cycle, so
`s[k]` is the whole cycle for each of its members: one value per cycle, its
length.

That collapse is what makes a linear sweep possible. The code scans every
index and skips ones already marked visited; an unvisited index opens a walk
that marks each element it lands on and steps to `nums[index]`, counting as
it goes. The walk ends when it reaches a marked element — its own start —
and the count is the cycle's length. Each index is marked by the single walk
that first reaches it, so no index is ever walked twice and the total work
is proportional to `n`.

The answer is the largest count any walk produced. Marking lives in a
separate boolean array, so `nums` itself is never modified.

**Complexity:** `O(n)` time, `O(n)` space.
