# Solutions — Handshakes That Don't Cross

## Catalan Number Dynamic Programming

Fix person 1 as a pivot and consider whom they shake hands with. If person 1 pairs with person 2j (an even position away), the chord they form splits the circle into two independent arcs of 2(j−1) and 2(m−j) people, where m = numPeople / 2. Any handshake inside one arc that crossed into the other would have to cross the pivot chord, so the two arcs are filled independently — the number of non-crossing layouts for this split is the product of the counts for the two arcs. Summing over all partners of person 1 gives the recurrence `catalan[i] = Σ catalan[j] · catalan[i−1−j]`, which is exactly the Catalan recurrence with `catalan[0] = 1` (an empty circle has one layout).

![Six people on a circle: person 1's chord to person 2 leaves one arc, a chord to person 4 splits two and two.](figures/solution-handshake-split.svg)

The implementation fills `catalan[0..m]` bottom-up, keeping every partial product modulo 10^9 + 7. Computing each entry costs one linear pass over the smaller indices, and the final answer is `catalan[m]`. The base case `catalan[0] = 1` also correctly handles the smallest input `numPeople = 2`, where m = 1 and the single layout is the pair itself.

Because the table only depends on the number of pairs, there is no geometry left in the computation: the circular positions matter only through the split argument above. The modulo is applied to each term as it accumulates so intermediate values never exceed the modulus squared.

**Complexity:** `O(m²)` time, `O(m)` space, where `m = numPeople / 2`.
