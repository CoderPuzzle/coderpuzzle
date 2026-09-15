# Solutions — Count Artist Occurrences On Spotify Ranking List

The ranking list is a bag of rows; the answer collapses that bag into
one row per distinct artist carrying its size, then orders those rows.

## Group by artist and order by the count

`GROUP BY artist` forms one bucket per distinct name and `COUNT(*)`
measures each bucket's size — the number of ranked tracks that name
appeared on. Names are compared as stored text, so `'Sia'`, `'sia'`,
and `'SIA'` stay separate artists and names differing only by a trailing
space never merge; every character counts.

The ordering clause produces exactly the required table: `occurrences`
descending puts the most-played artists first, and `artist` ascending
breaks ties deterministically, so equal-count groups come out in
alphabetical order. An empty ranking list simply yields no buckets and
an empty result table, needing no special case. The `track_name` values
ride along in the rows but are irrelevant to both stages.

**Complexity:** `O(n)` time to scan the `n` ranking rows, plus
`O(a log a)` to order the `a` distinct artists; `O(a)` space.
