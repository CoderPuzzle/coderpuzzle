# Solutions — Find the Maximum Divisibility Score

## Direct Divisibility Counting

The statement hands us the scoring rule directly, so the simplest correct
mechanism is also fast enough here: for every divisor `divisors[i]`, walk
all of `nums` once and count how many entries it divides evenly. With both
arrays capped at 1000 elements that is at most 10⁶ modulo checks — a
handful of milliseconds in any compiled language and comfortably inside
the limit even in Python.

While scoring each divisor we keep two running values, the best score seen
so far and the divisor that achieved it. A strictly larger score replaces
the incumbent outright; on a tie we replace it only when the new divisor is
smaller, which is exactly the "return the smallest one" rule stated by the
problem. Seeding the best score at −1 guarantees the first divisor becomes
the initial champion, so no special case is needed before the loop starts,
and duplicate divisor values need no handling of their own — an equal-valued
copy either loses the tie-break or matches the incumbent bit for bit.

**Complexity:** `O(n · m)` time, `O(1)` space.
