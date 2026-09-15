# RLE Iterator

## Description

We can use run-length encoding (RLE) to encode a sequence of integers. In a
run-length encoded array of even length `encoding` (0-indexed), for all even
`i`, `encoding[i]` tells us the number of times that the non-negative integer
value `encoding[i + 1]` is repeated in the sequence.

For example, the sequence `arr = [8, 8, 8, 5, 5]` can be encoded as
`encoding = [3, 8, 2, 5]`. The arrays `[3, 8, 0, 9, 2, 5]` and
`[2, 8, 1, 8, 2, 5]` are also valid RLE encodings of `arr` — a run of length
zero contributes nothing, so several encodings can describe the same sequence.

Given a run-length encoded array, design an iterator that iterates through
it.

Implement the `RLEIterator` class:

- `RLEIterator(int[] encoding)` initializes the object with the encoded array
  `encoding`.
- `int next(int n)` exhausts the next `n` elements and returns the last
  element exhausted in this way. If there is no element left to exhaust,
  return `-1` instead.

If fewer than `n` elements remain, `next` exhausts all of them and returns
`-1`: the `n`-th exhausted element does not exist, so there is no last
exhausted element to report. Once the sequence is exhausted, every further
call returns `-1`.

### Example 1

```text
Input
["RLEIterator", "next", "next", "next", "next"]
[[[3, 8, 0, 9, 2, 5]], [2], [1], [1], [2]]
Output
[null, 8, 8, 5, -1]
Explanation
RLEIterator rLEIterator = new RLEIterator([3, 8, 0, 9, 2, 5]); // maps to the sequence [8,8,8,5,5].
rLEIterator.next(2); // exhausts 2 terms of the sequence, returning 8. The remaining sequence is now [8, 5, 5].
rLEIterator.next(1); // exhausts 1 term of the sequence, returning 8. The remaining sequence is now [5, 5].
rLEIterator.next(1); // exhausts 1 term of the sequence, returning 5. The remaining sequence is now [5].
rLEIterator.next(2); // exhausts 2 terms, returning -1. The first term exhausted was 5, but the second term
                     // did not exist. Since the last term exhausted does not exist, we return -1.
```

### Constraints

- `2 <= encoding.length <= 1000`
- `encoding.length` is even.
- `0 <= encoding[i] <= 10⁹`
- `1 <= n <= 10⁹`
- At most `1000` calls will be made to `next`.
