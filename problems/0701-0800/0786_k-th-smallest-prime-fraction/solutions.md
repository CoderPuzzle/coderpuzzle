# Solutions — K-th Smallest Prime Fraction

## Binary search on the value with two-pointer counting

Every candidate fraction lies strictly between 0 and 1, and the count of fractions `arr[i]/arr[j] <= x` is nondecreasing in `x`. So binary search the value of the k-th smallest fraction on `(0, 1)`, halving the interval 50 times — enough to pin the value down far below the gap between any two distinct fractions of values up to `3 * 10^4` (at least about `10^-9`), which guarantees the discrete answer is identified exactly.

Each feasibility probe counts, for the midpoint `mid`, how many fractions are at most `mid`, using two pointers over the sorted array. For each numerator index `i`, advance `j` (which never moves backwards across the whole pass, since a larger numerator needs an at-least-as-large denominator to stay under `mid`) to the first denominator with `arr[i] <= mid * arr[j]`; every denominator from `j` onward pairs with `arr[i]` under the bound, contributing `n - j` fractions. The comparison is rearranged into integer multiplication to avoid division. While counting, track the largest fraction actually seen with value at most `mid` — that fraction is the candidate answer whenever the count reaches `k`.

The bisection keeps `hi` on the side where the count is at least `k`, so the candidate pair recorded at the final feasible midpoint is the k-th smallest fraction itself, returned as its numerator and denominator. With `k = 1` on a two-element array the first probe already locks onto `arr[0]/arr[-1]`.

**Complexity:** `O(n log(1/eps))` time (50 iterations of an `O(n)` counting pass), `O(1)` extra space.
