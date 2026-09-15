# Solutions — Ugly Number

## Divide out the allowed primes

The definition asks exactly one question: after every factor 2, 3, and 5 is divided out, does 1 remain? Unique factorization makes the order of the divisions irrelevant — a number divisible by 6 surrenders the same primes whether 2 or 3 is taken first, and no allowed division can ever remove or create a prime outside the set. So three division loops, one per allowed prime, strip everything the definition permits, and the residue that survives carries the whole answer: it is 1 exactly when nothing but allowed primes was ever present.

The `n <= 0` guard handles the rest of the wire domain. Ugliness is a property of positive integers — `1` qualifies vacuously because it has no prime factors at all, while `0` and every negative down to `-2³¹` fail the "positive" requirement before any arithmetic happens. Rejecting them up front also keeps the loops clean: each inner division shrinks `n` by at least a factor of 2, so at most about 31 divisions run in total even at the ceiling.

Concretely, `6` divides down `6 → 3 → 1` and is ugly; `14` divides down `14 → 7` and stops, since no allowed prime divides 7, so the residue 7 names the intruding factor. For `1` no loop body runs at all and the residue is already 1. The extremes behave the same way: `2³⁰`, `3¹⁹`, and `5¹³` strip fully to 1, the largest 5-smooth value `2⁵ · 3¹³ · 5³ = 2125764000` just under the `2³¹ - 1` cap does too, while `2147483647` is itself prime and is left standing as its own residue.

**Complexity:** `O(log n)` time, `O(1)` space.
