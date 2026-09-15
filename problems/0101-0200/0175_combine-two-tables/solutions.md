# Solutions — Combine Two Tables

## Left join Address onto Person

The contract is the definition of a left outer join: report every person, carrying the address columns when they are known and null when they are not. `Person p LEFT JOIN Address a ON p.personId = a.personId` keeps every row of `Person`; a matching `Address` row fills in `city` and `state`, and when no address exists the join pads those columns with null — precisely the "report null instead" requirement, with no explicit null handling anywhere in the query. Because `personId` is unique in `Person`, each `Address` row matches at most one person, so the output is one row per (person, address) pair plus one null-padded row for each address-less person.

The direction of the join is the whole problem. `Address` must sit on the right side: an inner join would silently drop exactly the address-less persons the null contract exists for, and `Address LEFT JOIN Person` would keep the orphan addresses instead — rows whose personId has no `Person` entry, like the example's `addressId = 2`, which must never surface. On a `Person`-driven left join those orphan rows find no match and vanish on their own, while every person still appears. The `ON` clause matches on `personId` only; `addressId` is merely `Address`'s own primary key and plays no part in the matching, which is why a person with several addresses correctly yields several output rows.

With the join key resolved through an index or hash lookup, each of the `P` `Person` rows costs one probe into `Address`, so the join runs in `O(P + A)` time over `A` address rows, and only the result itself — at most `P + A` rows — is materialized.

**Complexity:** `O(P + A)` time, `O(P + A)` space.
