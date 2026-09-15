# Solutions — Find the N-th Value After K Seconds

## Repeated in-place prefix sums, modulo 10⁹ + 7

One second replaces the array by its own prefix sums: a[j] becomes the
running total through j. Doing that once per second and reading column
n - 1 after k rounds is exactly the statement's first hint — a single
in-place running sum executed k times over an all-ones start. Every entry
is reduced below 10⁹ + 7 as soon as it is written; a sum of two stored
residues is under 2 × 10⁹ + 7 < 2³¹ before reduction, so fixed-width
32-bit accumulators (and JS Numbers, exact far past that) never overflow.

After k seconds entry n - 1 has accumulated one unit for every lattice
path from any row-0 cell down to it — the binomial C(n - 1 + k, k) with
n - 1 horizontal and k vertical steps — which is where this problem's
combinatorics tag comes from. The tabulation needs no inverses and stays
within O(nk) single-word additions at the crawl's limits of n, k ≤ 1000.

**Complexity:** `O(nk)` time, `O(n)` space.
