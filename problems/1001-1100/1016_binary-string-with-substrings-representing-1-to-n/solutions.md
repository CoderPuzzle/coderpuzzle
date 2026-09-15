# Solutions — Binary String With Substrings Representing 1 To N

## Check every binary representation directly

The hint bounds the work: `n <= 10^9` fits in 30 bits, so every integer
from `1` to `n` has a binary representation no longer than 30 characters,
and `s` itself is at most 1000 characters. Checking each `i` from `1` to
`n` by converting it to its binary string and searching for that string
as a contiguous substring of `s` is directly affordable — the substring
search per `i` costs at most `O(|s| * 30)`, and any single missing `i`
lets the search return `false` immediately.

`i`'s binary form is produced without a leading zero (`1` decimal is
`"1"`, `2` is `"10"`, and so on), matching how the problem defines
"binary representation". If every `i` in `[1, n]` is found, all
requirements are satisfied and the answer is `true`.

**Complexity:** `O(n * |s|)` time, `O(1)` extra space (beyond the O(log n)
binary string built per query).
