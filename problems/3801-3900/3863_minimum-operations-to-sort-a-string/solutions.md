# Solutions — Minimum Operations to Sort a String

## Character-extremum rules

A single operation sorts any proper substring, so the cost is decided by
where the globally smallest and largest characters sit. Sorting the whole
string is forbidden, but the substring complementary to the first or the last
position is proper whenever the string has length at least three.

If the first character is already the minimum, sorting the remaining suffix
puts the whole string in order, and symmetrically if the last character is
the maximum, sorting the leading prefix does. When neither holds, two
operations suffice exactly when the minimum or the maximum appears somewhere
strictly inside the string; otherwise the largest character must sit at the
front and the smallest at the back, a state that takes three operations to
repair. A length-two string admits no proper substring with more than one
character, so a descending pair can never be fixed and the answer is -1; an
already sorted string costs zero operations.

**Complexity:** `O(n)` time, `O(1)` space.
