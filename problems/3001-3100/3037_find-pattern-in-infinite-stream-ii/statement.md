# Find Pattern in Infinite Stream II

## Description

This is an **interactive** problem.

You are given a binary array `pattern` and an object `stream` of class
`InfiniteStream` representing a 0-indexed infinite stream of bits.

The class `InfiniteStream` contains the following function:

- `next()` — reads a single bit (which is either 0 or 1) from the stream
  and returns it.

Return the first starting index where the pattern matches the bits read
from the stream. For example, if the pattern is `[1, 0]`, the first match
is the highlighted part in the stream `[0, 1, 0, 1, ...]`.

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only. The
signature is `findPattern(stream, pattern)`; the stream's budget is ample
(1 000 000 `next` calls), and reading past the recorded prefix raises an
error — a correct solution stops at the first match long before that.

### Example 1

```text
Input: stream = [1,1,1,0,1,1,1,...], pattern = [0,1]
Output: 3
Explanation: The first occurrence of the pattern [0,1] is highlighted in
the stream [1,1,1,0,1,...], which starts at index 3.
```

### Example 2

```text
Input: stream = [0,0,0,0,...], pattern = [0]
Output: 0
Explanation: The first occurrence of the pattern [0] is highlighted in
the stream [0,...], which starts at index 0.
```

### Example 3

```text
Input: stream = [1,0,1,1,0,1,1,0,1,...], pattern = [1,1,0,1]
Output: 2
Explanation: The first occurrence of the pattern [1,1,0,1] is highlighted
in the stream [1,0,1,1,0,1,...], which starts at index 2.
```

### Constraints

- `1 <= pattern.length <= 10⁴`
- `pattern` consists only of 0 and 1.
- The stream consists only of 0 and 1.
- The input is generated such that the pattern's start index exists in
  the first 10⁵ bits of the stream.

## Hints

### Hint 1

Use the KMP algorithm.
