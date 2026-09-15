# Solutions — Find Valid Emails

An address is valid when it has exactly one `@`, a local part built only
from ASCII letters, digits, and underscores, and a remainder that is a
non-empty letters-only domain followed by a literal lowercase `.com`.
SQLite's `GLOB` cannot count characters, so the one-`@` rule and the
split are done with string arithmetic instead.

## Count the `@`, split once, class-check both halves

The subquery keeps rows where `length(email) - length(replace(email, '@',
'')) = 1` — exactly one `@` — and, for those, `instr` finds its position
(unambiguous once the count is one) and `substr` cuts the address into
`local_part` and `rest_part`. The outer query then applies the remaining
criteria as shape checks: `length(local_part) > 0` plus
`local_part NOT GLOB '*[^a-zA-Z0-9_]*'` keeps non-empty local parts
whose every character is a letter, digit, or underscore (an empty string
would vacuously pass the `NOT GLOB`, hence the explicit length); on the
other side, `rest_part GLOB '*.com'` anchors the `.com` ending,
`length(rest_part) > 4` forces a non-empty domain, and
`substr(rest_part, 1, length(rest_part) - 4) NOT GLOB '*[^a-zA-Z]*'`
demands the domain be letters only. `ORDER BY user_id ASC` finishes the
contract.

Each predicate is a linear scan of one row's address; for `N` rows the
query is `O(N·L)` for addresses of length at most `L`, with no extra
storage beyond the split columns. `GLOB` classes are case-sensitive and
ASCII-minded, so `Example.COM` fails the suffix while `ExampleSite`
passes the domain test, and a `é` or `本` fails both class checks.

**Complexity:** `O(N·L)` time for `N` rows of length at most `L`,
`O(N)` space.
