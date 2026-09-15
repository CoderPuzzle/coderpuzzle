# Solutions — Find All Unique Email Domains

## Group by the domain after the @

The answer is a property of each distinct domain, so the query first
derives that domain per row and then gathers rows into one group per
domain. `SUBSTR(email, INSTR(email, '@') + 1)` cuts each address at its
`@` and keeps everything after it — the domain exactly as written. The
cut is literal: `mail.foo.com` stays `mail.foo.com`, a group of its own
that never merges with `foo.com`. `GROUP BY email_domain` folds the
table into one group per such literal string, and `COUNT(*)` sizes each
group in individuals — every row is one person (its own primary key), so
two people sharing an address verbatim both count.

The `.com` restriction applies to domains, not to raw addresses, so it
is decided per group with `HAVING email_domain LIKE '%.com'`: groups
whose domain does not end in `.com` — `.edu`, `.org`, a bare `com`, a
`mail.company.org` subdomain — are discarded after counting. The stored
strings are guaranteed lowercase, so no case folding is needed anywhere.
`ORDER BY email_domain ASC` produces the demanded ascending order; the
judge compares result rows as an unordered multiset, but the demanded
order is total here anyway since every surviving group contributes
exactly one row under a distinct domain name.

**Complexity:** `O(n + k log k)` time, `O(k)` space — one pass buckets
all `n` rows by domain, then the `k` surviving domains are sorted.
