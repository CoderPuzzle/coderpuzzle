# Solutions — Task Scheduler

Both solutions take their shape from the same bottleneck: the most frequent
label, whose forced gaps dictate the whole timetable. The simulation feels its
way to the answer slot by slot — a max-heap hands each slot the label with the
largest remaining count while a cooldown queue holds labels back until they may
run again — and the number of slots used is simply where the clock stops. The
closed form never starts the clock: two statistics of the label counts pin the
length outright, and the timetable is never built at all.

## Max-Heap Greedy Simulation

Instead of deriving the length, build the timetable one slot at a time and let
a max-heap hand out the work: at every slot, run one job of the label with the
largest remaining count. That choice is what keeps the timetable tight. The
busiest label is the one whose runs must sit farthest apart, so taking its
runs at every earliest opportunity is exactly what the cooldown rule demands;
a thinner label run in its place would leave the forced gaps to be paid for
later.

The bookkeeping needs nothing but counts, because the cooldown rule treats
every label alike — which letter occupies a slot never changes the length,
only how many runs of each label remain and when each becomes runnable again.
A max-heap of remaining counts holds the labels free right now. When a label
runs, its count drops by one, and if anything is left the label joins a
cooldown queue stamped with the slot at which it may run again — the current
slot plus `n + 1`. That queue is a plain FIFO: a run at slot `t` frees at
`t + n + 1`, so entries leave in exactly the order they entered. Each tick of
the clock releases every expired entry back into the heap, runs the largest
count, and steps one slot.

Idle slots cost no loop iterations. When the heap empties, every remaining
label is still cooling, and the clock jumps straight to the earliest release:
the slots in between are forced empty no matter what, so ticking through them
one at a time buys nothing. In example 1 the clock runs `C`, `D`, `E`, then
jumps `3 → 6 → 9` for the last three `C` runs, landing on 10 without ever
counting the six empty slots individually. Example 3 fills more of the gaps —
`G H J K G H`, then a single jump to slot 8 for the last `G` — and lands on 9.

The greedy always finishes in the provably smallest number of slots, which is
why it agrees with the closed form below on every input: the fill order
described there — labels in decreasing order of what remains — is precisely
the rule this heap applies, so the simulation reaches the same length while
never having to know the formula. The price of not knowing is the heap: every
one of the `T` runs pays a push and a pop over at most 26 counts.

**Complexity:** `O(T log 26)` time, `O(1)` space — heap and cooldown queue
never hold more than one entry per letter.

## Frequency Formula

Instead of simulating a scheduler, the solution derives the schedule length in closed form from the task frequencies. The most frequent letter is the bottleneck: its occurrences must be spaced `n + 1` slots apart, so it alone frames `(max_freq - 1)` full cycles of length `n + 1`, followed by a final partial run. If `num_max` letters tie for the maximum frequency, each of them occupies one slot in that final run, giving `(max_freq - 1) * (n + 1) + num_max` intervals.

That frame is a lower bound, but it is only the answer when idle slots actually appear. When there are enough distinct tasks to fill every gap, the schedule has no idling at all and the total is simply the number of tasks. The two cases are reconciled by taking the maximum of the two quantities: the frame bound dominates when tasks are too homogeneous to fill the gaps, and the task count dominates otherwise.

Computing the inputs is one pass with a `Counter`, then a scan over its values (at most 26, one per letter) for the maximum frequency and the number of letters achieving it. The cooling bound `n` can be 0, in which case the frame formula collapses toward the task count and the maximum still returns the right value.

No per-task bookkeeping or heap is needed — the whole answer is three arithmetic operations on two statistics.

**Complexity:** `O(T)` time, `O(1)` space, where `T` is the number of tasks.
