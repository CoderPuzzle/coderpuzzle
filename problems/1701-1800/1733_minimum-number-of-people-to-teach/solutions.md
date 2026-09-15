# Solutions — Minimum Number of People to Teach

Exactly one language may be taught, which splits the friendships cleanly: a
pair that already shares some language is settled forever and can be
discarded, while every remaining needy pair must end up with both sides
knowing the chosen language. A user takes part in many needy pairs but is
only ever taught once, so the problem reduces to picking the language that
the fewest needy participants lack.

## Per-language sweep over pre-filtered pairs

Build a `known[user][language]` table from `languages` (users and languages
are numbered from 1, bounded by 500 each). Then walk `friendships` once and
keep only the needy pairs — those whose two rows share no language; with
`n, m, f <= 500` the intersection check per pair is at most `n` probes.
Everything after this filter ignores the settled pairs entirely, because
teaching can only add knowledge, never remove a shared language.

Then sweep every language `L` from 1 to `n`, including languages nobody
knows, and count the users to teach: for each needy pair, each side that
does not know `L` must be taught. Mark counted users in a `taught` array so
a user appearing in several needy pairs increments the count exactly once —
this is where the non-transitive, duplicate-heavy friendship lists are
tamed. The answer is the minimum count over the sweep.

**Complexity:** `O(n * (m + f))` time, `O(m * n)` space.
