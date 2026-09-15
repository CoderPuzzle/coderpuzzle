# Solutions — Max Chunks To Make Sorted II

Both solutions rest on the same pin: a cut after position `k` is legal
exactly when `arr[0..k]` holds the smallest `k+1` entries of the array, so no
value needs to cross. The multiset balance verifies that against a sorted
copy, carrying one counter per value because entries repeat. The cut-counting
sweep asks the same question through order statistics — the prefix holds the
smallest entries precisely when its running maximum does not exceed the
suffix's running minimum — and never sorts anything.

## Running multiset balance against the sorted array

Index `k` is a legal chunk boundary exactly when the multiset of `arr[:k]` equals the multiset of `sorted(arr)[:k]`: only then does sorting each side independently and concatenating reproduce the fully sorted array (unlike the permutation version of this problem, values can repeat, so multisets rather than max/min ranges are needed).

Sorting a copy gives the target, then compare the two arrays in lockstep with a count map and a running balance. For each position, increment the count of the original value and decrement the count of the sorted value. Each operation adjusts the balance by `+1` when it leaves a value's count nonzero (a new unpaired element) and by `-1` when it brings a value's count back to zero (pairing off a previously unpaired element). The balance therefore equals the total number of unpaired elements, and it returns to zero precisely when every value's copies in the prefix have been matched — cut a chunk there.

Cutting at every zero-balance position yields the maximum number of chunks, since each cut happens at the earliest index where the prefix multisets agree; any later cut would only merge chunks. A strictly decreasing array never balances until the end, giving one chunk, while an already-sorted array balances at every index.

**Complexity:** `O(n log n)` time (dominated by the sort; the sweep is linear), `O(n)` space.

## Running prefix maxima against suffix minima

The legality condition has a second reading that needs no sorted copy. The
prefix `arr[0..k]` holds the smallest entries of the array exactly when
nothing after the cut is smaller than anything before it:
`max(arr[0..k]) ≤ min(arr[k+1..])`. One direction is immediate — the smallest
entries are ≤ all the rest. For the other, only a strictly smaller suffix
entry could push a prefix value out of the sorted prefix, and no suffix entry
is strictly smaller than any prefix entry; equal values across the boundary
are interchangeable, so the prefix multiset is the sorted prefix's, repeats
included.

The comparison has to be non-strict, and that is where repeats bite. On
`[2,1,2]` the cut between the `1` and the final `2` compares prefix max `2`
against suffix min `2` — equal, and legal, since the two equal values serve
the sorted order equally well on either side; a strict `<` would reject it
and undercount. On `[1,3,3,2,6]` the two legal cuts read `1 ≤ 2` after the
leading `1` and `3 ≤ 6` before the `6`, while the cuts inside `[3,3,2]` read
`3 ≤ 2` and fail — three blocks, as before.

One backward scan turns the array into suffix minima — `suffix_min[i]`, the
smallest entry from `i` to the end — and one forward scan carries the running
prefix maximum, counting every position whose suffix minimum is at least it.
Each legal cut opens one more block and the whole array always closes the
last, so the answer is the cut count plus one. The array of suffix minima is
the only extra storage.

**Complexity:** `O(n)` time, `O(n)` space.
