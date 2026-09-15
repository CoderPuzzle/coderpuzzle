# Solutions — Find the Number of Possible Ways for an Event

## Stirling Dynamic Programming and Stage Weights

Count by the shape of the assignment instead of the performers' order. Let
`dp[j]` be the number of ways the first `i` performers can occupy exactly
`j` of the `x` stages as `j` nonempty bands — which stages those are
included. The next performer has exactly two kinds of move: join one of the
`j` bands already on stage (`j` extensions of every `j`-state), or start a
new band on one of the `x − j + 1` still-unused stages (an extension of the
`j − 1`-states). Walking `j` downward lets one row of `x + 1` entries carry
the whole build from `i = 1` to `i = n`, starting from the empty
arrangement.

A configuration with `j` bands is only half an event: the jury awards each
of the `j` bands a score from `1` to `y` independently, multiplying its
contribution by `y^j`. The answer is therefore `Σ dp[j] · y^j` over `j`,
taken modulo 10⁹ + 7. Every stored residue is below 2³⁰, and each
transition's largest product is about 10¹² — well inside 64-bit integers
where they exist; JavaScript relies instead on a split multiply that keeps
every product under 2⁴⁶, comfortably inside Number's exact range. The whole
computation is two nested bottom-up loops, so no recursion appears even at
n = x = 1000.

**Complexity:** `O(n * x)` time, `O(x)` space.
