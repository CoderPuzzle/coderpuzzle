# Solutions — Pour Water

## Straight simulation of the droplet rule

Every droplet follows the same deterministic journey, so the whole answer is one
simulation: settle `volume` units of water one at a time on a surface whose
levels are terrain plus already-settled water. A droplet that lands at `k`
probes left first. Walking left is only allowed onto the same level or a lower
one, so the probe slides down the non-increasing stretch that starts at `k`; if
that stretch ends strictly below the landing level, moving left would
"eventually make it fall" and the droplet settles on the nearest cell of the
lowest stretch — the plateau-return walk — not the far end, because cells equal
to the lowest level it has already reached cannot make it fall any further.

If the left stretch never dips below the landing level, the droplet tries the
same probe to the right, settling on the nearest cell of the right side's lowest
stretch. When neither direction can make it fall, the droplet rises at its
current position, which is `k` itself — the landing cell is the only place the
two failed probes leave it. Each settled unit raises exactly one column, and
the next droplet probes the updated surface, so no state beyond `heights`
itself is needed.

Each droplet costs at most one left sweep plus one right sweep of the array, so
`v` droplets over `n` columns stay linear per droplet; the surface is updated
in place and returned as the answer.

**Complexity:** `O(v·n)` time, `O(n)` space.
