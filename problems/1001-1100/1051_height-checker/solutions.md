# Solutions — Height Checker

The expected order is just `heights` sorted into non-decreasing order, so
building that sorted copy and comparing it against the original
position-by-position directly counts every index where a student is out
of place.

## Sort a copy and compare element-wise

Copy `heights` into `expected` and sort the copy into non-decreasing
order. Walk both arrays together by index and count every position where
`heights[i]` and `expected[i]` differ. Because the comparison is by exact
value at each index (not by whether an element merely looks
out-of-place), duplicate values that land in the same relative order
never get miscounted — only a genuine value mismatch at that index adds
to the count.

**Complexity:** `O(n log n)` time, `O(n)` extra space, where `n` is the
length of `heights`.
