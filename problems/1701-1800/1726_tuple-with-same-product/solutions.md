# Solutions — Tuple with Same Product

A tuple is two pairs of elements whose products agree, so the array matters
only through how many of its `C(n, 2)` unordered pairs land on each product
value — a frequency map over products carries everything the answer needs.

## Count pairs per product, take eight per pair of pairs

Tabulate `nums[i] * nums[j]` for every `i < j` in a hash map. Distinctness
does a quiet but essential job here: two unordered pairs with equal products
can never share an element, because `a * b = a * c` forces `b = c`, collapsing
them into one pair. So when `c` pairs share a product, any 2 of them draw on
four different elements and satisfy `a != b != c != d` automatically.

Each such choice of two pairs is one equation worn eight ways: the first pair
can write `(a, b)` or `(b, a)`, the second `(c, d)` or `(d, c)`, and the two
pairs can also swap roles as the left and right side of the equation —
`2 * 2 * 2 = 8` ordered tuples, which is exactly the eight-term block the
statement's first example lists for its single colliding product. Summing
`c * (c - 1) / 2 * 8` over the map's counts totals the answer; with
`n <= 1000` and values `<= 10^4`, products stay under `10^8` and the count in
the mere millions, so 32-bit integers carry every value involved.

**Complexity:** `O(n^2)` time, `O(n^2)` space.
