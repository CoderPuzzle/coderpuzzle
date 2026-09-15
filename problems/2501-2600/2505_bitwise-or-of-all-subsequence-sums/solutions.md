# Solutions — Bitwise OR of All Subsequence Sums

## Single pass over elements and running prefixes

Two families of subsequences already witness every bit of the answer. Each
array element is itself a subsequence sum and contributes its own bits
directly, and each cumulative prefix `nums[0] + … + nums[i]` is also a legal
subsequence sum whose bits record how lower-bit mass consolidates into higher
bits through carries — the exact effect hint 3 describes when lower sums pile
up into higher ones. Whichever new bit appears anywhere among all 2^n
choices therefore shows up either on an element outright or on some prefix
the scan crosses, so OR-ing just those `2n` witnesses reproduces the OR over
every possible subsequence sum without ever enumerating it.

The scan keeps one running prefix next to the accumulator and folds both
sources per step (`ans |= x | pre`), reading the array once and storing only
two scalars beyond it. All-zero arrays collapse correctly because prefixes
stagnate at zero and zero elements raise nothing, identical values simply
stack onto the prefix, and stress inputs at full constraint size still
finish in a single linear sweep.

Bounds decide the arithmetic widths. With `nums.length <= 10⁵` and
`nums[i] <= 10⁹`, prefixes top out at `10¹⁴` — beyond 32-bit range, which is
why Java, C++, Go and Rust widen accumulator and running sum to 64-bit types
— yet far inside JavaScript's exact `Number` window below `2⁵³`, where the
running addition stays integer-exact. JavaScript additionally routes its OR
through two exact 30-bit halves because the native `|` operator truncates
operands to 32 bits.

**Complexity:** `O(n)` time, `O(1)` space.
