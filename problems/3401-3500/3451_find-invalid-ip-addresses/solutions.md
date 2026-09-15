# Solutions — Find Invalid IP Addresses

An address is invalid for one of three independent reasons — an octet above
255, a leading zero inside an octet, or a dot count other than three — and
the report groups those invalid rows by address. SQLite has no `split`, so
the peel happens with `instr`/`substr` string arithmetic.

## Count dots, peel octets, group the survivors

The dot count needs no splitting at all: `length(ip) - length(replace(ip,
'.', ''))` is how many separators the address carries, and anything but
three is already invalid. For the three-dot rows, a chain of three CTEs
each strips one dot: `instr` locates the next separator, `substr` cuts the
octet in front of it, and the remainder flows to the next stage, so `peel3`
exposes `o1`–`o4` alongside the dot count.

The outer query then applies the two per-octet tests — `length(o) > 1 AND
substr(o, 1, 1) = '0'` for a leading zero (a lone `0` is a legal octet, so
the length guard matters) and `CAST(o AS INTEGER) > 255` for the range —
OR-ed with the dot-count test, since any one reason qualifies a row.
`GROUP BY ip` with `COUNT(*)` turns surviving rows into the per-address
`invalid_count`, and the final `ORDER BY invalid_count DESC, ip DESC`
delivers the promised order; because the grouping key is `ip` itself, the
pair is a total order and the row list is deterministic.

Each predicate scans one row's address, so `N` rows of length at most `L`
cost `O(N·L)`; the grouping and ordering add `O(U log U)` over the `U`
distinct invalid addresses.

**Complexity:** `O(N·L + U log U)` time for `N` rows of address length at
most `L`, `O(U)` space.
