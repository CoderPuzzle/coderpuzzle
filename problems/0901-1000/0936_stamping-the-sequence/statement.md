# Stamping The Sequence

## Description

You are given two strings `stamp` and `target`. Initially, there is a string
`s` of length `target.length` with all `s[i] == '?'`.

In one turn, you can place `stamp` over `s` and replace every letter in the
covered span with the corresponding letter from `stamp`.

For example, if `stamp = "abc"` and `target = "abcba"`, then `s` is `"?????"`
initially. In one turn you can:

- place `stamp` at index 0 of `s` to obtain `"abc??"`,
- place `stamp` at index 1 of `s` to obtain `"?abc?"`, or
- place `stamp` at index 2 of `s` to obtain `"??abc"`.

Note that `stamp` must be fully contained within the boundaries of `s` in
order to stamp — you cannot place `stamp` at index 3 of `s`.

We want to convert `s` to `target` using at most `10 * target.length` turns.

Return an array of the index of the left-most letter being stamped at each
turn. If we cannot obtain `target` from `s` within `10 * target.length`
turns, return an empty array.

Many stamping sequences can produce the same `target` — the original judge
accepts any of them. For a deterministic answer, the expected output is
pinned to the canonical reverse construction: start from `s = target` and
repeat the following until `s` holds only `'?'` characters. Scan indices `i`
from `0` through `target.length - stamp.length`; index `i` is erasable when
every character in its window equals its `stamp` counterpart or is already
`'?'`, and at least one character in the window is still a letter. Take the
leftmost erasable `i`, overwrite its whole window with `'?'`, and record
`i`. If a full scan finds no erasable index while `s` still holds a letter,
no stamping sequence exists and the answer is the empty array. Otherwise
return the recorded indices in reverse order — that reversal is the actual
stamping order, one entry per turn.

### Example 1

```text
Input: stamp = "abc", target = "ababc"
Output: [0,2]
Explanation: Initially s = "?????".
- Place stamp at index 0 to get "abc??".
- Place stamp at index 2 to get "ababc".
Other sequences stamp this target too — [1,0,2] among them — but the pinned
construction produces exactly this output.
```

### Example 2

```text
Input: stamp = "abca", target = "aabcaca"
Output: [3,0,1]
Explanation: Initially s = "???????".
- Place stamp at index 3 to get "???abca".
- Place stamp at index 0 to get "abcabca".
- Place stamp at index 1 to get "aabcaca".
```

### Constraints

- `1 <= stamp.length <= target.length <= 1000`
- `stamp` and `target` consist of lowercase English letters.
