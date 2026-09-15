# Solutions — Count Integers in Intervals

## Disjoint Sorted Intervals with a Running Coverage Total

The set only ever grows, so the natural representation is the union itself:
a sorted list of pairwise-disjoint intervals. `count` then never has to walk
it — the class carries `covered`, the running total of the integers in the
union, and every mutation corrects it by exactly what it removes and adds.

Adding `[left, right]` must restore disjointness. In a disjoint family
sorted by start, the ends are sorted as well, which pins the victims down:
any interval overlapping `[left, right]` has start `<= right` and end
`>= left`, and both conditions carve contiguous ranges — a prefix of the
family by start, a suffix of that prefix by end. Two binary searches locate
the run; the run plus the new interval is replaced by their hull, with
`covered` adjusted by subtracting each swallowed interval's size and adding
the hull's. Swallowed intervals are gone for good, so the total swallowing
over the run is bounded by the number of adds — the follow-up's amortization.

The Python canonical solution keeps `starts` and `ends` as parallel lists so
both binary searches are plain `bisect` calls over integers, splicing with
slice deletion. The Java one uses a `TreeMap` keyed by start (`floorEntry`
walks the overlapping run from the greatest start downward) and accumulates
coverage in a `long`. Both implement exactly the same algorithm.

**Complexity:** `O(log n)` plus the number of intervals merged per `add`,
`O(1)` per `count`, amortized `O(log n)` per add overall; `O(n)` space.
