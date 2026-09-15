# Solutions — The Number of Good Subsets

## Prime-Mask Subset Dynamic Programming

A product of distinct primes is exactly a square-free number whose prime factors are unique, and since `nums[i] <= 30`, every value decomposes over the ten primes up to 30. Each usable value maps to a 10-bit mask of the primes it contains; values divisible by a prime square (4, 8, 9, 12, ...) can never appear in a good subset and are discarded. Because subsets are distinguished by chosen indices, equal values contribute multiplicity: the array is first compressed into a frequency table over the at most 30 possible values.

The counting is a 0/1-knapsack over prime masks. `dp[mask]` is the number of ways to pick a set of indices whose product's prime set is exactly `mask`. For each usable value with frequency `f` and prime mask `m`, states are iterated in decreasing mask order so the same value cannot be used twice in one subset; any state `prev` disjoint from `m` transitions to `prev | m`, multiplied by `f` (the `f` interchangeable copies) and reduced modulo `10^9 + 7`. The value 1 has an empty mask and is skipped during the knapsack phase.

Finally every non-empty mask state is summed (a good subset needs at least one prime factor), and the ones are handled separately: each of the `count[1]` copies of 1 can be freely appended to any good subset without changing the product, contributing a factor of `2^count[1]`. The answer is that sum times the power of two, modulo the prime. The mask space is tiny — at most 30 distinct values meet the ten primes, so the knapsack touches at most `30 * 2^10` states.

**Complexity:** `O(n + V * 2^P)` time, `O(2^P)` space.
