# Solutions — Exclusive Time of Functions

## Call Stack Simulation

The logs describe execution on a single-threaded CPU with a call stack, so the natural algorithm is to replay them while maintaining that stack. Each stack entry pairs a function id with a resume time — the timestamp at which that call last started or was resumed. The invariant is that time between events belongs to whichever call is on top of the stack.

A start log first bills the elapsed interval to the suspended caller: the current top of the stack gains `ts - resume_time` units, covering exactly the span it ran before being interrupted. The new call is then pushed with its own start timestamp. An end log closes the call on top: it pops the entry and credits `ts - start + 1` units, the inclusive convention matching the problem's rule that a function ending at timestamp `t` executes through the end of `t`. The parent underneath resumes at `ts + 1`, the first unit of time after the ended call.

Because time is always charged to the stack top at the moment it elapses, nested and repeated calls — including recursion, where the same id appears at several stack depths — are attributed correctly without any special casing: each call's segments simply accumulate into its id's total. Start/end events are guaranteed to interleave properly, so every pop finds its matching start.

Each log is parsed and processed once with constant stack work. The result array holds one entry per function id, and the stack depth is bounded by the number of simultaneously open calls.

Replaying Example 1 shows the stack settle each bill:

1. `0:start:0` pushes function 0 with resume time 0; the stack is `[0 @ 0]`.
2. `1:start:2` first bills `2 - 0 = 2` units to the suspended function 0, then pushes function 1 at time 2.
3. `1:end:5` pops function 1 and credits `5 - 2 + 1 = 4` (the inclusive convention); the parent resumes at time 6.
4. `0:end:6` pops function 0 and credits `6 - 6 + 1 = 1`, for totals `[3, 4]`.

**Complexity:** `O(L)` time, `O(n + L)` space, where `L` is the number of logs.
