# Solutions — Convert 1D Array Into 2D Array

## Direct row-major reshape

The conversion is possible exactly when the requested number of cells, `m * n`, equals the length of `original`; otherwise no shape can use every element, so return an empty outer array. Fixed-width implementations perform this product in a wider integer type before allocating, avoiding overflow when the requested dimensions themselves are large.

For a valid shape, allocate `m` rows of `n` values. Cell `(row, column)` receives `original[row * n + column]`, which preserves the original order and fills each row before moving to the next one.

**Complexity:** `O(original.length)` time, `O(m * n)` space for the returned array.
