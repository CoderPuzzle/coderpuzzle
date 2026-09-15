# Solutions — Count Vowel Substrings of a String

## Expand each vowel-only run with a bitmask

Start a scan at every index and extend its right endpoint while characters are
vowels. A five-bit mask records which of `a`, `e`, `i`, `o`, and `u` have
appeared; whenever all five bits are set, the current substring contributes
one. A consonant ends the scan immediately because every longer substring from
the same start would still contain that consonant.

The mask avoids constructing substrings or maintaining a set for each endpoint.
Repeated vowels simply leave their bit set, while restarting at the next start
correctly counts overlapping occurrences separately.

**Complexity:** `O(n²)` time and `O(1)` auxiliary space.
