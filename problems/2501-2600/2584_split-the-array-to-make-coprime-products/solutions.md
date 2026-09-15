# Solutions — Split the Array to Make Coprime Products

## Last Prime-Factor Occurrences

The two products can never be formed directly: with `n` up to `10⁴`
elements of up to `10⁶`, each side reaches thousands of digits, so
coprimality is decided structurally instead. `gcd(P, Q) == 1` holds
exactly when `P` and `Q` share **no prime divisor**, and every prime
divisor of either side comes from some element's own factorization. So
splitting at index `i` works precisely when no prime occurs both at or
before `i` and after `i` — equivalently, when the boundary `i` does not
fall inside the occurrence span `[first(p), last(p)]` of any prime `p`
present in the array.

A smallest-prime-factor sieve up to `max(nums)` factorizes every element
in `O(log nums[i])`. One pass records, per distinct prime, its first and
last element index; the spans shorter than that (`first == last`) cannot
straddle anything and drop out naturally by yielding an empty interval
`[first, last - 1]`. Marking each surviving interval onto a difference
array over boundary positions turns "smallest unblocked `i` in
`[0, n - 2]`" into one prefix-sum scan: the first boundary still carrying
zero weight is the answer, and `-1` otherwise. An array whose every
boundary is straddled — like `[3, 2, 5, 3]`, where prime 3 occurs at both
ends — returns `-1`; single-occurrence primes and the value `1`
contribute nothing at all, which is why `[2, 2, 3]` can still split at
`i = 1`.

**Complexity:** `O(V log log V + n log V)` time for the sieve, sweep,
and scan (`V = max(nums)`), `O(V)` space for the sieve plus maps linear
in the number of distinct primes.
