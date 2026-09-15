# Solutions — Maximum Fruits Harvested After at Most K Steps

## Sliding Window over Sorted Positions with Prefix Sums

Any optimal walk turns at most once: going left, turning right, and turning again never beats a single-turn route, so the harvested fruits always form one contiguous interval of the (position-sorted) fruit array. The cheapest cost of covering an interval `[left_pos, right_pos]` starting from `startPos` is `right_pos − startPos` if the start lies left of the interval, `startPos − left_pos` if it lies right of it, and otherwise the better of going left first (`2·(startPos − left_pos) + (right_pos − startPos)`) or right first (`2·(right_pos − startPos) + (startPos − left_pos)`).

The solution precomputes a prefix-sum array over fruit amounts, then runs a two-pointer sweep: for each right endpoint it advances the left pointer while the interval's cost exceeds `k`, and whenever the current window is affordable it takes the window's fruit sum via `prefix[right + 1] − prefix[left]` as a candidate answer. Since both pointers only move forward over the sorted positions, the sweep is linear after the prefix construction.

Because each fruit position is unique and the window is contiguous, the answer covers exactly the positions visited by the corresponding single-turn walk. Edge cases fall out naturally: a window containing only the start position has cost 0, a single unreachable fruit keeps the window from being counted (the feasibility re-check before updating `best`), and when no fruit is reachable the answer stays 0.

**Complexity:** `O(n)` time, `O(n)` space, where n is the number of fruit positions.
