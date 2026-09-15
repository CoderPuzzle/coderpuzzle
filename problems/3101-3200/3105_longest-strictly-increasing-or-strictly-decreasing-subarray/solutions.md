# Solutions — Longest Strictly Increasing or Strictly Decreasing Subarray

Every maximal strictly monotone stretch of `nums` (increasing or
decreasing) covers all monotone subarrays it contains, and two stretches
never overlap in a useful way, so one pass that knows "how long is the
monotone run ending here" is already optimal book keeping.

## Track the run lengths ending at each index

Sweep once carrying two counters: `inc`, the length of the longest
strictly increasing subarray ending at the current index, and `dec`, the
same for strictly decreasing. When `nums[i]` rises above `nums[i - 1]`
the increasing chain extends and the decreasing chain restarts; when it
falls, the roles swap; an equal neighbor kills both chains. The answer is
the largest value either counter ever reaches — with a single element
arrays the loop never runs and the initial answer of 1 stands.

The exchange rule means each index participates in exactly one direction,
so every subarray is counted by exactly one counter state and no case
slips through: plateaus reset both counters because strictness forbids
equal neighbors. All arithmetic stays far below any integer boundary
(lengths are bounded by n <= 50).

**Complexity:** `O(n)` time, `O(1)` space.
