# Solutions — Special Array With X Elements Greater Than or Equal X

## Sort and Scan

There are only `n + 1` numbers worth trying for `x` — `0` through
`nums.length` — because no candidate above the array's length can ever
have that many elements meeting or beating it. Sorting `nums` in
descending order turns "how many elements are `>= x`" into a question
about a prefix: after the sort, the count of elements `>= x` for a
candidate `x = i` is exactly `i` precisely when the `i`-th largest value
is still `>= i` while the next one drops below it (or `i` is the last
position, so there is no next one to check). Since every element is
non-negative, `x = 0` would need zero elements `>= 0`, which only holds
for an empty array; the statement guarantees at least one element, so `0`
never has to be tried and the scan can start at `1`.

The code sorts once — `O(n log n)` — and then walks the sorted array a
single time, checking each position against this prefix condition. The
first position that satisfies it is returned immediately; if none does,
the array has no special value and the result is `-1`.

Uniqueness follows from the same shape: the count of elements `>= x` is a
non-increasing step function of `x`, while `x` itself increases by one at
each step, so the two curves — count-of-elements-at-least-x, and x itself
— cross at most once. A candidate array can therefore never satisfy the
condition for two different values of `x`, and the scan can safely return
on the first match without checking the rest.

**Complexity:** `O(n log n)` time, `O(1)` extra space.
