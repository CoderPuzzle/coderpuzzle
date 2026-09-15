# Solutions — Second Degree Follower

## Count the followed, keep the following

A second degree follower sits on both sides of the follow relationship at
once, and the two conditions read the table's two columns independently:
a user follows somebody when their name appears in some row's `follower`,
and somebody follows them when their name appears in some row's
`followee`. The reported `num` is the size of the second group only — how
many users follow them — so `GROUP BY followee` with `COUNT(*)` is the
counting half of the query: one row of the answer per distinct `followee`,
holding that user's follower count. The alias `followee AS follower`
renames the group key into the column name the answer asks for, since the
user being reported is precisely the one being followed.

The qualifying half is a semi-join spelled as membership:
`WHERE followee IN (SELECT follower FROM Follow)` reads the same single
table in its other role, as the set of names that appear as a `follower`,
and keeps exactly the counted users who also follow somebody — a group
whose name never appears as a `follower` (Alice, followed but following
nobody) is counted and then dropped, while a name that only ever follows
(Cena, Edward) never forms a group in the first place, because it never
appears as a `followee`. `DISTINCT` inside the `IN` subquery would change
nothing — membership testing ignores duplicates — and the same predicate
could be spelled as an `EXISTS` lookup or an inner join onto
`SELECT DISTINCT follower`; the subquery form keeps the two roles of the
one table visibly separate. `ORDER BY follower ASC` honors the statement's
alphabetical demand; the judge compares result rows as an unordered
multiset, so the sort dresses the answer rather than deciding it.

The engine can evaluate the uncorrelated subquery once, building the set
of follower names in one scan, then group the `n` rows in a second pass —
each group's count is a tally of its rows, and nothing beyond the name
set and the groups is materialized.

**Complexity:** `O(n)` time, `O(n)` space.
