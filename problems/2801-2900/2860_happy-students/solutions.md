# Solutions — Happy Students

## Sort, then test every group size

Only the group's size k can vary freely: once the size is fixed, the two
happiness rules pin down who may be selected, because a student with
nums[i] < k can only ever be selected (leaving them out breaks their rule)
and a student with nums[i] > k can only stay out. Values equal to k satisfy
neither rule, so they poison size k entirely. That leaves the selection of
size k feasible exactly when there are at least k students below k to fill
it and none left over below k after filling — i.e. when precisely k values
are strictly less than k and no value equals k.

Sorting nums makes both probes O(1) per candidate: with ascending values,
values[k - 1] < k says the first k elements are all below k (so at least k
candidates exist) while values[k] > k says nothing equals k or sits between,
which together force "exactly k below k". Scanning k from 0 to n counts one
way per passing size; k = 0 passes just when no value is zero, and k = n
always passes because the constraint nums[i] < n rules out an element on or
past n. The answer is at most n + 1 <= 100001, so plain 32-bit arithmetic
suffices everywhere.

**Complexity:** `O(n log n)` time, `O(n)` space — for the sorted copy;
an in-place sort plus the counting loop keeps the extra space to the sort's
own stack.
