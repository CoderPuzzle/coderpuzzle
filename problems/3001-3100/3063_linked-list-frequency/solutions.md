# Solutions — Linked List Frequency

## Count occurrences with a hash map

Traverse the list once, tallying how many times each value occurs in a hash map and recording each value the first time it is seen. A second walk over the recorded first-occurrence order emits one node per distinct value carrying its count, building the result list in the required order.

**Complexity:** `O(n)` time and `O(k)` auxiliary space for the map and the result.
