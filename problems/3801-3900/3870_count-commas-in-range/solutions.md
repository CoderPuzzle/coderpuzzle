# Solutions — Count Commas in Range

Standard number formatting inserts a comma after every group of three digits
counting from the right, so a number contains a comma if and only if it has
at least four digits. Under the constraint `n <= 10⁵` every qualifying number
has between four and six digits, and each of those carries exactly one comma
— the thousands separator.

## Threshold arithmetic

Only the integers from 1000 up to n ever display a comma, and each of them
contributes exactly one. The count of integers in that interval is `n - 999`
(the numbers 1000, 1001, ..., n are n - 999 of them). When n is below 1000 no
number in the range has a comma, so the answer is 0; `max(0, n - 999)` covers
both cases in a single expression.

The whole computation is one subtraction and a comparison, using only
constant-time arithmetic and no auxiliary memory. The answer never exceeds
`10⁵ - 999`, comfortably inside 32-bit integers in every language.

**Complexity:** `O(1)` time, `O(1)` space.
