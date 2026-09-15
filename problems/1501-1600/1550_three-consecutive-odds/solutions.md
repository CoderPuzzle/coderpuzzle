# Solutions — Three Consecutive Odds

## Running-length scan

The question only asks whether some window of three consecutive elements is
all odd, so there is no need to look at pairs of indices or build any
auxiliary structure — a single pass that tracks how many odd numbers have
been seen in a row is enough. Walk `arr` once: each time the current value
is odd, extend the running streak; each time it is even, the streak breaks
and resets to zero, since consecutive means adjacent, not merely present.

As soon as the streak reaches three the array is guaranteed to contain three
consecutive odds, so the method can return `true` immediately without
scanning the rest. If the loop finishes and the streak never reached three,
no window worked and the method returns `false`.

**Complexity:** `O(n)` time, `O(1)` space.
