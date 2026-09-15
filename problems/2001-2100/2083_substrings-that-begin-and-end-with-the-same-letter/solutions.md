# Solutions — Substrings That Begin and End With the Same Letter

## Count each ending character's contribution

When a character is encountered for the `k`th time, it can end one valid substring starting at each of its `k` occurrences so far. Add `k` to the answer, then continue scanning the string.

Only 26 counters are needed. The answer uses a 64-bit integer in fixed-width languages because a length-100,000 string of one repeated character has more than two billion valid substrings.

**Complexity:** `O(n)` time and `O(1)` space.
