# Solutions — Range Product Queries of Powers

## Set-Bit Products and Modular Prefixes

The minimum number of powers of two summing to `n` is achieved by exactly
one multiset — the set bits of `n` (hint 1). Greedy from the largest power
down: each set bit is forced, since removing any of them leaves a gap no
combination of smaller powers can fill without using more terms, and
binary representation is the unique minimal such sum. So `powers` is just
the sorted list `1 << b` for every set bit `b`, at most 30 elements for
`n <= 10⁹`.

With the array built, each query multiplies a contiguous range. Prefix
products turn every range into two lookups:
`product(lo..hi) = pref[hi+1] * inv(pref[lo])`, where the inverse comes
from Fermat's little theorem — the modulus `10⁹ + 7` is prime, so
`inv(x) = x^(MOD-2)` under fast exponentiation. Dividing prefix products
this way replaces hint 2's brute-force per-query loop with O(1) work after
an O(30) build; with 10⁵ queries that headroom matters, though even the
brute force stays inside the limits given at most 30 factors per range.

Arithmetic must respect the modulus everywhere: raw products reach
`(2³⁰)^30 ≈ 2⁹⁰⁰`, far beyond 64-bit range, so compiled languages reduce
after every multiplication in `long long`/`long`/`i64` (each factor below
MOD keeps partial products under `2⁶⁰`). JavaScript's Number cannot carry
even one modular product exactly past `2⁵³`, so its port runs on BigInt;
Python integers are exact natively.

**Complexity:** `O(30 + q)` time, `O(30)` space beyond the output.
