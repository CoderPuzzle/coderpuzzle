# Solutions — Longest Common Subpath

Both attacks hunt the same object — one run of values that every sequence
contains. The suffix array makes the hunt global and deterministic:
concatenate the sequences into one text, stand every suffix in sorted
order, and slide the narrowest window that still touches all sequences; the
shallowest LCP inside that window is the longest run they all share. The
hash bisection stays lighter on the clock by never ordering anything at
all: it halves on the monotone answer and fingerprints windows in place of
comparing them.

## Suffix Array with a Sliding-Window Minimum LCP

A segment living inside every sequence is a prefix that one suffix of every
sequence shares, which invites one text: the code concatenates all the
sequences and closes each with its own separator drawn from above the value
alphabet — the first sits at the larger of `n` and one past the biggest
value present, and they climb by one per sequence. Distinct and out of the
alphabet, a separator can never line up with a value, nor with another
separator, so any agreement between suffixes of two sequences halts exactly
at the sequence ends instead of leaking across a boundary, and a
same-sequence pair halts the same way. With `k` sequences the text gains
`k` symbols over the `S` input values.

Sorting the suffixes then turns the hunt into a window problem. Suffixes
sharing a prefix occupy one contiguous block of the sorted order, so the
deepest segment present in _every_ sequence is realized by some window of
the suffix array that contains at least one suffix of each sequence — and
the prefix common to a whole window is the minimum adjacent LCP inside it.
The answer is the deepest such window. Two pointers sweep the array once,
advancing the right edge and retiring from the left only while coverage
still holds (a shorter covering window can only deepen the minimum), while
a monotonic deque carries the window's minimum LCP at its front: every
suffix enters and leaves the window once, so the sweep is linear.

The sort never compares the suffixes themselves. Every suffix starts ranked
by its first symbol, and each pass re-sorts them by the pair
_(`rank[i]`, `rank[i + k]`)_ — the second entry being the rank the suffix
`k` steps later already holds, with a below-everything sentinel standing in
past the end — packed into one integer key so an ordinary comparison sort
applies; the key stays below the square of the text length, inside 64-bit
range and exact in a JavaScript double. Suffixes sharing a rank after a
pass agree on a prefix of length `2k`, so each doubling of `k` doubles the
compared length and `ceil(log2)` passes settle the full order, the pass
that leaves every rank distinct ending the loop early. Nothing here is
randomized — no hash, no modulus, no collision to argue away.

The adjacent depths come from Kasai's scan: walking the text positions left
to right, each suffix is matched against its sorted predecessor by a single
extending pointer `h`; because both suffixes lose exactly their first
symbol when the walk steps on, a match shortens by at most one per step,
and paying one unit back each step keeps the pointer's total travel within
`2N` symbol comparisons. Suffixes that start on a separator cannot share
even one symbol with another suffix — their first symbol is unique in the
whole text — so the window sweep drops them; the LCP of two consecutive
survivors is the minimum over the span of dropped suffixes between them,
folded in one running pass.

When the sequences share nothing, no window ever covers every sequence and
the answer falls out as `0`; an empty sequence can never be covered and
forces the same `0` without any special case. Where a segment sits inside
its sequence never matters — the window asks only that every sequence be
represented somewhere in it, which is exactly the freedom the problem
grants.

**Complexity:** `O(S log² S)` time (`S` = combined length of all
sequences; the doubling sort runs `O(log S)` comparison sorts), `O(S)`
space.

## Binary Search on Length with a Double Rolling Hash

If a common subpath of length `x` exists, then so does one of every shorter length (any prefix of it), so "a common subpath of length L exists" is a monotone predicate in `L`. The solution binary-searches `L` over `[0, min path length]`, taking the upper-mid variant (`(lo+hi+1)//2`) since the predicate is satisfied by smaller values, and converges on the maximum feasible length, with 0 as the answer when nothing matches.

The feasibility check hashes every window of length `L` in each path with a rolling polynomial hash. Two independent moduli (10^9+7 and 10^9+9) with base 1000003 are combined into a pair stored in a set, making an accidental collision astronomically unlikely; the code also adds 1 to each city id so a run of city 0 does not hash to the all-zero value regardless of position. The first path contributes its full set of window hashes, and each subsequent path's set is intersected into it, bailing out early the moment the intersection becomes empty. Sliding the window costs constant work per step: multiply by the base, subtract the outgoing digit times `BASE^L`, add the incoming digit, all in both moduli.

`exists(0)` is unconditionally true and a path shorter than `L` forces an immediate false, so the binary search bounds stay consistent. The `common` set never exceeds the first path's window count, and per-path sets are rebuilt and discarded, keeping memory proportional to the total input size.

**Complexity:** `O(S log L)` time (`S` = total length of all paths, `L` = shortest path length), `O(S)` space.
