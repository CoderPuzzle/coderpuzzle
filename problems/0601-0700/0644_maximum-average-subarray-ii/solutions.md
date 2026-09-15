# Solutions — Maximum Average Subarray II

## Exact Per-Length Prefix Sums

Rather than binary-searching the maximum average (the usual floating-point treatment), this solution computes it exactly. For a subarray of a given length, the average is a sum divided by the length, and prefix sums expose the best sum of every exact length in one pass: `max(map(sub, prefix[L:], prefix))` subtracts each prefix from the prefix `L` steps ahead, producing all window sums of length exactly `L`.

The scan walks every candidate length from `k` up to `n`, tracking the best (sum, length) pair seen. Comparing averages across different lengths is the delicate part, and it is done with exact integer arithmetic: `s1/L1 > s2/L2` is tested by cross-multiplication, `s1 * L2 > s2 * L1`, which is valid because both lengths are positive. Since prefix sums over inputs bounded by 10^4 in absolute value stay well within exact integer range, no rounding error can accumulate; a single floating-point division happens at the very end, comfortably within the 10^-5 tolerance.

Why trying every length is safe and complete: for each length the pass finds the true maximum sum, and keeping the best ratio over all lengths explores exactly the set of candidates the problem allows (any subarray of length at least `k`). The nested structure — one sliding-max pass per length — is quadratic in the number of eligible lengths, which is fine for `n` up to 10^4 since each inner pass runs at C speed inside `map`.

The prefix array is the only auxiliary storage, and the initial candidate for length `k` seeds the loop before longer lengths are considered.

**Complexity:** `O((n - k + 1)^2)` time, `O(n)` space.
