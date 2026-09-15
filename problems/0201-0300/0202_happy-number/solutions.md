# Solutions — Happy Number

Both variants stand on the same fact: summing digit squares is a fixed
function of its input, so the sequence it generates from `n` is completely
determined — a tail leading either to the fixed point `1` or into a cycle
that never contains `1`. Deciding happiness is cycle detection on that
sequence. The hash variant remembers every value it has produced and
answers at the first repeat; the Floyd variant sends two runners at
different speeds and remembers nothing.

## Hash Set Cycle Detection

Replacing a number with the sum of the squares of its digits is a deterministic function on the positive integers, so iterating it from any starting value must eventually either reach 1 (which is a fixed point) or fall into a cycle that never contains 1. The algorithm simply runs the iteration and records every value it produces in a `seen` set: if a value repeats, the process is cycling and will never reach 1, so the number is unhappy; if the value 1 appears first, the number is happy.

Each step extracts digits with `divmod(m, 10)` and accumulates their squares, discarding the digit as it goes, so one step costs time proportional to the number of digits. The sequence stabilizes quickly in magnitude: for any 32-bit input, the first step lands at most at 810 (ten digits of 9 give 10 × 81), and every later value stays below that, so both the loop and the set remain small regardless of the starting size.

The loop condition `while n != 1 and n not in seen` handles the happy case (`n = 1` exits and the final comparison returns true) and the unhappy case (a revisit exits with `n != 1`) with the same check, and the input 1 itself returns true without a single step.

**Complexity:** `O(log n)` time, `O(log n)` space.

## Floyd Cycle

Read the sequence as a linked list — each value points at its one
successor, because the map is fixed — and the question becomes whether
following links from `n` reaches `1`. Tortoise and hare answer it with two
runners instead of a ledger. The tortoise advances one step per round, the
hare two, so the hare gains exactly one position per round; both runners
start on the move (`slow` one step past `n`, `fast` two), so an input
already at `1` never enters the loop at all — the runners are born equal.

From there the chase resolves itself. A happy start parks both runners on
`1`, which maps to itself, and they meet there. An unhappy start funnels
both into the cycle, and inside a cycle a one-position-per-round lead can
only shrink — the hare laps the tortoise, and they collide somewhere on the
loop. Either way the loop exits with `slow == fast`, and the meeting point
decides the verdict: `1` means the start was happy, anything else sits on a
cycle that avoids `1`.

The bookkeeping is the point: no `seen` set, no history — two integers of
state. The chase is also short, because magnitudes collapse below 810 in
one step and the unhappy cycle has length eight, so only a handful of
rounds can pass before the runners meet; the first step's digit peel
dominates the cost.

**Complexity:** `O(log n)` time, `O(1)` space.
