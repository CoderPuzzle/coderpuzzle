# Solutions — Unique 3-Digit Even Numbers

The answer depends only on the multiset of supplied digits, not their
order, and the target space is tiny: at most 900 three-digit numbers, of
which only the 450 with a nonzero hundreds digit and an even units digit
can ever qualify.

## Digit tally, then candidate enumeration

Tally the supply into a 10-slot count array first. Then enumerate the 450
candidate numbers directly — hundreds digit 1 through 9 (no leading
zeros), tens digit 0 through 9, units digit one of the five evens — and
for each candidate build its 10-slot `need` array and keep it when
`need[v] <= counts[v]` holds for every digit `v`. This checks the
"each copy used once" rule exactly as a multiset-containment test, so
duplicates like `[0,2,2]` correctly yield both 202 and 220 while `[1,2,3,4]`
correctly refuses 222.

Each candidate costs a constant-size comparison of two length-10 arrays,
and the array itself has at most 10 elements, so the whole computation is
bounded by constants from the constraints. The count never exceeds the
450 candidates enumerated, comfortably inside every integer width.

**Complexity:** `O(1)` time, `O(1)` space — the candidate grid is fixed at
450 and `digits.length <= 10`.
