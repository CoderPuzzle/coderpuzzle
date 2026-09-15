# Solutions — Median of a Row Wise Sorted Matrix

## Binary search on the answer value

The matrix holds an odd number of elements, so the median is an actual matrix value — the `(m * n) / 2 + 1`-th smallest element — and is returned exactly, with no averaging of two middle values. The problem forbids touching all `m * n` elements per step, so instead binary-search the value itself over the range from the smallest row head to the largest row tail: find the smallest `x` for which at least `need = (m * n) / 2 + 1` elements are `<= x`.

Counting elements `<= x` is cheap because each row is sorted: `bisect_right` gives the count for a row in `O(log n)`, and the row counts simply add up. Each binary-search step therefore costs `O(m log n)` instead of `O(m * n)`, and the loop with `hi = mid` on success and `lo = mid + 1` on failure converges on the smallest satisfying value. That value must occur in the matrix: if it did not, the counts at `x` and `x - 1` would be equal, and the search would have chosen the lower one.

The search runs over the span `V` between the smallest row head and the largest row tail (at most `10^6`), so it performs roughly 20 iterations regardless of the matrix shape, comfortably beating the required `O(m * n)` overall.

**Complexity:** `O(m log n log V)` time, `O(1)` space.
