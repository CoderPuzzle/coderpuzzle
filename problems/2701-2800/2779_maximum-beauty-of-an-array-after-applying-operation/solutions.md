# Solutions — Maximum Beauty of an Array After Applying Operation

## Sort and slide a window of intersecting ranges

An element can only ever take a value inside `[nums[i] - k, nums[i] + k]`:
operating on it moves it anywhere in that range, and leaving it alone keeps
it where it started, which is inside its own range. So a set of elements can
be made equal exactly when their ranges share a common value — for two
elements `i` and `j` that means `|nums[i] - nums[j]| <= 2k`, because the
ranges intersect precisely when the values differ by at most `2k`. The
shared value may be any integer in the intersection, even a negative one;
nothing in the operation requires a non-negative result, and the criterion
only ever looks at how far apart two original values are.

After sorting, the extremes of any candidate group bound every pair inside
it: if the largest and smallest differ by at most `2k`, so does every pair,
and one shared value exists for the whole group. A maximal group is
therefore a contiguous run `A[left … right]` with `A[right] - A[left] <= 2k`,
which is exactly the shape Hint 2 names. A sliding window finds the widest
such run: grow `right`, and while the extreme difference exceeds `2 * k`
advance `left`. The best length seen is the answer — a longer window is
never found by shrinking, so no dropped member needs revisiting.

Edge behaviors fall out for free: the answer is at least 1 because a single
element is always a valid group; `k = 0` degenerates to counting the most
frequent value, since nothing can move; and when `2 * k` spans the whole
sorted array the window simply grows to `n`.

**Complexity:** `O(n log n)` time, `O(n)` space.
