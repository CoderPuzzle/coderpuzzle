# Guess the Majority in a Hidden Array

## Description

This is an **interactive** problem.

Somewhere the judge holds a binary array `nums`, where every entry is
`0` or `1`. You never see it directly — your only access is the
`ArrayReader` object handed to your method:

- `query(a, b, c, d)` — compares the four entries at those indices,
  where `0 <= a < b < c < d < length()`, and reports how they split:
    - `4` if all four entries hold the same value.
    - `2` if three entries share one value and the fourth holds the
      other.
    - `0` if the four entries split evenly, two and two.
- `length()` — the size of `nums`.

You may call `query` at most `2 * n` times, where `n` is `length()`.
Return any index whose value is the most frequent one in `nums`; if
`0`s and `1`s tie, return `-1`.

**Note (CoderPuzzle):** the signature is `guessMajority(reader)`; the API
arrives as the `ArrayReader` object handed to your method — call
`reader.query(a, b, c, d)` and `reader.length()` to query it.

### Example 1

```text
Input: nums = [0,0,1,0,1,1,1,1]
Output: 5
Explanation: 1 is the most frequent value, appearing five times against
three 0s. Indices 2, 4, 5, 6, and 7 all hold a 1, so any of them is
also a correct answer.
```

### Example 2

```text
Input: nums = [0,0,1,1,0]
Output: 0
Explanation: 0 is the most frequent value, appearing three times
against two 1s. Indices 0, 1, and 4 all hold a 0, so any of them is
also a correct answer.
```

### Example 3

```text
Input: nums = [1,0,1,0,1,0,1,0]
Output: -1
Explanation: 0 and 1 each appear four times — a tie.
```

### Constraints

- `5 <= nums.length <= 10^5`
- `0 <= nums[i] <= 1`
- Calling `query` more than `2 * nums.length` times is judged wrong.

### Follow up

- What is the minimum number of calls needed to find the majority
  element?

## Hints

### Hint 1

If you find two indices `id1` and `id2` with `nums[id1] == nums[id2]`,
you can infer the values of any other pair `(x, y)` from the result of
`query(id1, id2, x, y)`.
