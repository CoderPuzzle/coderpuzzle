# Solutions

Every approach counts frequencies first; the greedy that spends removals
on the least frequent values is provably optimal, since eliminating a
value entirely always costs at most as many removals as any other value.
The presented solution sorts the frequency list once. A counting sort
over frequencies (bounded by array length) or a heap would give the same
asymptotics here, so the plain sort is the one we keep.

## Sort Frequencies, Spend Removals Cheapest First

Count each distinct value with a hash map and collect the counts into a
list sorted ascending. Walk the list spending `k` on whole values while
it lasts: whenever `k` covers the current count, that value disappears
entirely and one unique count goes away; otherwise stop — this and every
later value survive partially. The remaining uneliminated entries are the
answer.

**Complexity:** `O(n log n)` time (the frequency sort dominates), `O(n)`
space for the map and count list.
