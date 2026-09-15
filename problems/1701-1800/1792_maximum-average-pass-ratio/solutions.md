# Solutions — Maximum Average Pass Ratio

## Greedy Max-Heap on Marginal Gain

Since the average divides by the fixed class count, maximizing it means maximizing the sum of pass ratios, and the classes contribute independently: assigning a student to class `(p, t)` raises its ratio by exactly `gain(p, t) = (p + 1)/(t + 1) - p/t`. That gain is always positive and strictly shrinks as the class absorbs more students (the ratio is concave in additions), so the problem is an allocation of identical units among concave resources — solved optimally by always giving the next unit where it buys the most.

The code implements this with a max-heap keyed on negated gain, built in one `heapify` over the classes. For each of the `extraStudents` students it pops the class with the largest current gain, increments both its pass and total counts, and pushes it back with its recomputed gain. Re-pushing is essential: after absorbing a student the class's gain drops, and a different class may now offer the best marginal return.

Optimality follows from the standard exchange argument for decreasing marginal returns: if an optimal assignment ever gives a student to a class whose gain at that moment was smaller than another's, swapping that student to the higher-gain class changes the total by the (non-negative) difference in gains, so the greedy choice is never worse. After the loop, the answer is the average of the final ratios read straight off the heap contents.

**Complexity:** `O(C + E log C)` time, `O(C)` space.
