# Solutions — Most Frequent Even Element

## Count the even values in a hashmap

Only even elements can ever be the answer, so the array reduces to its
even entries. Sweep `nums` once and count the occurrences of each even
value in a hash map; odd values are skipped entirely. The answer is then
the map key with the highest count, breaking ties toward the smaller
value: iterate over the map's entries keeping a pair `(best_count,
best_value)` that is replaced whenever an entry has a strictly larger
count, or an equal count with a strictly smaller value. If the map ends
up empty — no element of `nums` is even — return -1.

Because each value is counted independently by exact equality, the sweep
never needs the array sorted or scanned twice: one pass to count plus one
pass over at most 100001 distinct keys decides everything. Values fit
easily in 32 bits (`nums[i] <= 10⁵`), counts are bounded by
`n <= 2000`, and the tie rule makes the choice order-independent.

**Complexity:** `O(n)` time, `O(n)` space.
