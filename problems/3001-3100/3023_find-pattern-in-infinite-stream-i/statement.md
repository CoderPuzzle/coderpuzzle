# Find Pattern in Infinite Stream I

## Description

This is an **interactive** problem.

You are given a binary array `pattern` and an object `stream` of class
`InfiniteStream` representing a 0-indexed infinite stream of bits, which you
can only read through one call:

- `next()` — reads a single bit (0 or 1) from the stream and returns it.
  Bits arrive in order; there is no way to rewind.

Return the **first starting index** at which the bits read from the stream
match the `pattern` exactly. The pattern is passed to your method alongside
the stream, and a match is guaranteed to begin within the recorded prefix of
bits the judge holds.

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only. The
signature is `findPattern(stream, pattern)`; the stream's budget is ample
(1 000 000 `next` calls), and reading past the recorded prefix raises an
error — a correct solution stops at the first match long before that.

### Example 1

```text
Input: stream = [1,1,1,0,1,1,1,...], pattern = [0,1]
Output: 3
Explanation: The first occurrence of [0,1] in the stream starts at index 3
(the 0 read fourth, followed by the 1 read fifth).
```

### Example 2

```text
Input: stream = [0,0,0,0,...], pattern = [0]
Output: 0
Explanation: The first bit already matches the one-bit pattern.
```

### Example 3

```text
Input: stream = [1,0,1,1,0,1,1,0,1,...], pattern = [1,1,0,1]
Output: 2
Explanation: The first occurrence of [1,1,0,1] is highlighted in the stream
[1,0,1,1,0,1,...] — it starts at index 2.
```

### Constraints

- `1 <= pattern.length <= 100`
- `pattern` consists only of 0 and 1.
- The stream consists only of 0 and 1.
- A match starts within the first 10⁵ bits of the stream.

## Hints

### Hint 1

You cannot re-read old bits, so the last `pattern.length` bits must be kept
as you go: a sliding window that drops the oldest bit whenever a new one
arrives.

### Hint 2

After reading bit number `t` (1-indexed), a window of `m` bits ending at
`t` starts at index `t − m`; comparing the window with the pattern after
every read detects each candidate match exactly once.

### Hint 3

Pack the window into a machine integer: shift left, OR in the new bit, mask
to `m` bits (in Python), or keep a small circular buffer (Java) — either
way each bit costs O(1) amortized work and at most `m` comparisons, which
is linear passes over the prefix and far under the budget.
