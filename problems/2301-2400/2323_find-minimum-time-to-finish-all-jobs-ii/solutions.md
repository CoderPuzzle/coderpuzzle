# Solutions — Find Minimum Time to Finish All Jobs II

## Sort both arrays, pair by rank

Sort `jobs` and `workers` ascending and give the k-th smallest job to the
k-th smallest worker; the answer is the largest `ceil(jobs[i] / workers[i])`
over those pairs. The pairing rule is an exchange argument. The day count
`ceil(j / w)` never decreases when the job grows and never increases when
the capacity grows. So whenever a smaller job holds the larger of two
capacities while a larger job holds the smaller one, swapping them leaves
the first pair no worse (its capacity only grew) and the second pair no
worse (its capacity only grew) — every other pair is untouched.

Each swap removes an inversion between the two sorted orders, so repeated
uncrossing terminates at exactly the rank-by-rank pairing with a maximum
day count no larger than any assignment it started from. That makes the
sorted pairing optimal, not merely plausible: whatever the optimum is,
uncrossing its inversions reaches the same value.

Ceiling division stays in integers throughout: `(j + w - 1) / w`, which
never overflows since both operands are at most `10⁵`.

**Complexity:** `O(n log n)` time for the two sorts, `O(1)` extra space
(beyond sorting).
