# Solutions — Find Greatest Common Divisor of Array

## Euclid's algorithm on the min and max

The greatest common divisor of a set of integers is determined entirely by
its smallest and largest elements: any common divisor of the whole array must
divide both extremes, and any divisor of both extremes divides every interior
value as well. So the task reduces to computing `gcd(min(nums), max(nums))`,
and both extremes can be found with a single pass over the array, keeping two
running values.

Euclid's algorithm is the standard way to finish: while the second operand is
non-zero, replace the pair `(a, b)` by `(b, a % b)`. Because each step
replaces the pair with one whose gcd is unchanged and whose sum strictly
shrinks, the loop terminates at the gcd in `O(log(min, max))` steps — far
fewer than the `O(min)` worst case of the trial-division hint, which is only
fast enough here because `nums[i] <= 1000`. All intermediate values stay
within the `int` range since every operand is bounded by the largest array
element.

**Complexity:** `O(n)` time to scan the array plus `O(log(max))` time for the
Euclid reduction, `O(1)` space.
