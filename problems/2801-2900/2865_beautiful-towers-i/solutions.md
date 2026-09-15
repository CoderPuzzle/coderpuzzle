# Solutions — Beautiful Towers I

## Monotonic stack over both slopes

Fixing the peak at index i fully determines the heaviest mountain reaching
it: every tower left of i is pressed down to the running minimum between
itself and the peak, every tower right of i likewise, and no removal plan
can do better because each kept height is already the largest value the
non-decreasing and non-increasing rules allow at that position. So compute
two sweeps — `left[i]`, the heaviest non-decreasing ramp ending at i, and
`right[i]`, the mirror image — and the mountain peaking at i weighs
`left[i] + right[i] - heights[i]`, since the peak tower itself is counted
by both sweeps. The answer is the largest such value over all i.

The two sweeps are the same routine run once forwards and once backwards,
and a monotonic stack of runs makes each one linear. The stack holds pairs
of (height, width) describing clamped towers in strictly rising order,
together with a running total of the ramp so far. When the next tower is
lower than the stack top, every taller run is unkeepable — its towers must
all drop to the new height — so the runs are popped, their combined width
absorbed, and the total is repaired with one multiplication
`heights[i] * width` instead of visiting each tower separately. Each tower
is pushed once and popped at most once, so a sweep over n towers costs O(n)
despite the clamping chains it encodes.

Two size notes keep the implementation honest. The heaviest possible
answer is `10³ · 10⁹ = 10¹²`, beyond 32-bit range, so C++, Java, and Rust
accumulate in 64-bit integers; JavaScript numbers are exact up to 2⁵³,
comfortably above 10¹². And because each sweep visits every tower a
constant number of times, the whole algorithm is a couple of linear passes
with O(n) stack and answer arrays.

**Complexity:** `O(n)` time, `O(n)` space.
