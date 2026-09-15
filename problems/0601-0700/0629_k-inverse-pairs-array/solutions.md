# Solutions — K Inverse Pairs Array

## Sliding-window DP on the inserted maximum

Build the array one number at a time, always inserting the largest so far.
Once `1..m-1` are arranged, dropping `m` into any of its `m` slots inverts
it with exactly the elements to its right — `m` is the maximum, so it
forms no other pairs and disturbs nothing already placed. Each arrangement
of `1..m` with `j` inverse pairs therefore splits uniquely into an
arrangement of `1..m-1` with `j-i` pairs plus a slot choice `i` in
`0..m-1`, giving `dp[m][j]` as the sum of `dp[m-1][j-i]` over that range,
seeded by `dp[1][0] = 1`. For `n = 3` the rows grow `[1]`, `[1,1]`,
`[1,2,2,1]` — `dp[3][0]` is the lone identity array and `dp[3][1]` counts
`[1,3,2]` and `[2,1,3]`, the two example answers.

The inner sum covers the contiguous range `dp[m-1][j-m+1 .. j]`, and as
`j` advances by one that range only slides: a fresh term enters on the
right while `dp[m-1][j-m]` leaves on the left. Keeping a running window —
add, subtract, reduce — makes each entry `O(1)` work, collapsing the
`O(n*k*min(n,k))` triple loop (a borderline `10^9` additions at the
`n = k = 1000` ceiling) to `n*k = 10^6` steps. Only two rows are live at
a time, so the table shrinks to a pair of length-`k+1` arrays swapped
each round; the window's left bound also reproduces the truncated sum at
each row's start for free, and entries past the fully reversed maximum
`n*(n-1)/2` fall out as zero because their windows run dry.

Every addition is reduced modulo `10^9 + 7` the moment it happens, so
table entries stay below the modulus — but the window's raw pre-reduction
value can reach `3 * (10^9 + 7)`, beyond 32-bit range. That is why the
fixed-width ports accumulate in 64-bit registers (`long`, `int64_t`,
`int64`, `i64`) and the JavaScript ports lean on doubles, which hold
every integer up to `2^53` exactly. The edge behavior needs no special
casing: `k = 0` always answers 1, the identity arrangement alone, and the
fully reversed arrangement is alone at the maximum.

**Complexity:** `O(n * k)` time, `O(k)` space.
