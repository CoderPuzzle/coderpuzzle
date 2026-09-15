# Solutions — Longest Uncommon Subsequence I

## One equality check, two cases

The definition invites subsequence machinery — enumerate candidates and
test each against both inputs — but the answer is decided by a single
comparison. When `a` and `b` are identical, every subsequence of `a` is
trivially a subsequence of `b` and vice versa: the two strings carry exactly
the same subsequence sets, so no string is a subsequence of exactly one of
them, and the answer is `-1`. That is Example 3's situation.

When the strings differ, the longer one is itself the witness. Every string
is a subsequence of itself, and a string of length `k` can only be a
subsequence of a string at least `k` long — so the longer of `a` and `b`
(either one, when the lengths tie, since an equal-length subsequence of a
string must be the string itself) is a subsequence of exactly one input.
Examples 1 and 2 are precisely this: `"aba"` answers against `"cdc"`, and
`"aaa"` against `"bbb"`, both returning 3.

Nothing longer exists, because every uncommon subsequence is by definition a
subsequence of one of the inputs, so its length is capped at
`max(len(a), len(b))` — a bound the witness already attains. The method
reduces to returning -1 when `a == b`, and the longer length otherwise.

**Complexity:** `O(min(n, m))` time, `O(1)` space.
