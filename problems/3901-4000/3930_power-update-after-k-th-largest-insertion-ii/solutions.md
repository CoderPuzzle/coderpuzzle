# Solutions — Power Update After K-th Largest Insertion II

Coordinate-compress all values and maintain their frequencies in a Fenwick
tree while processing insertions.

## Fenwick order statistics and modular exponentiation

Collect the initial values and every inserted value, sort them, and remove
duplicates. A Fenwick tree over these ranks stores how many copies of each
value are currently present. After an insertion, the `k`th largest value is
the `(size - k + 1)`th value in increasing order; binary lifting on the
Fenwick tree finds that rank in logarithmic time, including through duplicate
frequency ranges.

Use binary exponentiation to update `p` modulo `10⁹ + 7`. Multiplications in
the modular power routine use 64-bit arithmetic because two residues can have
a product near `10¹⁸` before reduction.

**Complexity:** `O((n + q) log(n + q))` time, `O(n + q)` space.
