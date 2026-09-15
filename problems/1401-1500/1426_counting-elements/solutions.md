# Solutions — Counting Elements

## Set membership and a second pass

The question "is `x + 1` present?" is asked once per element, so the plan
that avoids a quadratic scan is to answer it from a set: one pass pours
every value into a hash set, a second pass walks the original array and
counts the elements whose successor is a member.

The two passes must stay separate — building and querying in one loop
would miss successors that appear later in the array. Duplicates need no
special handling: each occurrence is an element in its own right and is
counted each time, which falls out of counting per position rather than
per distinct value. With values at most 1000 and length at most 1000,
the set stays small and every membership test is `O(1)`.

An alternative worth noting (and equally linear) exploits the value
bound: a 1001-slot presence array replaces the hash set, trading the
hashing for direct indexing. Both are the same idea wearing different
lookup structures.

**Complexity:** `O(n)` time, `O(n)` space for the set.
