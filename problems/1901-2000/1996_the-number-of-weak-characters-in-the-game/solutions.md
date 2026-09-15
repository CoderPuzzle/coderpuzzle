# Solutions — The Number of Weak Characters in the Game

## Sort by Attack Descending with a Running Maximum Defense

A character is weak if some other character strictly beats it in both attack and defense. If the characters are visited in decreasing order of attack, then every character already seen has attack greater than or equal to the current one's, so the current character is weak exactly when some seen character has strictly greater defense — a single running maximum suffices, with no need to compare against everyone.

The one subtlety is ties in attack: characters with equal attack can never weaken each other, since the attack comparison must be strict. Sorting by attack descending but defense _ascending_ within an equal-attack group resolves this without grouping logic. When the scan reaches a character, the running maximum defense comes only from strictly earlier groups (higher attack) or from same-attack characters with smaller-or-equal defense — never from a same-attack character with larger defense — so `defense < max_defense` is a precise weak test, and the maximum is updated whenever the test fails so later groups see it.

The scan is a single pass after the sort, counting positions where the current defense falls below the running maximum. The answer for a strictly-dominated character is never missed because its dominator sorts strictly earlier and has already raised the maximum.

**Complexity:** `O(n log n)` time, `O(n)` space.
