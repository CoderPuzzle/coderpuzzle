# Solutions — Count Houses in a Circular Street

An interactive walker cannot look at two houses at once: every fact it
learns arrives through one oracle call, and doors it leaves behind may or
may not still hold the state they had. With no memory of positions and no
way to tag a house directly, the only recognizable landmark is a door whose
state we control.

## Close everything, reopen one, walk a lap

The sweep is what makes the initial pattern irrelevant: walking right
through `k` consecutive houses and closing each door touches an arc that,
because `n <= k`, wraps across every house on the circle at least once.
Whatever mixture of open and closed doors greeted us at the start, after
`k` close-and-move pairs every door on the street is closed.

Reopening the door we now stand at plants the street's single landmark —
there is exactly one open door, and we know where it is. Walking right
from there and counting houses until `isDoorOpen()` fires again measures
the full circumference: from any house back to itself is exactly `n`
right-steps, so the count between leaving the marker and re-sighting it is
the answer. The walk always terminates within one lap because the marker
is genuinely reachable from every other house.

Every call — close, move, open, query — spends the same unit, so the run
is measured in oracle operations: `2k` for the closing sweep, one reopen,
and then `n` moves plus `n` queries for the lap, `2k + 2n + 2` calls in
total, bounded by about `4k` since `n <= k`.

**Complexity:** `O(k + n)` oracle operations (`≈ 2k + 2n + 2`, within the
1 000 000 budget), `O(1)` space.
