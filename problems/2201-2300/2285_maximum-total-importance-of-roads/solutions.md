# Solutions — Maximum Total Importance of Roads

## Sort by degree, rank values ascending

Every road `(u, v)` contributes `value[u] + value[v]` to the total, so walking all roads counts each city once per incident road: the total equals the weighted sum `degree[c] * value[c]` over all cities. The question becomes how to pair the fixed multiset of degrees with the values `1..n` so that weighted sum is largest.

An exchange argument answers it: if a higher-degree city held a smaller value than a lower-degree city, swapping those two values changes the total by `(degree_a - degree_b) * (value_b - value_a)`, which is never negative — so some optimal assignment hands strictly higher degrees strictly higher values. Count every degree in one pass over `roads`, sort the degrees ascending, and take their dot product with `1..n`; cities of equal degree are interchangeable, so ties resolve arbitrarily without cost.

**Complexity:** `O(n log n + m)` time, `O(n)` space.
