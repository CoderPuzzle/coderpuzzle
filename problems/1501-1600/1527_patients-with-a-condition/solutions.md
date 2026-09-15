# Solutions — Patients With a Condition

## Match the prefix at the start or after a space

`conditions` packs a variable number of codes into one string, separated
by single spaces, so a qualifying code can land in any position. Two
`LIKE` patterns cover both cases: `conditions LIKE 'DIAB1%'` catches a
code that opens the string, and `conditions LIKE '% DIAB1%'` catches one
that starts after some earlier code — the leading space in the pattern is
what pins `DIAB1` to the start of a code rather than letting it match
anywhere inside one. Without that space, `LIKE '%DIAB1%'` would also
accept a condition like `ACNEDIAB100`, where `DIAB1` sits mid-word rather
than beginning a code of its own; anchoring the match to a code boundary
is what keeps `DIAB1` a prefix match on a whole code instead of a
substring match on the raw string. `OR`-ing the two patterns together
selects a row as soon as either one succeeds, and a patient with no
matching code — or no conditions at all — satisfies neither and is left
out.

**Complexity:** `O(n)` time, `O(1)` auxiliary space, for `n` rows in
`Patients`.
