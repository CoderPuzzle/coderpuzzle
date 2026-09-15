# Search in a Sorted Array of Unknown Size

## Description

This is an **interactive** problem.

You have a sorted array of **unique** elements, but you do not know its
length and you cannot read it directly — only through the `ArrayReader`
object the judge hands to your method:

- `get(index)` — returns the element at `index` of the hidden array, or
  `2147483647` (2³¹ − 1) if `index` is past the end of the array.

The target value is passed to your method alongside the reader. Return the
index `k` with `secret[k] == target`, or `-1` if the target is absent.

The array is strictly increasing and every real element is far below
2147483647, so the sentinel is unambiguous: reading it always means "out of
range".

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only. The
signature is `search(reader, target)`; the oracle's query budget is 10 000
calls, generous enough for any logarithmic strategy.

### Example 1

```text
Input: secret = [-1,0,3,5,9,12], target = 9
Output: 4
Explanation: 9 exists in the hidden array at index 4.
```

### Example 2

```text
Input: secret = [-1,0,3,5,9,12], target = 2
Output: -1
Explanation: 2 does not occur in the array (it would sit between the
elements at indices 1 and 2).
```

### Constraints

- `1 <= secret.length <= 10⁴`
- `-10⁴ <= secret[i], target <= 10⁴`
- `secret` is sorted in strictly increasing order.
- Every element and the target are far below the 2147483647 sentinel.

## Hints

### Hint 1

With no length to anchor a binary search, find an upper bound first: probe
`get(1)`, `get(2)`, `get(4)`, `get(8)`, … until the answer is at least
`target` (either a real element that large, or the sentinel). Doubling
reaches any index in logarithmic time.

### Hint 2

Once `get(hi) >= target` holds, the target — if present — lies somewhere in
`[0, hi]`, and the last probe that returned a value below `target` marks a
valid lower bound.

### Hint 3

Finish with an ordinary binary search for the smallest index whose value is
at least `target`, then compare that value against `target`: equal means the
index is the answer, anything else (larger value or sentinel) means `-1`.
Doubling plus the search costs about `2 · log n` calls in total.
