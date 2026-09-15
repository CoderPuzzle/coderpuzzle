# Solutions — Product of the Last K Numbers

## Prefix Products with Zero Reset

Multiplying the last `k` numbers on demand costs `O(k)` per query, which degrades to `O(n)` on long windows. Instead the class keeps `prefix`, a running product of every prefix of the current block of numbers, with `prefix[0] = 1` as the neutral element. The product of the last `k` numbers is then the total product of the block divided by the product of everything before that window — a single division: `prefix[n] / prefix[n - k]`.

A `0` in the stream makes every product spanning it `0` forever, and prefix products that reach across a `0` are useless — no later number can un-zero them. So `add(0)` simply resets the structure back to the lone sentinel `1`. This is what keeps the numbers small: every stored product covers only numbers since the last zero, and the problem guarantees any contiguous product fits in 32 bits.

The reset also answers window queries that cross a zero arithmetically: if `k` is at least the current block length (`size`), the window must include the zero, so `getProduct` returns `0` without touching the array. Because exactly one division happens per query, both `add` and `getProduct` are constant time, meeting the follow-up. The Java port grows its prefix array by doubling instead of reallocating per element, and computes in `long` even though 32 bits suffice, so overflow can never decide a test.

**Complexity:** `O(1)` time per `add`/`getProduct`, `O(n)` space for the current block.
