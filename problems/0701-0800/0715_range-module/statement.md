# Range Module

## Description

A Range Module is a module that tracks ranges of numbers. Design a data
structure to track the ranges represented as **half-open intervals** and
query about them.

A half-open interval `[left, right)` denotes all the real numbers `x` where
`left <= x < right`.

Implement the `RangeModule` class:

- `RangeModule()` Initializes the object of the data structure.
- `void addRange(int left, int right)` Adds the half-open interval
  `[left, right)`, tracking every real number in that interval. Adding an
  interval that partially overlaps with currently tracked numbers should add
  any numbers in the interval `[left, right)` that are not already tracked.
- `boolean queryRange(int left, int right)` Returns `true` if every real
  number in the interval `[left, right)` is currently being tracked, and
  `false` otherwise.
- `void removeRange(int left, int right)` Stops tracking every real number
  currently being tracked in the half-open interval `[left, right)`.

### Example 1

```text
Input:
["RangeModule", "addRange", "removeRange", "queryRange", "queryRange", "queryRange"]
[[], [10, 20], [14, 16], [10, 14], [13, 15], [16, 17]]
Output: [null, null, null, true, false, true]
Explanation:
RangeModule rangeModule = new RangeModule();
rangeModule.addRange(10, 20);
rangeModule.removeRange(14, 16);
rangeModule.queryRange(10, 14); // return True, (Every number in [10, 14) is being tracked)
rangeModule.queryRange(13, 15); // return False, (Numbers like 14, 14.03, 14.17 in [13, 15) are not being tracked)
rangeModule.queryRange(16, 17); // return True, (The number 16 in [16, 17) is still being tracked, despite the remove operation)
```

### Constraints

- `1 <= left < right <= 10⁹`
- At most `10⁴` calls will be made to `addRange`, `queryRange`, and
  `removeRange`.

## Hints

### Hint 1

Tracking arbitrary real ranges point-by-point is hopeless — but the tracked
set is always a union of **disjoint intervals**, because adds merge with what
they touch and removes carve holes. Keep exactly that canonical form: a list
of disjoint `[l, r)` intervals sorted by `l`.

### Hint 2

An `addRange` or `removeRange` only disturbs the intervals that overlap it —
a contiguous run in the sorted list, found by binary search on the starts.
An add splices the whole run plus the new interval into their union; a remove
clips each overlapping interval at the carve boundaries and drops the ones
that vanish.

### Hint 3

A `queryRange` `[l, r)` is fully tracked exactly when a **single** stored
interval contains it: find the last interval starting at or before `l` and
test whether it reaches `r`. Two adjacent intervals like `[1, 3)` and `[3, 5)`
can never both be needed — the canonical form would have merged them at
insertion time.

### Follow-up

`addRange` and `removeRange` cost time linear in the number of stored
intervals (list splicing), while `queryRange` is logarithmic. When is that
trade worth it — and what would a balanced tree keyed by interval start buy?
