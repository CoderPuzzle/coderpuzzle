# Solutions — First Missing Positive

Both methods rest on the same pin: with `n` slots to fill, the answer is
confined to `1..n + 1`, so the array can act as its own lookup table, slot `i`
standing for the claim that the value `i + 1` is present. Sign marking leaves
every value where it lies and lends each slot's sign out as the flag for that
claim, one flip per value seen. Cyclic sort does without flags: it permutes the
values until each in-range one occupies the slot that claims it, and lets the
arrangement itself be the table.

## Sign Marking at Value-Index

Here the window observation becomes an encoding problem: whether a value was
seen is one bit of information, and every slot carries a sign it can spare.
Slot `v - 1` keeps its magnitude for the final read-off but contributes its
sign to the claim that value `v` is present; negative means seen.

Before the signs can be trusted they must be made unambiguous, since a
negative slot has to mean "marked" and never "the input happened to be
negative". A first pass therefore replaces every non-positive with `n + 1`:
positive, so it can never be mistaken for a mark, and outside the window, so
it never places one.

The second pass reads `v = abs(nums[i])`; the absolute value is
load-bearing, because marks laid down earlier in the same pass may already
have flipped the entry being read. Whenever `v` lies in `1..n` the pass
negates `nums[v - 1]`, and its `> 0` guard makes repeats harmless: a second
copy of `v` finds the flag already set and flips nothing, so a mark can never
be erased by being claimed twice.

The final pass reports the first slot whose sign survived positive; that
slot's index names the absent value, and if every slot comes back marked the
whole window was covered and the answer is `n + 1`. For `nums = [4,1,2,5]`
the values 4, 1 and 2 flip slots 3, 0 and 1 while the 5, living outside the
window, flips nothing; slot 2 keeps its positive 2 because no 3 ever appears
to claim it, and the answer is 3. The three sweeps are plainly linear: no
nesting anywhere, and every slot is read and written a constant number of
times.

One detail of the port: the Python file marks signs in a copy of the input
rather than in the caller's list, which is why the space line below reads
`O(n)` even though the technique itself asks for no auxiliary storage. The
other languages flip signs in place, and apart from that copy only a couple
of index variables are used.

**Complexity:** `O(n)` time, `O(n)` space.

## Cyclic Sort (Index as Hash)

The answer must lie in the range `[1, n+1]`, where `n` is the length of the array: if all of `1..n` are present, the answer is `n+1`; otherwise some value in `1..n` is missing. This observation lets the array itself serve as the bookkeeping structure — value `v` "belongs" at index `v-1`, so after rearranging, `nums[i] == i+1` wherever the value `i+1` exists.

The first pass performs a cyclic sort. At each index `i`, as long as `nums[i]` is a positive value in `[1, n]` and the slot it belongs to (`nums[i]-1`) does not already hold that same value, the code swaps it into its home slot. The `nums[nums[i]-1] != nums[i]` guard terminates the inner loop when the destination is already correct, which also makes duplicates harmless: a duplicate finds its target slot already occupied and stops swapping. Every swap places at least one value into its final position and no value ever leaves its correct slot, so the total number of swaps across the entire outer loop is at most `n` — the double loop is `O(n)` amortized, not quadratic. Values that are zero, negative, or larger than `n` are simply skipped, since they can never be the answer nor occupy a meaningful slot.

![Cyclic sort on nums = [3,4,-1,1]: 3 swaps home to index 2, then 4 to index 3, then 1 to index 0; the final scan finds index 1 holding -1 and returns 2.](figures/solution-cyclic-sort-swaps.svg)

The second pass scans for the first index where `nums[i] != i+1` and returns `i+1` as the smallest missing positive. If every slot matches, all of `1..n` are present and `n+1` is returned. Note the code works on a defensive copy of the input (`list(nums)`) so the caller's list is never mutated; aside from that copy, the algorithm only permutes elements in place using a constant number of variables.

**Complexity:** `O(n)` time, `O(n)` space.
