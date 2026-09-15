# Solutions — Find the Minimum Amount of Time to Brew Potions

The laboratory is a no-wait pipeline: potions flow through the wizards in a
fixed order, and a potion may never sit between two wizards. That "never
waits" rule is the whole difficulty — it makes each potion's passage a rigid
chain, and the only freedom left is when each chain begins.

## Rigid chains, a gap recurrence, and an upper-envelope query

Let `pref[i] = skill[0] + ... + skill[i-1]`. Once potion `j` starts at wizard
0 at time `s_j`, no-wait pins its entire schedule: wizard `i` finishes it at
exactly `s_j + mana[j] * pref[i+1]`. Wizard `i` can only take potion `j`
after finishing potion `j-1`, so `s_j` must satisfy
`s_j + mana[j] * pref[i] >= s_{j-1} + mana[j-1] * pref[i+1]` for every `i`,
and rewriting with `prev = mana[j-1]`, `cur = mana[j]` turns the binding
constraint into a gap recurrence:

    s_j - s_{j-1} = max_i ( prev * skill[i] + (prev - cur) * pref[i] )

Choosing each `s_j` minimally is globally optimal — every constraint on
`s_j` grows monotonically with `s_{j-1}`, so an earlier start can never
force a later one to wait longer, by induction. The answer is
`s_{m-1} + pref[n] * mana[m-1]`.

The maximand is a linear functional of the `n` points `(pref[i], skill[i])`:
`prev * (skill[i] + t * pref[i])` with `t = (prev - cur) / prev`, and `t` is
the only part that changes from potion to potion. So the inner work is an
upper-envelope query over the lines `skill[i] + t * pref[i]` — and since
`skill[i] >= 1`, the slopes `pref[i]` are strictly increasing, the hull
builds in one sorted pass, and each of the `m - 1` queries binary-searches
it with exact integer cross-multiplications (`q * (s_b - s_a) >= p *
(p_a - p_b)` for `t = p / q`), no real arithmetic anywhere. Each gap is at
most `5000 * (5000 + 25 * 10^6) ≈ 1.25 * 10^11` and the accumulated time at
most `≈ 6.25 * 10^14`: past 32 bits, so the fixed-width languages carry
every sum and product in 64-bit integers, while JavaScript's `Number` stays
exact because `6.25 * 10^14 < 2^53`.

**Complexity:** `O(n + m log n)` time, `O(n)` space.
