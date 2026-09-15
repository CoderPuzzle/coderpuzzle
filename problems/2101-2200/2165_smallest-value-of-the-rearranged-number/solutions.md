# Solutions — Smallest Value of the Rearranged Number

## Sign-directed digit sort

The sign never changes, so it only decides which arrangement of the
magnitude's digits wins: a positive number is smallest when its digits run
ascending, while a negative one is smallest when its magnitude — and hence
the digits themselves — run descending. Sorting the digit string once, in
the direction the sign asks for, therefore already produces the right
negative answers directly, as with `-7605` whose digits `7,6,0,5` sort to
`7650` and give `-7650`.

The single wrinkle is the leading-zero rule on the positive side: the
ascending sort parks all zeroes at the front (`310` becomes `013`), which is
forbidden rather than minimal. Swapping the first nonzero digit — which the
sort has placed immediately after the zero run — into the leading slot fixes
both problems at once: the smallest nonzero digit leads, and every zero it
displaced slides into the run behind it, keeping the tail ascending. `013`
becomes `103`. `num = 0` has nothing to rearrange and returns itself.

**Complexity:** `O(d log d)` time and `O(d)` space for `d <= 16` digits, so
effectively constant; the rebuilt value fits comfortably in 64-bit integers
(and, proven by the constraint `|num| <= 10¹⁵ < 2⁵³`, in JS `Number`).
