# Solutions — Sum of All Odd Length Subarrays

Neither approach enumerates windows; both regroup the grand total before
summing it. The telescoping route rewrites each window's sum as a
difference of two prefix entries and asks, entry by entry, how often each
prefix value appears with a plus and how often with a minus — two
floor-divisible counts whose difference weights one linear pass over the
prefix array. The contribution route never builds that array: each
element is multiplied by the number of odd windows that contain it, a
count read straight off its position, which drops the extra storage and
finishes in constant space.

## Telescoping prefix sums

Every window sum collapses to two prefix entries: with `P[0] = 0` and
`P[k]` the sum of the first `k` elements, the window `[l, r]` contributes
`P[r + 1] - P[l]`, and the grand total is the sum of those differences
over all odd windows. Summing window by window is quadratic, but the
differences telescope — collect the coefficient of each `P[k]` instead.
It gains a plus for every odd window ending at index `k - 1`: the start
`l` may be any index in `[0, k - 1]` with the same parity as `k - 1`
(length odd means `l` and `r` share parity), and that is
`floor((k + 1) / 2)` choices. It loses one for every odd window starting
at index `k`: the end `r` may be any index in `[k, n - 1]` with the same
parity as `k`, which is `floor((n - k + 1) / 2)` choices — zero when
`k = n`, so the same expression covers the last entry too. The total is
therefore one weighted pass: add `coef * P[k]` for every `k` from `1` to
`n`, with `coef` that difference of two floor-divisions.

The coefficients can run negative near the left edge — an early prefix
entry sits at the start of more odd windows than it closes — and the
signed accumulation absorbs that. For `arr = [2,7,5]` the prefix array
is `[0, 2, 9, 14]` and the coefficients are `0, 0, 2`, so the whole
answer comes from one term, `2 * 14 = 28`.

**Complexity:** `O(n)` time, `O(n)` space.

## Per-index contribution counting

Instead of enumerating subarrays, sum by contribution: for each index `i`,
count how many odd-length subarrays include `arr[i]`, then add
`arr[i]` times that count to the answer. A subarray containing `i` is
fixed by choosing its start `l` in `[0, i]` and its end `r` in
`[i, n - 1]`, so there are `left = i + 1` choices for `l` and
`right = n - i` choices for `r`, giving `left * right` subarrays through
`i` in total. Its length `r - l + 1` is odd exactly when `r - l` is even,
i.e. when `l` and `r` have the same parity, and — because `l` always
ranges from `0` — exactly half of the `left * right` pairs land on
matching parity when the product is even, and one more than half when it
is odd (the empty-prefix start `l = 0` tips the balance). That count is
`ceil(left * right / 2)`, computed without floating point as
`(left * right + 1) / 2` using integer division.

The algorithm walks the array once, computing `left`, `right`, and the
odd-subarray count for each index, and accumulates `arr[i]` times that
count. No extra array or running sum is needed beyond the accumulator, so
the whole computation is a single pass with constant auxiliary state —
`arr = [1,2]` gives `left*right` of `1*2=2` and `2*1=2` for its two
indices, each contributing `ceil(2/2) = 1` odd subarray (itself), for a
total of `1 + 2 = 3`.

**Complexity:** `O(n)` time, `O(1)` space.
