# Solutions — Check If Array Pairs Are Divisible by k

## Remainder Frequency Counting

Two numbers sum to a multiple of k exactly when their remainders mod k are complementary: r pairs with k - r, and remainder 0 pairs with itself. Since every element must be placed in exactly one pair, the question reduces to whether the remainder classes can be matched up perfectly — and any pairing inside matched classes works, so no search over actual pairings is needed.

The solution first tallies frequencies of x mod k over the whole array; Python's modulo already lands in the range 0 to k - 1 even for negative x, so no normalization is required. The remainder-0 class can only pair with itself, so its count must be even. Then for every r from 1 up to half of k, the class r must hold exactly as many elements as the complementary class k - r.

When k is even, the loop's final iteration reaches the self-complementary middle class r = k/2, where the equality check compares the class with itself and so imposes nothing — but nothing is lost, because that class's count is forced to be even anyway: the array length is even, the zero class was already required to be even, and every strictly complementary pair of classes contributes an even total. An odd middle count would contradict the parity of the other classes. A k of 1 collapses everything into the zero class, and the single evenness check settles it.

**Complexity:** `O(n + k)` time, `O(k)` space.
