# Solutions — Odd Even Jump

The jump out of any index is forced, never chosen: an odd-numbered jump must
land on the smallest value to the right that is at least `arr[i]`, an
even-numbered jump on the largest value that is at most `arr[i]`, and equal
candidates resolve to the smallest index. So a start either walks one fixed
chain of alternating jumps or gets stuck, and the problem reduces to two jump
tables plus a right-to-left reachability sweep, built by sorted indices with
a monotonic stack.

## Sorted indices with a monotonic stack, then backward reachability

Order the indices by `(arr[i], i)` ascending and walk that order with a
stack of indices whose odd-jump target is still unknown. When the walk
reaches index `j`, every stacked index `p` with `p < j` has just met its
target: `j` is the first walker standing further right than `p`, and walking
in value order means it carries the smallest qualifying value — with equal
values visited in index order, the tie rule falls out as well. Pop those
indices, record `j` as their target, push `j`; each index is pushed and
popped at most once. The even-jump table is the same pass over indices ordered
by value descending, `(-arr[i], i)`, so it finds the largest value at
most `arr[i]`, same tie rule.

Then a single sweep from the right decides everything. Let `odd[i]` say
whether the end is reachable from `i` when the next jump must be
odd-numbered, and `even[i]` the same for an even-numbered one; the last
index satisfies both with zero jumps. For every earlier `i`, an odd jump
must first land on `higher[i]` — so `odd[i]` holds exactly when that target
exists and `even[higher[i]]` holds — and symmetrically `even[i]` follows
`odd[lower[i]]`. A start is good precisely when its first jump, which every
series opens with, can work out, so the answer is the number of true
`odd[i]`.

Sorting dominates the two table passes — each index moves through its stack
once — and the sweep is linear over `n` two-state cells.

**Complexity:** `O(n log n)` time, `O(n)` space.
