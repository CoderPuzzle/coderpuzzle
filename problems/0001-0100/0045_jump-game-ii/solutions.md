# Solutions — Jump Game II

## Greedy BFS over levels

Treat the array as a graph where index `i` edges to every later index it can jump to; the answer is the shortest path from 0 to the last index, which a breadth-first search finds level by level. Level `k` is the set of indices first reached in exactly `k` jumps, and because jumps only move forward the levels are consecutive blocks of indices. A whole level is summarized by one number — the furthest index `i + nums[i]` over its members — so the next block is simply the gap between that number and the previous level's. No queue is needed: the level structure can be reconstructed by a single left-to-right walk carrying two edges.

The walk keeps `nextEnd`, the furthest index anything scanned so far reaches; `currentEnd`, the right edge of the level being scanned; and `jumps`, the count of completed levels. Each time `index` catches up with `currentEnd` the level is exhausted, so the counter increments and the next level begins at `nextEnd`. The loop deliberately stops before the last index: landing there is the goal, not a jumping-off point, so a single-element array never enters the loop and costs 0 jumps. The statement guarantees the last index is reachable, which means every exhausted level extends strictly past its own right edge and the walk can never stall. All seven ports are this same six-line walk — only the spelling of `max` differs between the languages.

**Complexity:** `O(n)` time, `O(1)` space.
