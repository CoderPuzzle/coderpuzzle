# Solutions — Compare Sums of Bitonic Parts

The strict increase followed by a strict decrease identifies the ascending
part during one left-to-right scan, while the total sum determines what
remains on the descending side.

## One-pass sum accounting

Add every element to `total`. An element belongs to the ascending part exactly
while it is the first element or is greater than its predecessor, so add those
elements to `ascending` as well and remember the largest value as the peak.
The elements omitted from `ascending` form the descending suffix without the
peak; therefore `descending = total - ascending + peak` adds the shared peak
back. Comparing the two sums gives `0`, `1`, or `-1` as required.

Each sum can reach `10⁵ * 10⁹ = 10¹⁴`, so the integral implementations use
64-bit accumulators. That bound is also below JavaScript's exact integer limit
of `2⁵³`, making `Number` arithmetic exact here.

**Complexity:** `O(n)` time, `O(1)` space.
