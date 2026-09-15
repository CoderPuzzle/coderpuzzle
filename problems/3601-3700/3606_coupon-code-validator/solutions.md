# Solutions — Coupon Code Validator

## Filter, then rank-sort

Validity is a conjunction of three independent properties, so a single
pass over the arrays can keep only the coupons that pass every gate: the
coupon is active, its `businessLine` is one of the four known categories,
and its `code` is non-empty with every character an ASCII letter, digit,
or underscore. Each gate is checked before the pair is stored, so invalid
coupons never reach the ordering step. The underscore case is easy to get
wrong when using library helpers — `isalnum`-style tests alone would
reject `"SAVE_20"` — which is why the code explicitly admits `_`.

The survivors are stored as `(category, code)` pairs. A small map assigns
each of the four categories its fixed display rank, and the final sort
compares pairs by `(rank, code)`. Because the pair comparison falls back
to the code only when the ranks tie, the sort expresses exactly the
two-level ordering the statement demands: business line first in the fixed
category order, then lexicographic code order within a category. A plain
tuple compare in Python/Rust/C++ and the comparator lambdas elsewhere all
reduce to this same pair-wise comparison.

Returning the codes is then just projecting the sorted pairs onto their
second component. The whole pipeline is a standard filter-then-sort; no
coupon influences another, so the linear filter and the `O(n log n)` sort
combine for the total cost.

**Complexity:** `O(n log n)` time, `O(n)` space.
