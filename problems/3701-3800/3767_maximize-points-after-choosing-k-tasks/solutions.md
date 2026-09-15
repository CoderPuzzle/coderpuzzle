# Solutions — Maximize Points After Choosing K Tasks

Every task is completed exactly once, so a total is fully described by the
set of tasks handed to technique 1 — everything else pays `technique2[i]`.
Both approaches below exploit the same freedom: the requirement is only a
floor of `k` technique-1 picks, never a cap, and any assignment satisfying
the floor can be reached from "technique 1 everywhere" by giving back
switches one task at a time. They differ in which direction they walk.

## Switch gains, largest first

Taking technique 1 on every task satisfies the floor for any `k`, and its
total is simply the sum of `technique1`. From there, handing task `i` to
technique 2 changes the total by exactly
`gain = technique2[i] - technique1[i]`. At most `n - k` tasks may leave
technique 1, so the question becomes: pick at most `n - k` gains to add,
and the best choice is obviously the positive ones, largest first. Because
gains arrive sorted descending, the total after each accepted switch is the
best achievable with that number of switches; once a gain turns zero or
negative no later gain helps either, so the sweep can stop. The answer is
the running maximum over those prefix totals (the unswitched start covers
the case where every gain is negative).

One subtlety keeps the maximum honest: the running max rather than the
final total. When `k > 0` fewer than all tasks may switch anyway, but even
when `k = 0` the loop's early exit on the first non-positive gain means the
last recorded total already includes every helpful switch — tracking the
max across the sweep costs nothing and makes the argument local.

The sort dominates the bill; the sweep and the accumulation are linear.
Totals reach `n * max(value) = 10^5 * 10^5 = 10^10`, past 32 bits, so the
compiled languages accumulate in 64-bit (`long long`, `long`, `int64`);
JavaScript numbers are doubles, exact through 2^53, and hold it untouched.

**Complexity:** `O(n log n)` time, `O(n)` space.

## Best-of-both baseline, smallest forced returns

Flip the direction: begin from the assignment that has no floor at all —
each task takes its larger value, `max(technique1[i], technique2[i])` —
then repair the floor. Tasks where technique 1 already wins or ties count
toward the quota for free; call their number `free`. Only when `free < k`
must some technique-2 winners give up their win and return to technique 1,
each such repair costing exactly its would-be gain `technique2[i] -
technique1[i]`. Exactly `k - free` repairs are needed, and they are
interchangeable in effect, so taking the smallest losses first is plainly
optimal. If `free >= k` nothing is paid back and the baseline stands.

Each pass touches every task once; only the losses array is sorted, and it
holds just the tasks where technique 2 wins. The asymptotics match the
gain-sorting variant, but the array being sorted is often much shorter and
the per-task work is a single comparison against two running values.

**Complexity:** `O(n log n)` time, `O(n)` space.
