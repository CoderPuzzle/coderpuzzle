# Solutions — Strong Password Checker II

## One pass with class flags

Every criterion except the length floor is local to a single character, so a
single scan settles all of them. Four flags record whether a lowercase
letter, an uppercase letter, a digit, and a special character from
`"!@#$%^&*()-+"` have been seen so far; the walk fails fast the moment a
character equals its predecessor, which enforces the adjacency rule.

The length check comes first, since nothing later can rescue a short
password. The password is strong exactly when the scan finishes without an
adjacent repeat and all four flags are set.

**Complexity:** `O(n)` time, `O(1)` space.
