# Solutions — Parallel Courses II

## Bitmask Dynamic Programming Over Taken Sets

With n at most 15, the set of courses already taken fits in a 15-bit mask, and dp[mask] is the minimum number of semesters needed to have taken exactly the courses in mask. Every transition adds courses to the mask, so a transition target is always numerically larger than its source, and filling the table in increasing mask order guarantees every predecessor is final before it is read.

From a reachable mask, the available courses are those not yet taken whose full prerequisite set is already contained in the mask; precomputing one prerequisite bitmask per course turns this into a single AND per course. If at most k courses are available, all of them are taken in one semester. When more than k are available, only subsets of exactly k are considered. The exchange argument that justifies skipping smaller semesters is that taking an extra available course never hurts: an added course only enlarges the mask, which can only make courses available sooner, so any optimal schedule can be rewritten to take min(k, available) courses every semester without needing more semesters; which k courses to take is still a real choice, hence the enumeration of combinations.

Unreachable states are parked at a sentinel of n + 1 semesters and skipped when popped, so they never pollute transitions; the input guarantees all courses can be taken, making the full mask reachable. States with few available courses transition once, while states with many available enumerate C(a, k) semesters of size k each — the dominant cost when k sits near half of n.

**Complexity:** `O(2^n · (n + C(n, k) · k))` time, `O(2^n)` space.
