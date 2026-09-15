# Solutions — Count Number of Bad Pairs

## Count good pairs, subtract from all pairs

The condition `j - i != nums[j] - nums[i]` rearranges to
`nums[i] - i != nums[j] - j`, which changes the picture completely: each
index carries a single shifted value `nums[i] - i`, and a pair is _good_
exactly when the two shifted values are equal. Since every pair is either
good or bad, counting the good ones — far easier, because they group by
shifted value — and subtracting from the total `n(n-1)/2` yields the bad
count without ever enumerating a pair.

One pass with a hash map does it. Walking indices left to right, the map
holds how many earlier indices carry each shifted value; when index `i`
arrives, every earlier index with the same shifted value forms one new
good pair, so adding the current bucket size to the answer before
inserting accumulates exactly one count per good pair.

Both terms of the subtraction need care in fixed-width languages: the
total pair count reaches `100000 * 99999 / 2 ≈ 5 × 10⁹`, beyond 32 bits,
so the arithmetic runs in 64-bit integers (JavaScript doubles hold these
exactly). Shifted values fit easily in 32 bits since
`|nums[i] - i| < 10⁹ + 10⁵`.

**Complexity:** `O(n)` time, `O(n)` space.
