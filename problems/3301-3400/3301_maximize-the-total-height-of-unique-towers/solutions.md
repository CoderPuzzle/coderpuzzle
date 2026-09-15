# Solutions — Maximize the Total Height of Unique Towers

## Sort descending and cap each height by the previous one

Every tower wants its own cap, but heights must be pairwise distinct and
positive, so the best any tower can do is bounded by what the taller towers
before it have already consumed. Sorting `maximumHeight` in descending
order makes that bound exact for each position in turn: once the previous
tower took height `prev`, no later tower may take anything above `prev - 1`,
so its assigned height is `min(cap, prev - 1)`. If that value ever falls
below 1, some prefix of towers demands more distinct positive integers than
exist up to the largest cap, and by an exchange argument no rearrangement
can help — the assignment is impossible and the answer is -1.

The scan itself is a single pass over the sorted array carrying just `prev`
and the running total. Each step is constant time, so the cost is
dominated by the sort. The total can reach `10⁵ * 10⁹ = 10¹⁴`, far past
32-bit range but comfortably inside the `2⁵³` exactness window of doubles,
so the compiled languages accumulate in 64-bit integers (`long long`,
`long`, `int64`, `i64`) from the first addition and return a 64-bit answer;
JavaScript numbers hold these sums exactly.

**Complexity:** `O(n log n)` time, `O(1)` space (or `O(n)` where the sort
needs a copy).
