# Solutions — Form a Chemical Bond

## Cross join over the two eligible types

The bond condition is a type test on two different roles: one element
must be a `Metal` and the other a `Nonmetal`. Every pair with those two
types is a valid bond, and no other combination is. Reading the table
twice under two aliases and joining the two copies on that type predicate
therefore produces exactly the required pair set — a Cartesian product
restricted to the one eligible type combination.

The single `JOIN` condition `m.type = 'Metal' AND n.type = 'Nonmetal'`
plays both roles at once: it confines the left copy to Metals and the
right copy to Nonmetals. Because the two predicates are independent, the
join degenerates into the full cross product of the Metals list with the
Nonmetals list. The `symbol` primary key guarantees no Metal row can equal
a Nonmetal row, and the aliases `AS metal` / `AS nonmetal` name the two
output columns to match the statement.

Every qualifying pair appears exactly once, and pairs outside the
condition never do. The statement allows the rows in any order, so the
row set is judged order-insensitively and the query needs no `ORDER BY`.

**Complexity:** `O(M * N)` rows in the result for `M` Metals and `N`
Nonmetals; SQLite evaluates the join by scanning each group once.
