# Solutions — Find the Minimum Number of Fibonacci Numbers Whose Sum Is K

## Greedy largest-Fibonacci subtraction

Repeatedly subtract the largest Fibonacci number not exceeding the remaining `k`. This is optimal by Zeckendorf's theorem: every positive integer decomposes uniquely as a sum of non-consecutive Fibonacci numbers, and that representation is the one with the fewest terms. The greedy choice always lands on it — after taking the largest `F <= k`, the remainder is smaller than the previous Fibonacci number `F'` below `F` (otherwise `F + F' = F''`, the next Fibonacci number, would itself have fit), so the greedy never takes two consecutive Fibonacci numbers and never takes the same number twice, matching the Zeckendorf form exactly.

Any representation with fewer terms would, by the pigeonhole over the greedy's strict decrease, force either a consecutive pair (which merges into the next Fibonacci number) or a duplicate (and `F + F = F' + F''`-style collapse also merges upward), contradicting minimality — so greedy is unbeatable.

The implementation first generates all Fibonacci numbers up to `k` (there are only about 45 of them for `k <= 10^9`, since Fibonacci grows exponentially), then walks an index downward from the largest: skip entries bigger than the current remainder, subtract the first fitting one, count it, and repeat. The index never moves back up, so the subtraction loop is a single downward sweep over the short list and terminates when `k` reaches 0 — which it must, because the list bottoms out at 1.

Edge cases: `k = 1` subtracts the base `1` once; `k` exactly equal to a Fibonacci number takes it in one step. No table beyond the generated list is stored.

**Complexity:** `O(log k)` time, `O(log k)` space.
