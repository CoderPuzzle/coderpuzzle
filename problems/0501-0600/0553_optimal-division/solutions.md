# Solutions — Optimal Division

## Chain the denominator flat

For one or two values there is nothing to decide — no parenthesis can change
the evaluation order — so the answer is the values joined by `'/'` and nothing
else. From three values on, the optimum has a shape that can be written down
outright: `a0/(a1/a2/…/an-1)`, the first value divided by everything else
chained flat inside a single pair of parentheses.

Why that is maximal is an exchange argument on positive numbers. Any
parenthesization evaluates to a product in which every value carries an
exponent of `+1` or `-1`: the first value always keeps `+1`, because as the
leftmost leaf it only ever sits to the left of a division, and the second
always carries `-1`, because the split that finally separates it from the head
makes it a right operand. Division by a division multiplies — that is the
exchange: a later value still stuck in a nested denominator can be
reassociated upward into the numerator, strictly increasing the product, until
the denominator is the flat chain `a1/a2/…/an-1`, which equals `a1/(a2·…·an-1)`
— the smallest denominator attainable. With every value at least 2 no tie is
possible, which is exactly the statement's promise that the optimal division
is unique.

Rendering follows the examples: decimal forms joined by `'/'` with no spaces,
one pair of parentheses around the chained denominator and no others. The
output is the expression with no redundant parenthesis, so for `n <= 2` the
bare join is already in final form.

**Complexity:** `O(n)` time and `O(n)` output space — each value is converted
to its decimal form and copied into the answer exactly once.
