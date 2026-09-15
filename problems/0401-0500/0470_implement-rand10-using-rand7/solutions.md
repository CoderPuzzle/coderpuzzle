# Solutions — Implement Rand10() Using Rand7()

## Rejection Sampling

A single `rand7()` draw gives seven equally likely values — no function of them can produce ten equally likely outcomes, since 7 is not divisible by 10. But two independent draws give 49 equally likely pairs, and 40 of those outcomes can be mapped onto ten values with four pairs each. The construction draws `a` and `b`, folds them into `idx = (a - 1) * 7 + b`, which is uniform over 1..49, and keeps only `idx <= 40`.

The kept range matters exactly: 40 is both a multiple of 10 and the largest multiple under 49, so each output class receives exactly four indices and `((idx - 1) mod 10) + 1` is uniform over 1..10. Pairs 41..49 would break the symmetry (nine leftover outcomes cannot be split evenly) and are rejected — both draws are discarded and the pair is redrawn from scratch. Rejection introduces no bias precisely because every rejected outcome is thrown away wholesale rather than partially remapped.

Since this judge replaces the live RNG with a recorded list `rand7_outputs`, the loop consumes the values strictly in order, two per attempt (`a` then `b`), advancing the index by two and discarding both halves of any rejected pair — matching how a real implementation would consume calls. The test data guarantees enough outputs for termination.

Each attempt succeeds with probability 40/49, so the expected number of attempts is 49/40 and the expected number of `rand7()` calls is `2 * 49 / 40 = 2.45` — the follow-up answer. Memory is a single index variable.

**Complexity:** `O(1)` expected time (2.45 expected `rand7()` calls), `O(1)` space.
