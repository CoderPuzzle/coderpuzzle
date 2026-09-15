# Find the Kth Largest Integer in the Array

## Solution: Sort by length, then lexicographically

Each `nums[i]` is a string of decimal digits with no leading zeros, and the strings can be up to 100 digits long — far beyond what a fixed-width integer (or even JavaScript's `Number`) can represent. The key observation is that numeric order on such non-negative integers coincides exactly with ordering by _string length first_ and _lexicographic order second_: a string with more digits is always the larger integer, and two strings of equal length compare numerically exactly like they compare lexicographically. So the k-th largest integer is simply the `k`-th element from the end after sorting the array with that custom comparator.

The whole algorithm is therefore: sort `nums` in ascending numeric order using the `(length, lexicographic)` comparator, then return `nums[n - k]`. No conversion to integers is ever performed, so strings of 100 digits are handled with no overflow or precision loss. The comparator is total and consistent — for strings of different length the length alone decides, and for strings of equal length the standard lexicographic comparison (which the standard library provides for every language) is exactly numeric comparison since no leading zeros exist.

Because this is a comparison-based sort of `n` strings, the dominant cost is `O(n log n)` string comparisons; each comparison may scan up to the maximum string length `L`, giving `O(L·n log n)` in the worst case. The only auxiliary space is what the sort itself needs (`O(n)` for the sort buffer in Java/C++/Go/Rust's stable sorts, `O(1)` in-place for the others).

**Complexity:** Time `O(L·n log n)`, Space `O(n)`.
