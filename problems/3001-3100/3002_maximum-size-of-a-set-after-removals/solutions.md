# Solutions — Maximum Size of a Set After Removals

## Greedy Slot Counting

Removing `n / 2` elements from each array is the same as keeping `n / 2`
elements from each, so the real decision is which `n` occurrences survive. A
survivor only enlarges `s` when its value has not been inserted before, which
sorts every value into one of three groups: values unique to `nums1`, values
unique to `nums2`, and values common to both arrays.

The greedy spends each array's `n / 2` slots on its own unique values first:
`a = min(n / 2, |s1 - s2|)` of them fit into the first array's budget and
`b = min(n / 2, |s2 - s1|)` into the second's. That leaves
`n - a - b` slots across both arrays, and no unique value remains to claim
them, so every further gain must come from a common value — and each distinct
common value can become a new set element at most once, whichever array
inserts it, because both arrays can reach any common value. The answer is
therefore `a + b + min(|s1 & s2|, n - a - b)`. Note why the tempting shortcut
`min(|s1|, n / 2) + min(|s2|, n / 2)` overcounts: it credits a common value
to both sides even though inserting it twice still yields one set element,
and once the shared values saturate that double count exceeds the number of
distinct values that exist.

**Complexity:** `O(n)` time to build the two sets and scan them, `O(n)` space
for the sets.
