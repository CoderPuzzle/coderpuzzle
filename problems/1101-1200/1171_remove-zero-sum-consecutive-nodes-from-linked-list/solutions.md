# Solutions — Remove Zero Sum Consecutive Nodes from Linked List

## Prefix Sum Hash Map with Restart

A consecutive run of nodes sums to zero precisely when the running prefix sum repeats: if the sum after node `j` equals the sum after node `i`, the values between them cancel. So one scan with a map from prefix sum to index finds every zero-sum stretch. Removing one stretch can expose another (a stretch spanning the removal), so after each removal the scan restarts from the beginning on the shortened list; each pass deletes at least one node, guaranteeing termination.

The linked list is first flattened into a value array, which makes slicing and rescanning trivial. Each pass seeds `prefix_to_index = {0: -1}` (the empty prefix before the first node) and walks the array accumulating `prefix`. On the first repeat — current index `i`, earlier index `j` — the slice `values[j+1..i]` is dropped via `values[:j+1] + values[i+1:]` and the pass ends with `restart = True`. A pass that completes with no repeat leaves the list fixed. Finally the surviving values are rebuilt into a fresh chain behind a dummy head, so the returned list contains no stale nodes from removed stretches.

The seeded zero entry handles stretches starting at the very first node, and single nodes valued 0 are caught as the case `j = i - 1`. With at most 1000 nodes, the worst case — one node removed per pass — is at most a quadratic number of array steps, comfortably fast. Either valid answer (for example `[3,1]` for `[1,2,-3,3,1]`) may fall out depending on which repeat appears first.

**Complexity:** `O(n^2)` time, `O(n)` space.
