# Solutions — Maximum OR

## Prefix and suffix OR

An operation multiplies one element by 2, which shifts all of its bits up
by one, and at most k operations are available. The best plan puts every
operation on a single element. Let t be the highest set bit of the OR some
plan achieves: that bit is supplied by an element w holding d of the
operations, so w keeps a 1 at bit t - d. Giving w all k operations instead
sets bit t - d + k, which sits above t whenever d < k, so the new OR is at
least 2^(t+1) while the old one is below it — a strict improvement. A plan
that uses fewer than k operations, or that spreads them over several
elements, always has such a w with d < k, so it is always beaten by a
concentrated plan. The answer is therefore the maximum, over every index
i, of nums[i] · 2^k OR-ed together with all the other elements.

Evaluating one candidate needs the OR of everything except nums[i], which
splits into the prefix OR of nums[0..i) and the suffix OR of nums(i..n).
The code builds the suffix array right to left, then sweeps left to right
carrying the prefix in a running variable; every index contributes one
candidate, and the maximum over the n candidates is returned.

Widening: the boosted element reaches 10⁹ · 2¹⁵ ≈ 3.3 × 10¹³, past 32-bit
range, so C++, Java, Go, and Rust keep the candidates and both OR arrays
in a 64-bit type (`long long`, `long`, `int64`, `i64`) — widening the
element before the shift, because shifting a 32-bit value left by up to 15
already wraps. Python integers are unbounded. In JavaScript and
TypeScript the bitwise operators themselves truncate to 32 bits, so those
solutions keep every `|` operand below 2³⁰ (true for all raw elements) and
fold the boosted element in arithmetically through a split at bit 30;
every value stays below 2⁴⁵ ≈ 3.5 × 10¹³, far under the 2⁵³ ≈ 9.0 × 10¹⁵
exactness limit of a double.

**Complexity:** `O(n)` time, `O(n)` space.
