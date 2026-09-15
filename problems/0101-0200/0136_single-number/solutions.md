# Solutions — Single Number

Two one-pass scans; both find the value that appears once, differing in
whether duplicates are cancelled bitwise or tracked in a hash set.

## XOR

XOR has exactly the properties this problem needs: `x ^ x = 0` makes an element annihilate itself, `x ^ 0 = x` lets survivors pass through unchanged, and the operation is commutative and associative, so the grouping order is irrelevant. Folding every element into a running result therefore pairs up the duplicates — each pair cancels to zero — and whatever is left in the accumulator at the end is the one unpaired value.

The code is literally that fold: start the result at 0 and XOR each element in turn. No counts, no seen-set, no sorting — which is precisely what keeps the extra space constant while the single scan keeps the time linear.

Negative numbers need no special handling, since XOR on Python integers is bitwise two's-complement semantics and the full fold reconstructs the missing value regardless of sign.

**Complexity:** `O(n)` time, `O(1)` space.

## Hash

Track membership instead of cancelling bits: walk the array with a parity hash set, adding a value on its first sight and removing it on its second. An element that appears twice is inserted and then erased by its own twin, so after the scan the set contains exactly the values seen an odd number of times — on a well-formed input, just the unpaired one.

The reduction back to an answer folds the survivors with XOR, and that fold is not a convenience: even-count values cancel in any XOR fold anyway, so folding the odd-count survivors is algebraically identical to folding the entire array. The hash bookkeeping and the bit fold therefore agree on every input, not merely the ones honoring the pairing constraint.

Each step is one average-`O(1)` set operation, so the whole pass stays linear, but the set can hold up to about half the array at once (all distinct first sights before their twins arrive), which is the price paid for bookkeeping over bit tricks. The remove-then-insert idiom (`remove` reports whether the value was there) doubles as both the membership test and the update in a single hash lookup per element.

**Complexity:** `O(n)` time, `O(n)` space.
