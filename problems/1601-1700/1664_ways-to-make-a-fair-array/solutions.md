# Solutions — Ways to Make a Fair Array

Deleting one element splits the array at the deletion point: everything
before it keeps its index, everything after it slides down one slot and
so swaps parity. The even and odd sums of the array that remains are
therefore four prefix/suffix totals stitched together, and a sweep that
walks the deletion point across the array while carrying those totals
tests every candidate removal in constant time.

## Parity-flipping sweep

Keep four running sums: `left_even` and `left_odd`, the even-index and
odd-index sums of the prefix `nums[0..i)`, and `right_even` and
`right_odd`, the same sums over the suffix `nums(i..n)`. Removing index
`i` leaves the prefix untouched but shifts every suffix element down one
position, so an originally even index turns odd and vice versa. The
after-removal even sum is consequently `left_even + right_odd` and the
after-removal odd sum is `left_odd + right_even`, and the removal at `i`
is fair exactly when these two agree — equivalently, when the prefix's
even-minus-odd difference equals the suffix's.

The sweep opens with one pass that fills `right_even`/`right_odd` with
the whole array's totals and leaves the left pair at zero. Each step then
does three things: strip `nums[i]` out of the right side (from
`right_even` when `i` is even, from `right_odd` otherwise) so the right
side covers strictly the elements after `i`; run the fairness test; and
absorb `nums[i]` into the left pair for the next iteration. On the
example `[2,1,6,4]` the totals open at even `2 + 6 = 8` and odd
`1 + 4 = 5`; at `i = 1`, after stripping the 1, the left pair is
`(2, 0)` and the right pair is `(6, 4)`, giving new even `2 + 4 = 6`
against new odd `0 + 6 = 6` — the single fair removal, while every other
index fails its test.

With `n` up to `10⁵` and values up to `10⁴`, each total reaches
`5 * 10⁸` and their sum `10⁹` — inside the 32-bit range but at its edge,
so the four accumulators are kept in 64-bit integers (`long`,
`long long`, `int64`, `i64`; plain numbers in JavaScript and TypeScript,
exact well past this magnitude) while the count, at most `n`, fits
comfortably in 32 bits. The two passes touch each element a constant
number of times and nothing beyond a handful of scalars is stored.

**Complexity:** `O(n)` time, `O(1)` extra space.
