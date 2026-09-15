# Solutions — Count Number of Pairs With Absolute Difference K

## Check every pair

Every valid pair has one unique ordering with `i < j`. Enumerate the first
index, enumerate each later second index, and compare the absolute difference
of their values with `k`. Increment the answer exactly when they match.

The bounds allow at most 200 elements, so inspecting every pair directly is
small and avoids extra storage. The value limits also keep every subtraction
inside the 32-bit integer range before its absolute value is taken.

**Complexity:** `O(n²)` time, `O(1)` space.
