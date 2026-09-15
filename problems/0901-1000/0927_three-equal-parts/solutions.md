# Solutions — Three Equal Parts

## Count the 1s and align both cuts to the last third

Equal parts repeat one binary value, so each part holds the same number of
1s and the array's total count of 1s must be divisible by 3 — otherwise no
split can exist. When the array is all zeros every split works, since all
three parts read as 0, and the smallest pair `[0, 2]` is the answer.
Otherwise each part holds `k = total / 3` ones, and the third part alone
fixes the shared value: its 1s are the final `k` ones of the array, so the
value is exactly the suffix that starts at the `(2k + 1)`-th 1 and runs to
the end. Call that suffix the pattern, and `L` the number of bits that
follow its leading 1.

Both earlier parts must show this same pattern after their own leading
zeros, and each begins at a known position: the first part's leading 1 is
the array's first 1, the second part's is the `(k + 1)`-th. The whole
question reduces to comparing, bit for bit, the `L` bits that follow each
of those anchors against the pattern. Any disagreement — a trailing zero
the earlier parts cannot produce, an extra 1 where the pattern has a 0 —
means no split works and the answer is `[-1, -1]`.

When both windows match, the cut points are forced: the first part ends at
`first + L`, so `i = first + L`, and the second part ends at
`second + L`, so `j = second + L + 1`. With `k >= 1` the three anchors sit
strictly in order, which leaves room for three non-empty parts on its own.
The scan reads each element a constant number of times and stores only a
few counters.

**Complexity:** `O(n)` time, `O(1)` space.
