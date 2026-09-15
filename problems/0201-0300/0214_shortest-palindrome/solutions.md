# Solutions — Shortest Palindrome

## KMP Prefix Function

Since characters may only be prepended, the answer is `s` with the reverse of its non-palindromic tail stuck on the front — equivalently, find the longest prefix of `s` that is itself a palindrome and mirror only the characters after it. Everything the prefix covers already reads the same from both ends, so it needs no repair, and any shorter choice would prepend more than necessary.

The longest palindromic prefix is found with a KMP trick: a prefix of `s` is a palindrome exactly when it equals a suffix of `reversed(s)`, so the problem becomes finding the longest string that is both a prefix and a suffix of `combined = s + "#" + rev`. Computing the standard KMP prefix function over `combined` yields, in its last entry, the length of the longest proper border; the `#` separator (a character absent from `s`) guarantees that border can never stretch across the join and exceed `len(s)`, so it is exactly the palindromic prefix length.

The prefix-function loop maintains `j`, the border length of the previous position, shrinking it through `lps[j-1]` on mismatch and extending by one on match, so the whole scan is linear despite the inner `while`. The result is `rev[: len(s) - pal_len] + s`: the tail of `s` beyond the palindromic prefix, reversed, prepended. An empty string returns itself, and an input that is already a palindrome prepends nothing.

**Complexity:** `O(n)` time, `O(n)` space.
