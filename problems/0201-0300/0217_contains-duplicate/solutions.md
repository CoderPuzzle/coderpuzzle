# Solutions — Contains Duplicate

Two ways of catching the same collision. The sort gives up on memory
entirely and instead rearranges the array until equal values are forced to
stand next to each other, where a neighbour-to-neighbour scan catches them;
the hash set keeps a running memory of every value that has gone by and
stops the instant one shows up again — log-linear work with comparisons
alone instead of linear work with a hash table.

## Sort Scan

Duplicates hide only because equal values sit far apart. Sorting the
array dissolves that obstacle: it draws equal values together, so the
question "does any value occur twice?" collapses into "do any two
neighbours match?" — a question n-1 comparisons can answer, each looking
one gap to the left.

The sweep itself is a plain scan over a sorted copy. A value's second
copy has nowhere to stand except directly beside its first, so the first
equal neighbour is proof of a repeat, and a clean finish — every gap
holding two different values — is proof that all of them were distinct.
On `[8,3,-1,3]`, sorting yields `[-1,3,3,8]` and the matching `3,3` pair
surfaces immediately.

What the sort costs is the early exit the set enjoys: even when a repeat
sits at the very front of the input, the whole array is sorted before a
single comparison happens. In exchange the scan needs no hashing at all —
comparisons alone do the work, and the only auxiliary memory is the sorted
copy itself. (The Rust port takes the array by value and sorts it in
place, so for it the extra memory is none.)

**Complexity:** `O(n log n)` time, `O(n)` space for the sorted copy.

## Hash Set Membership

The question "does any value appear twice?" only needs memory of the values already visited. A single left-to-right pass keeps every seen value in a hash set and checks each new element for membership _before_ inserting it — the moment an element is already present, the second occurrence has been found and the scan stops early with true.

Because the check precedes the insert, a duplicate is caught exactly when its second copy arrives, never falsely on the first. If the loop finishes without a hit, every element was distinct at insertion time and the answer is false. Hash set lookups and inserts are average O(1), so the whole pass is linear even for the full 10^5-element range.

The early return means the best case (a duplicate near the front) touches only a few elements, while the worst case stores the entire array in the set before concluding all values are distinct.

**Complexity:** `O(n)` time, `O(n)` space.
