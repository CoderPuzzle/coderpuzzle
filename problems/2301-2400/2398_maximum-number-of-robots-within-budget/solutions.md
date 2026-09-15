# Solutions — Maximum Number of Robots Within Budget

## Sliding window with a monotonic deque

The cost of a window of `k` consecutive robots is `max(chargeTimes) + k * sum(runningCosts)`, and every input is positive, so cost is monotone in the window: growing the window can only increase it. That monotonicity makes a classic two-pointer sliding window valid for maximizing length under a budget — expand the right end one robot at a time, and while the window's cost exceeds the budget, shrink from the left; record the best length seen.

The only nontrivial part is the window maximum of charge times, maintained by a monotonic deque of indices whose charge times are strictly decreasing: before appending `right`, pop indices from the back whose charge time is `<=` the new one, since they can never be the maximum again; the front always holds the argmax. When the left pointer passes the front index, the front is popped so stale maxima never linger. The running-cost sum is a plain accumulator, incremented on the right and decremented on the left.

![Three window states over the example robots: the best window [0, 2] costs 6 + 3 × 6 = 24, adding robot 3 pushes it to 6 + 4 × 10 = 46 over budget, and shrinking to [2, 3] drops the deque front so the new maximum is 3 for a cost of 17 — the longest affordable run stays 3.](figures/solution-window-deque.svg)

Each index enters and leaves the deque at most once, so the whole sweep is linear even though the inner loops are nested. Shrinking can empty the window entirely (the deque then holds nothing and the cost check short-circuits), which is how an input where even the cheapest single robot exceeds the budget correctly yields 0.

**Complexity:** `O(n)` time, `O(n)` space.
