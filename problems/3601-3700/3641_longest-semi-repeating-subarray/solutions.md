# Solutions — Longest Semi-Repeating Subarray

## Frequency-counting sliding window

Extending a window can never repair it: every admitted element only grows
existing frequencies or creates new ones, so the number of values occurring
more than once moves monotonically up as the window stretches and down as
it shrinks. That monotonicity is exactly what a sliding window needs. Sweep
the right end across the array, keep a frequency map for the values inside
the current window, and maintain `dup` — the count of those values whose
frequency has reached two or more.

Each step admits `nums[right]`: bump its frequency, and if that bump took
the value from one occurrence to two, increment `dup`. While `dup > k` the
window holds too many repeating values, so evict `nums[left]`: dropping its
frequency from two back to one decrements `dup`, and the eviction repeats
until the window is legal again. Once it is, its length `right - left + 1`
is recorded — every legal subarray ending at `right` is no longer than this
maximal one, so the maximum over all right endpoints is the answer.

Both pointers cross the array exactly once, each element entering and
leaving the frequency map a single time despite the nested loop, and the
map never holds more than one entry per distinct value.

**Complexity:** `O(n)` time, `O(n)` space.
