# Solutions — Check If It Is a Good Array

## Bézout: the reachable sums are exactly the multiples of the gcd

Every reachable sum is a sum `a₁x₁ + a₂x₂ + …` of integer multiples of the
chosen elements, and the set of all such sums — over any subset, which is the
same as allowing a coefficient of zero — is precisely the set of multiples of
`g = gcd(a₁, …, aₙ)` (Bézout's identity). A sum of 1 is reachable exactly
when 1 is a multiple of `g`, i.e. when the overall gcd is 1.

So the check is a running gcd over the array, stopping early the moment it
hits 1 — a 1 anywhere in the array answers immediately, and an array whose
gcd has already stabilized above 1 can be abandoned. Note the one-element
case: `[1]` is good, `[k]` for `k > 1` is not, exactly as the identity
predicts.

**Complexity:** `O(n log(max))` time, `O(1)` space.
