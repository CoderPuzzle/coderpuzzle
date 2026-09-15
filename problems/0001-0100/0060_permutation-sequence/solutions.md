# Solutions — Permutation Sequence

## Factorial number system

The permutations of `[1, 2, ..., n]` in lexicographic order fall into `n` blocks by their first digit, and each block holds the `(n - 1)!` permutations of the digits left over once that first digit is chosen. So `k` alone tells us which block, and therefore which first digit, the answer lives in: subtracting one to rank from zero, the quotient `rank / (n - 1)!` is the index of the first digit among the digits still available, and the remainder is the rank of the answer inside that block. Repeating the division over the shortened digit list pins down one digit per position, which is exactly writing `k - 1` in the factorial number system.

The code keeps the available digits in a sorted list and walks positions from the first to the last, each round dividing the remaining rank by the factorial of the positions still unfilled. The quotient selects the digit, `pop` removes it so the next round ranks among what is left, and the remainder carries the rank forward. Nothing is ever enumerated — a full listing would be `n!` strings, while this builds the one answer in `n` picks.

With `n <= 9` the largest factorial is `9! = 362880`, which fits comfortably in 32 bits, but the ranks and factorials are still carried in 64-bit locals in the fixed-width languages: division and modulo by repeated shrinking blocks are exactly the kind of arithmetic that quietly overflows when a constraint is relaxed later.

**Complexity:** `O(n²)` time (each of the `n` digit removals shifts the tail of the list), `O(n)` space.
