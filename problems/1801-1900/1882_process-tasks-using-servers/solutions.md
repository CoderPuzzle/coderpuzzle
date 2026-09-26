# Solutions — Process Tasks Using Servers

## Two heaps: free and busy

Keep a min-heap `free` of available servers keyed by `(weight, index)`,
and a min-heap `busy` of running servers keyed by release time. Process
tasks in order, tracking `cur`, the time the next assignment can happen.
For each task: first pop every finished server (`release <= cur`) from
`busy` into `free`; if `free` is still empty, jump `cur` forward to the
earliest release in `busy` and drain again. Then take the `(weight,
index)`-smallest free server, record its index, and push it onto `busy`
with release time `cur + tasks[j]`.

![On example 1's servers [3,3,2] and tasks [1,2,3,2,1,2], the 0-7 second timeline shows each server's task bars and the drain-then-pop steps at t = 1 and t = 5, ending in ans = [2,2,0,2,1,2].](figures/solution-two-heap-timeline.svg)

The heap orders reproduce the statement's priority rules exactly:
`(weight, index)` picks the lightest then lowest-indexed server, and
draining everything released at or before `cur` handles simultaneous
wake-ups before any waiting task is assigned. Total work is one heap
push/pop per task plus one per server activation.

**Complexity:** `O((m + n) log n)` time over `m` tasks and `n` servers,
`O(n)` space.
