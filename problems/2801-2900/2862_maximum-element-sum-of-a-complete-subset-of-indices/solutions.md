# Solutions — Maximum Element-Sum of a Complete Subset of Indices

## Grouping by Squarefree Part

The condition "every pairwise product of indices is a perfect square" is an equivalence relation in disguise. Write each index as `(squarefree part) x (perfect square)`; the product of two indices is a perfect square exactly when their squarefree parts are equal, because the odd-exponent primes of one factor must be cancelled by identical odd-exponent primes in the other. Hence the complete subsets are precisely the sets of indices sharing one squarefree part, and the task reduces to partitioning indices `1..n` by that part and taking the group with the largest element sum.

The squarefree part of `x` — the product of primes appearing with an odd exponent in `x`'s factorization, e.g. `P(18) = 2` — is computed by trial division up to `sqrt(x)`: for each prime factor count the exponent and multiply it in when the count is odd; if anything survives the loop it is a single leftover large prime with exponent one and is included. No sieve is needed since only indices, not arbitrary values, are factored.

The sweep then just accumulates `nums[i - 1]` into `groups[squarefree_part(i)]` for `i` from 1 to `n` and returns the maximum bucket. Since the number of distinct squarefree parts is at most `n`, the map stays linear in size; note that group 1 (perfect-square indices) and the odd-prime groups are all legitimate candidates, and a single-element group is a valid complete subset because the condition over pairs is vacuous there.

**Complexity:** `O(n sqrt(n))` time, `O(n)` space.
