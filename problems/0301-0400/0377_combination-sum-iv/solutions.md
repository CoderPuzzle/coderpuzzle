# Solutions — Combination Sum IV

## Bottom-up count over the target

Order is everything here: `(1, 1, 2)`, `(1, 2, 1)` and `(2, 1, 1)` are three
different combinations, so the state cannot be a mere multiset of chosen
values — the total alone suffices. Let `ways[t]` count the sequences of
`nums` values summing exactly to `t`. A sequence reaching `t` splits into its
last element `x` and whatever came before, and every earlier part is itself a
sequence summing to `t - x`, so `ways[t] = sum(ways[t - x])` over the final
picks `x <= t`, with `ways[0] = 1` standing for the one empty sequence. That
is also why the outer loop must walk the target while the inner loop picks
the last element: choosing the first element instead would forget the
ordering and count multisets.

Filling `t` from 1 up to `target` reads each entry from strictly smaller
totals only, so one ascending pass of `target` iterations over `nums`
finishes the table and `ways[target]` is the answer. The examples fall out
directly: for `nums = [1, 2, 3]` and `target = 4` the table climbs
`1, 2, 4, 7`, and at `target = 1` every sequence is just the value 1, so
`ways[1]` counts the 1s in `nums`. The statement promises the answer fits in
32 bits, but intermediate totals can stand high on the way there, so the
fixed-width ports accumulate in 64-bit registers.

The follow-up: with negative numbers allowed the count can become infinite —
any value paired with a `+1/-1` tandem extends a sequence without changing
its sum, so the recurrence's totals no longer bound the search. The problem
stays finite only if a length limit is added, bounding how many elements a
combination may use; the state then becomes `(remaining, length)`.

**Complexity:** `O(target * n)` time, `O(target)` space.
