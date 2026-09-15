# Find the Index of the Large Integer

## Description

This is an **interactive** problem.

There is an integer array `arr` where every entry holds the same value
except for one entry, which is strictly larger than all the others.
Return the index of that larger entry.

The array itself is off limits — your only access is the `ArrayReader`
object handed to your method:

- `compareSub(l, r, x, y)` — compares the sum of the sub-array
  `arr[l..r]` with the sum of the sub-array `arr[x..y]`, where
  `0 <= l, r, x, y < length()` and `l <= r`, `x <= y`. It returns `1` if
  the first sum is larger, `-1` if it is smaller, and `0` if the two
  sums are equal.
- `length()` — the size of `arr`.

Calling `compareSub` more than **20 times** is judged wrong; `length()`
costs nothing.

**Note (CoderPuzzle):** the signature is `getIndex(reader)`.

### Example 1

```text
Input: arr = [7, 7, 7, 7, 10, 7, 7, 7]
Output: 4
Explanation: Comparing arr[0..0] with arr[1..1] returns 0, so neither
holds the large entry; comparing arr[2..2] with arr[3..3] returns 0 for
the same reason; comparing arr[4..4] with arr[5..5] returns 1, which
pins the large entry at index 4 — all in 3 calls to compareSub.
```

### Example 2

```text
Input: arr = [6, 6, 12]
Output: 2
```

### Constraints

- `2 <= arr.length <= 5 × 10⁵`
- `1 <= arr[i] <= 100`
- Every entry of `arr` is equal except for one entry, which is strictly
  larger than the rest.
- No more than 20 calls to `compareSub`.

### Follow up

- What if two entries in `arr` are larger than all the others?
- What if one entry is larger than the rest and a different entry is
  smaller than the rest?

## Hints

### Hint 1

Binary search over the array: at each step, exclude the half that
cannot hold the large entry.

### Hint 2

Keep shrinking the search range until only one or two entries remain,
where the large entry is immediately identifiable.

### Hint 3

`compareSub` only accepts two sub-arrays of equal length, so an odd-length
range cannot be split down the middle in one comparison. Peel off one
element first — compare the two equal-length halves that remain on either
side of it — and let a tied comparison mean the peeled element itself is
the large one.
