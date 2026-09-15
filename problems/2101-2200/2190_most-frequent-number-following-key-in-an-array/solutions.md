# Solutions — Most Frequent Number Following Key In an Array

## Count followers of each key occurrence

One pass over adjacent pairs: every time `nums[i]` equals `key`, bump
the counter for `nums[i + 1]`. The answer is the value with the largest
counter; the constraints promise it is unique, so no tie-breaking is
needed.

**Complexity:** `O(n)` time, `O(u)` space for `u` distinct values.
