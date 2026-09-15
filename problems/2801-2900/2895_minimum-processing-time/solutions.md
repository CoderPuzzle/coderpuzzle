# Solutions — Minimum Processing Time

## Opposite-Order Greedy Pairing

Only the last task a processor finishes matters, so the makespan of an
assignment is the largest processorTime + task pair among its matches, and
the goal is to arrange the four-way grouping to minimize that largest pair.
Two exchange facts pin the optimum: an earlier-available processor should
never receive a larger task than a later-available one (swapping the two
tasks never raises any processor's finish time), and within a processor
only its largest assigned task matters. So sort processorTime ascending,
sort tasks descending, and hand the four largest tasks to the earliest
processor, the next four to the next processor, and so on — each processor
is characterized by its availability plus the largest of its four tasks.

Scanning the descending task list in blocks of four against the ascending
processor list, the answer is the maximum of processorTime[i // 4] +
tasks[i] over all i. This is optimal because any assignment leaving a
larger task with a later processor while an earlier processor holds a
smaller one can only be improved by the swap. Bounds stay comfortably in
signed 32-bit: every term is at most 10⁹, so each pair sum is at most
2 × 10⁹ < 2³¹ − 1.

**Complexity:** `O(n log n)` time, `O(n)` space, where n = tasks.length.
