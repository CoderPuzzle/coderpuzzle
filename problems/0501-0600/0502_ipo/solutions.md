# Solutions — IPO

## Greedy Sweep with a Max-Heap

At every moment the only freedom is which affordable project to finish next, and the greedy choice is the affordable one with the largest profit: finishing it only adds capital, so the set of affordable projects never shrinks, and no cheaper-profit choice can ever unlock something better later (an exchange argument swaps any first pick for the maximum-profit one without loss). The algorithm therefore repeats at most `k` times: among all projects whose capital requirement is met, take the maximum profit, add it to the capital, repeat.

The implementation makes each pick cheap by pre-sorting the projects by required capital and sweeping a pointer forward. Whenever the current capital meets `projects[index][0]`, that project becomes affordable forever, so its profit (negated, to invert Python's min-heap) is pushed onto a heap once — no project is ever pushed twice. A pick is then a single `heappop`, after first draining every newly affordable project into the heap.

Two terminations matter. The loop runs only `min(k, n)` times because at most `n` distinct projects can be finished, and it breaks early if the heap is empty — meaning capital is too low to start anything left, so picking must stop even though the quota remains. The final capital counter accumulates every popped profit, and since all profits are non-negative the greedy never regresses.

**Complexity:** `O(n log n)` time, `O(n)` space.
