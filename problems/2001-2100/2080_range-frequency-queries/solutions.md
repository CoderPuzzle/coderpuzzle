# Solutions — Range Frequency Queries

## Sorted occurrence indices

During construction, append every array index to a list keyed by its value. Scanning the array from left to right leaves each occurrence list sorted without another sorting pass.

For a query, binary-search the selected value's list for the first index at least `left` and the first index greater than `right`. Their position difference is exactly the number of occurrences inside the inclusive range; a missing value uses an empty list and returns zero.

**Complexity:** `O(n)` construction time and space; each query takes `O(log f)` time and `O(1)` extra space, where `f` is the queried value's total frequency.
