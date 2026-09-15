# Solutions

The trimmed mean needs the sum and both extremes. The presented solution
reads them in one pass; sorting first would find the extremes too, at
`O(n log n)` instead of `O(n)`, so the scan is what we keep.

## One-Pass Sum With Running Extremes

Walk the array once accumulating the total while tracking the smallest
and largest values seen. The answer is `(total - min - max) / (n - 2)` —
the two extreme employees are removed from both the sum and the count.
Integer sums stay exact (at most 100 values of at most 10⁶), and only
the final division produces a double.

**Complexity:** `O(n)` time, `O(1)` extra space.
