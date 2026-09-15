# Solutions — Delete Columns to Make Sorted II

The grid reads two ways at once: down each column and across each row. Only
the row reading matters here — the shortened strings must stand in
dictionary order — yet deletions happen a column at a time, so a column's
verdict depends on which adjacent row pairs are still undecided. Carrying
those decisions from left to right turns a global ordering question into a
sequence of local, tie-aware verdicts.

## Greedy Scan with Tie Tracking

Keep one flag per adjacent row pair, recording whether that pair is already
strictly ordered by the columns kept so far. Scan the columns left to
right. A column is condemned exactly when it strictly decreases some
still-tied pair; it is deleted, and no flag moves. A column that passes is
kept, and every still-tied pair on which it strictly rises becomes ordered
— later columns can no longer disturb that pair. Equal characters move
nothing: the pair stays tied and the verdict is deferred, which is why a
run of identical prefixes can push the decisive column to the very edge of
the grid. Only surviving characters are ever compared, so deleted columns
simply cease to exist.

Every deletion the scan makes is forced. When column j is condemned, some
pair is equal on every column kept before j and drops at j. A dictionary
comparison of those two rows finds its first differing surviving character,
and if j survives, that first difference is a drop — no column after j can
be read before it, so no valid solution keeps j.

Every keep is safe, which makes the count minimal. Un-deleting a column
the scan kept never breaks a solution: judged against the pairs unsettled
at that point, the column either rises (settling them) or ties (leaving
them), and pairs already settled stay settled regardless. So some optimal
solution agrees with the scan choice by choice, and the tally of condemned
columns is both achievable and irreducible. The scan needs the flags and a
counter beyond the input itself.

**Complexity:** `O(C)` time, `O(n)` space.
