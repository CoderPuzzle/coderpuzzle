# Solutions — First Letter to Appear Twice

## Scan with a seen set and stop at the first repeat

The definition says a letter a appears twice before another letter b exactly
when the second occurrence of a sits before the second occurrence of b. So
the letter we must return is the one whose second occurrence comes first in
the whole string — and the moment any letter shows up for the second time
during a left-to-right scan, no later position can beat it.

Walk the string once keeping every letter already visited in a set. When the
current letter is already in that set, it is precisely its own second
occurrence, and since all earlier positions only ever produced first
occurrences, this is the earliest second occurrence of any letter; return
it. The guarantee that s contains at least one repeated letter means the
scan always answers.

**Complexity:** `O(n)` time, `O(1)` space.
