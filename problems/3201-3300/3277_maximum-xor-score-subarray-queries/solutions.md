# Solutions — Maximum XOR Score Subarray Queries

The score process is linear algebra over GF(2): every round replaces each
element with the XOR of itself and its right neighbor, so each surviving
cell ends up being a fixed subset-XOR of the original window — the same
triangle Pascal draws, with binomial coefficients reduced mod 2. That
structure turns "the score of every subarray" into one shared recurrence
instead of one simulation per subarray, and the query answers fold on top
of it as a second, equally cheap recurrence.

## Pascal rows folded into a range-max table

One round applied to `nums[l..r]` leaves exactly the adjacent-XOR array,
whose own score is by definition the score of `nums[l..r]`; unrolling the
rounds gives the two-term recurrence `score[l][r] = score[l][r-1] ^
score[l+1][r]` seeded by `score[l][l] = nums[l]`. Equivalently, the
coefficient of `nums[j]` in `score[l][r]` is `C(r-l, j-l)` mod 2 — the
binomial parities alone decide which elements survive to the final XOR.
Filling the rows for `l = n-1` down to `0` costs `O(1)` per cell, so all
subarray scores are known before any query is read.

Queries ask for the largest score among subarrays contained in `[l..r]`,
and that quantity obeys its own one-cell recurrence: any such subarray
either drops the left endpoint, drops the right endpoint, or is the whole
span, so `best[l][r] = max(score[l][r], best[l][r-1], best[l+1][r])` with
`best[l][l] = nums[l]`. Computing that row alongside its score row and
keeping every finished row stores about half of an `n × n` table — roughly
8 MB of 4-byte cells at `n = 2000` — after which each of the up-to-`10⁵`
queries is a single lookup into its left endpoint's row. No value ever
grows past 31 bits: elements are at most `2³¹ - 1`, so bit 31 of every
input is `0`, and the XOR of two bit-31-zero words again has bit 31 equal
to `0` — by induction every score lies in `[0, 2³¹ - 1]`. Signed 32-bit
storage is therefore exact in every language; JavaScript's bitwise ops in
particular work on int32 patterns, but these values pass through ToInt32
unchanged and their XOR pattern reads back as the same non-negative
number, never a negative reinterpretation (and they stay far below `2⁵³`,
where plain number arithmetic is exact anyway).

**Complexity:** `O(n² + q)` time, `O(n²)` space.
