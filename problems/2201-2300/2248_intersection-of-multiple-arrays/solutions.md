# Solutions — Intersection of Multiple Arrays

## Count per value, keep values seen in every array

The statement guarantees that every `nums[i]` holds distinct positive
integers, so a value appears in _exactly_ `nums.length` arrays if and only if
it is present in every array. Counting how many arrays contain each value
therefore reduces the intersection to a single predicate: keep the values
whose count equals the total number of arrays, then sort them ascending for
the required output order.

A single pass over every array's elements builds the counts in a hash map
(`Counter.update` in Python, a `Map`/`unordered_map`/`HashMap` elsewhere).
The values are bounded by `1 <= nums[i][j] <= 1000`, so the map never grows
past 1000 entries regardless of how long the flattened input is, keeping both
the bookkeeping and the final sort tiny. When no value reaches the required
count, the result is the empty list, as in the crawl example with the two
disjoint arrays.

The output is accumulated by scanning the map for entries whose count equals
`nums.length` and then sorting — the sort is mandatory because the map order
is arbitrary and the statement demands ascending order. The bound on the
value range also means the largest possible answer has at most 1000 elements,
so even the output stays comfortably small.

**Complexity:** `O(n + m log m)` time, `O(m)` space, where `n` is the total
number of elements across all arrays and `m <= 1000` is the number of
distinct values.
