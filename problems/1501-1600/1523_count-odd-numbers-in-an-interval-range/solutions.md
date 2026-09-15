# Solutions — Count Odd Numbers in an Interval Range

## Closed-form count

Counting the odd numbers up to some non-negative bound `n` (inclusive) has a
direct formula: there are `(n + 1) / 2` of them, using integer (floor)
division. Half of every pair `{2k, 2k+1}` is odd, and the `+ 1` before
dividing accounts for the extra odd value when `n` itself is odd — check it
against `n = 0` (`0` odds), `n = 1` (`1` odd), and `n = 4` (`2` odds: `1, 3`)
to see the pattern hold.

The count of odd numbers in `[low, high]` is then the difference of two such
prefix counts: the odds up to `high` minus the odds strictly below `low`,
where "strictly below `low`" is exactly the odds up to `low - 1`, which
equals `low / 2` by the same formula (the `+ 1` and the `- 1` cancel). So the
answer is `(high + 1) / 2 - low / 2`. Every division here is a floor
division of non-negative operands — the input constraints guarantee
`low >= 0`, so no language's rounding-toward-zero-versus-negative-infinity
distinction for integer division ever comes into play.

**Complexity:** `O(1)` time, `O(1)` space.
