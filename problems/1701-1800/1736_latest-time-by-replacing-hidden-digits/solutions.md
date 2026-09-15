# Solutions — Latest Time by Replacing Hidden Digits

Only the two hour digits constrain each other — the minute pair can max
out at 59 under every hour, and a revealed digit in either field is simply
kept. The task reduces to giving each hidden digit the largest value its
seat allows, which for three of the four seats is unconditional and for the
fourth must consult its neighbor.

## Largest digit the partner allows

The tens seat of the hour is the most significant digit, so it decides
first. A hidden one wants `'2'`, since hours 20 through 23 are the largest
legal hours, and `'2'` is safe whenever the ones seat is hidden or already
holds at most `'3'`. When the ones seat is a fixed `'4'` through `'9'`,
prefixing `'2'` would build 24 or beyond, so the best legal tens digit is
`'1'`, giving 14 through 19 — and that fallback is exactly where the
statement's guarantee bites: a fixed ones digit that rules out `'2'` still
leaves a valid hour to build.

The ones seat of the hour then reads the tens seat's final value: under a
final `'2'` it caps at `'3'`, because the hour cannot pass 23; under `'0'`
or `'1'` it takes `'9'`. The order of the two fills is the whole trick —
the tens decision consults the original ones digit, the ones decision
consults the already-filled tens digit, never the reverse. The minute
seats need no consulting at all: a hidden tens-of-minutes takes `'5'` and
a hidden ones-of-minutes takes `'9'`, since 59 is a legal minute under
every hour.

Seat-by-seat maximization from most significant to least yields the latest
time because times compare in that same order: no minute gain can outweigh
a larger hour, so the largest legal hour tens digit, then the largest hour
ones digit it permits, then 59 minutes dominates every other completion at
the first seat where the two differ. Revealed digits pass through
untouched — only `'?'` seats are ever written.

**Complexity:** `O(1)` time, `O(1)` space.
