# Solutions — Count Array Pairs Divisible by K

## Pairing GCD Groups

For a product `nums[i] · nums[j]` to be divisible by `k`, only the parts of each number that share factors with `k` matter: writing `g = gcd(num, k)`, the product is divisible by `k` exactly when `(gi · gj) % k == 0`, since the gcd strips every factor of `num` irrelevant to divisibility by `k`. Every such `g` is a divisor of `k`, so the up-to-10⁵ numbers collapse into at most `d(k)` groups (128 or fewer divisors for `k ≤ 10⁵`).

The solution first counts how many numbers fall into each gcd value with a dictionary. It then examines every unordered pair of groups, including a group paired with itself: two distinct groups contribute the product of their counts when `gi · gj` is divisible by `k`, and a group paired with itself contributes `C(c, 2) = c·(c−1)/2` — the number of index pairs `(i, j)` with `i < j` inside it — since every two members of that group satisfy the condition.

This group-level pairing is far cheaper than the O(n²) all-pairs scan because the number of distinct gcd values is bounded by the divisor count of `k`, which also bounds the dictionary size. The per-group test is a single multiplication and modulo on small integers.

**Complexity:** `O(n log k + d(k)²)` time, `O(d(k))` space.
