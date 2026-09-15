# Solutions — Count Substrings That Differ by One Character

## Two rolling DP tables, keyed by ending position

Fix a pair of starting indices in `s` and `t` and walk both strings forward
in lockstep: the running count of mismatched characters can only grow as
the compared length grows, it never drops back down. That monotonicity
means, for any fixed pair of _ending_ positions, the lengths ending there
with zero mismatches and the lengths ending there with at most one
mismatch each form a prefix of lengths — so tracking just the longest such
run at every ending position is enough to recover the count with exactly
one mismatch as their difference.

The code keeps two tables over ending positions `(i, j)`: `same[i][j]` is
the length of the run of exact matches ending at `s[i-1]` and `t[j-1]`,
and `diff[i][j]` is the length of the run ending there with exactly one
mismatch. When the two trailing characters agree, extending the previous
diagonal position by this matching pair leaves both counts unchanged in
kind — `same[i][j] = same[i-1][j-1] + 1` and `diff[i][j] = diff[i-1][j-1]`.
When they disagree, this position must be the run's one mismatch, so it
can only extend back through whatever was a perfectly matching run just
before it: `same[i][j] = 0` and `diff[i][j] = same[i-1][j-1] + 1`. Every
`diff[i][j]` already counts exactly the substring pairs ending at `(i, j)`
that differ by one character, so summing it over all `i, j` is the answer;
no separate one-mismatch bound needs to be subtracted from anything else.

Since row `i` of both tables reads only row `i - 1` at the diagonal
neighbor, each pass only needs the previous row, and the two `n x m`
tables never exist in full — the running total is accumulated cell by
cell as the rolling rows are filled.

**Complexity:** `O(n * m)` time, `O(m)` space, where `n = s.length` and
`m = t.length`.
