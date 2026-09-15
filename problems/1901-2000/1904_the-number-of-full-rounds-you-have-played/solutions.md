# Solutions — The Number of Full Rounds You Have Played

A round is "fully played" only when it both begins at or after the login
and ends at or before the logout — the two partial rounds hugging the
session edges never count. Since rounds begin exactly on quarter hours,
the whole count is decided by where the session edges fall relative to
the 15-minute grid.

## Quarter-hour interval counting in minutes

Measure both timestamps in minutes past midnight. When `logoutTime` is
not after `loginTime` the session crosses midnight; adding one day —
1440 minutes — to the logout turns the wrapped session into a single
forward interval, which is exactly the hint's 48-hour picture. Every
operand then lies in `[0, 2880)`, trivially exact in every language's
integer type (and in a JS `number`).

On that interval a round starting at minute `s` counts exactly when
`login <= s` and `s + 15 <= logout`. The valid starts form a run of the
quarter-hour grid: the first is the grid point at or after the login,
`ceil(login / 15)`, and the last is the grid point whose round still ends
by the logout, `floor(logout / 15) - 1`. Their difference — clamped at
zero for sessions shorter than one full round — is the answer, computed
with integer division alone; the boundary-dense tests (login one minute
after a quarter, logout exactly on a round's end, the `23:45`→`00:00`
midnight wrap) all land on the closed form's inclusive edges.

**Complexity:** `O(1)` time, `O(1)` space.
