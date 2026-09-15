# Find in Mountain Array

## Description

This is an **interactive** problem.

An array is a **mountain array** if and only if its length is at least 3 and
there is some index `i` with `0 < i < length - 1` such that the values
strictly increase up to `i` and strictly decrease after it. You are given
such an array, but you cannot read it directly — only through the
`MountainArray` object the judge hands to your method:

- `get(index)` — returns the element of the hidden array at `index`
  (0-indexed).
- `length()` — returns the length of the hidden array.

Return the **minimum index** at which the hidden array holds `target`, or
`-1` if `target` never occurs. The target value is passed to your method
alongside the array.

Making more than **100 calls to `get`** is judged wrong (the oracle's
budget; `length()` is free), so a linear scan is not an option.

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only. The
signature is `findInMountainArray(mountainArr, target)`.

### Example 1

```text
Input: mountainArr = [1,2,3,4,5,3,1], target = 3
Output: 2
Explanation: 3 exists at index 2 (on the ascending slope) and index 5 (on
the descending slope); the minimum index is 2.
```

### Example 2

```text
Input: mountainArr = [0,1,2,4,2,1], target = 3
Output: -1
Explanation: 3 does not occur in the array.
```

### Constraints

- `3 <= mountainArr.length() <= 10⁴`
- `0 <= target <= 10⁹`
- `0 <= mountainArr.get(index) <= 10⁹`
- The hidden array is a mountain array (strictly increasing, then strictly
  decreasing).
- At most 100 calls to `get`.

## Hints

### Hint 1

Comparing `get(mid)` with `get(mid + 1)` tells you which side of the peak
`mid` is on: still rising (`get(mid) < get(mid + 1)`) or already falling. A
binary search on that predicate lands on the peak with about `2 · log n`
calls.

### Hint 2

Left of the peak the array is an ordinary ascending sorted array, and right
of it an ordinary descending one — each admits a classic binary search for
`target`.

### Hint 3

Search the ascending slope first and return immediately on a hit — any index
found there is smaller than every index on the other slope, which is exactly
the "minimum index" requirement. Only if that fails, search the descending
slope. Three logarithmic searches total about `4 · log n` calls, far under
the 100-call budget.
