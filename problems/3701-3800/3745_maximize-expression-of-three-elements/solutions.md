# Solutions — Maximize Expression of Three Elements

## One pass for the two largest and the smallest

Within any picked triple the roles decide the score: the best assignment puts
the triple's two biggest values in the a and b slots and its smallest value in
the c slot. So no candidate can ever score above (the array's largest value) +
(second largest) − (smallest), and that upper bound is achievable at distinct
indices: read off a sorted copy of the array, its last, second-to-last, and
first slots are three different positions even when their values repeat. The
answer is therefore just the two largest values minus the smallest one.

One sweep finds all three extremes without sorting. Seed the running top-two
pair and the running minimum from nums[0] and nums[1] — legal because n >= 3
guarantees those exist — then fold in every later element. A value below the
running minimum replaces it; a value above the running top pushes the old top
down to runner-up; anything else still beats the runner-up takes that seat.
Equal values slot in naturally, since an element equal to the current top is
not greater than it and lands in the runner-up seat instead — exactly the
promotion path that makes tie-heavy plateaus come out right.

The arithmetic stays tiny — the expression is bounded by 100 + 100 − (−100) =
300 — so plain 32-bit integers are comfortable in every language, and the
whole computation is one comparison-laden walk carrying three numbers.

**Complexity:** `O(n)` time, `O(1)` space.
