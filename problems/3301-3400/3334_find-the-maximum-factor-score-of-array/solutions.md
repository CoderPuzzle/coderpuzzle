# Solutions — Find the Maximum Factor Score of Array

Removing one element splits `nums` into an untouched prefix and an
untouched suffix — and GCD and LCM both fold along such splits.

## Exclusive prefix/suffix folds

Build exclusive tables: `preG[i]`/`preL[i]` fold `nums[0..i-1]`, and
`sufG[i]`/`sufL[i]` fold `nums[i..n-1]`, seeded with the neutral elements
(GCD identity 0, LCM identity 1). Dropping index `i` then costs two joins,
`gcd(preG[i], sufG[i+1])` and `lcm(preL[i], sufL[i+1])`, and the untouched
candidate `preG[n] * preL[n]` covers removing nothing; the identities make
the remove-the-only-element case fold to 0 automatically, exactly as the
statement defines the empty array.

The bounds are tiny and provable: every LCM of a sub-multiset of values
`<= 30` divides `LCM(1..30) = 2329089562800`, and the GCD is at most 30,
so any factor score is at most `6987268688400` — beyond 32-bit range,
hence 64-bit accumulators in the typed languages, but under `2^53`, so
JavaScript's Number is exact throughout (the LCM join divides first,
`a / gcd(a, b) * b`, and that division is exact).

**Complexity:** `O(n)` time, `O(n)` space.
