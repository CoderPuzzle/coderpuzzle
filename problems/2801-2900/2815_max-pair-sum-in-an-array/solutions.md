# Solutions — Max Pair Sum in an Array

## Keep the best value per largest-digit bucket

Two numbers can form a valid pair exactly when the largest digit of one
equals the largest digit of the other, and nothing else about the numbers
matters — so the largest digit is a natural bucket key, with only nine
possible values (nums[i] >= 1, so every number has at least one nonzero
digit and its largest digit runs from 1 to 9). Within a bucket the best
pair is unconditionally the bucket's two largest values: pairs across buckets are
never valid and every same-bucket alternative sums to no more, so the
answer is the largest per-bucket pair sum, or -1 when no bucket holds two
elements.

Sweep nums once, mapping each number's largest digit to the best value
seen for it so far. When the current number finds its bucket occupied,
`entry + current` is a candidate answer — `entry` predates `current`, so
the indices are distinct even for duplicate values — and afterwards the
entry keeps the larger of the two. Every valid pair is examined at the
moment its later element arrives, with the entry always holding the best
possible first element, so the running maximum ends correct. Values are
at most 10⁴, so each candidate pair sum stays inside a signed 32-bit int.

**Complexity:** `O(n · d)` time, `O(1)` space, where d <= 5 is the digit
count of the largest allowed value.
