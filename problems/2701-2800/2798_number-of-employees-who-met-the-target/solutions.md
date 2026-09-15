# Solutions — Number of Employees Who Met the Target

## Single counting pass

An employee met the target exactly when `hours[i] >= target`. Nothing needs
to be remembered between elements — no sums, no structures, no early exits —
so the whole task is one walk over the array that bumps a counter each time
the comparison holds. Because the requirement is "at least", an employee who
worked exactly `target` hours counts; `>=`, not `>`, is what makes Example 1
return 3 rather than 2.

The boundary cases fall out of the same rule without special handling: a
`target` of 0 qualifies everyone (even an employee with 0 hours), a `target`
above every value qualifies nobody and returns 0, and a single-element array
answers 0 or 1 depending on that one comparison.

**Complexity:** `O(n)` time, `O(1)` space.
