# Solutions — Maximum Students on a Single Bench

"Unique per bench" is a deduplication question, and the ids are bounded
(`1..100` on both sides), so the pairs can be deduplicated directly inside a
fixed bench-by-student grid instead of a hash map of sets.

## Mark pairs in a fixed grid, count firsts

Index a 101×101 grid by `[bench_id][student_id]` and keep a per-bench
counter. Each row of `students` checks its cell: if the pair has never been
seen, mark it and bump that bench's count; a repeat row — the same student
sitting on the same bench again — finds the cell already set and changes
nothing, which is exactly the "counted only once per bench" rule. A student
on two different benches occupies two different cells, so both benches keep
their own count.

After the pass, the answer is the largest per-bench count; the counters
start at zero, so an empty input maxes to 0 with no special case.

One pass over the rows plus a 101-slot maximum scan.

**Complexity:** `O(n + B)` time (`B = 101` bench slots), `O(B·S)` space
(`B = S = 101` grid).
