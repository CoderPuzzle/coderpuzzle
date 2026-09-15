# Solutions — Count Ways to Group Overlapping Ranges

## Merge Overlap Components

"Must share a group with every range it touches" is an equivalence
closure: overlapping is symmetric, and the relation forced onto ranges
is the transitive closure of it, so the valid groupings are exactly the
assignments of whole overlap-components to one of the two groups. A
component placed in a group contributes all its member ranges at once,
components never constrain each other, and swapping every component to
the opposite label turns any grouping into its mirror — so counting
components answers everything.

Sorting by start point lines the transitive closure up into
contiguous runs (the hint's "merge" without materializing merges): one
sweep carries the furthest end reached so far, and each time a start
lands strictly beyond that reach a new run begins. Endpoints are
inclusive integers, so equality still counts as overlapping. Since n
can be 10⁵ but exponentiation only needs log n iterations, `2^(runs)`
is raised by iterative binary exponentiation modulo 10⁹ + 7; the typed
languages square in 64-bit words (intermediates ≈ 10¹⁸ stay inside the
9.2·10¹⁸ i64 ceiling), and JS/TS keep exactness with an add-doubling
mul-mod whose values never approach 2³¹.

**Complexity:** `O(n log n)` time for the sort, `O(1)` extra space
(in-place aside) after sorting.
