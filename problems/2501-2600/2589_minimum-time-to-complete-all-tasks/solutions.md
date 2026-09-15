# Solutions — Minimum Time to Complete All Tasks

## Latest-Time Greedy Scheduling

Process the tasks in ascending order of `end` and satisfy each one by
running it as late as possible. Booking a second at time `t` can only
help future tasks whose windows contain `t`, and windows processed later
end no earlier than the current one, so committing to the tail of the
current window is never worse than committing anywhere else inside it.
Because the timeline has at most 2000 points, a boolean array marks which
seconds are already on.

Per task, two linear passes over its window suffice: first count the
already-running seconds inside `[starti, endi]` and subtract them from
`durationi`; then walk backwards from `endi`, switching on free seconds
until the deficit is covered. Every switch-on increments the running
answer. The exchange argument above makes the resulting schedule optimal,
not merely feasible: any optimal solution can be reshaped, task by task
in end-time order, into this latest-fit shape without growing.

The whole run is bounded by 2000 tasks times 2000 time points of window
work — a few million simple operations, comfortably within limits; all
values stay far below 32-bit range.

**Complexity:** `O(n log n + n · T)` time where `T = 2000` is the
timeline length, `O(T)` space.
