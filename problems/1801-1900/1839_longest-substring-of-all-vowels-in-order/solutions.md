# Solutions — Longest Substring Of All Vowels in Order

A beautiful substring is a stretch of vowels that never steps backwards in
the order `a < e < i < o < u` and, at the end, contains all five letters.
Because the alphabet is only the five vowels and they must appear in
non-decreasing order, a beautiful substring is exactly a maximal
non-decreasing run of vowels that happens to cover all five.

## Scan maximal non-decreasing runs

Walk the string once. Each run starts at an `'a'` (any other starting
letter cannot begin something beautiful, since `'a'` must come first) and
extends while each next character is `>=` its predecessor — comparing the
characters directly works because the vowel set is in alphabetical order.
When the run ends, check whether it collected all five vowels (a 5-bit
mask with one bit per vowel makes that a single comparison against `31`)
and update the answer with its length. The next run begins where this one
ended, so every character is visited a constant number of times.

The two examples show both outcomes: `"aaaaeiiiiouuu"` is one full run of
length 13, while the run `"aeeeiiiioooo"` in example 2 stops before `u`
and scores nothing. The scan is linear — critical at the `5 * 10⁵`
length ceiling — and needs only constant extra state: the current run's
mask and two indices.

**Complexity:** `O(n)` time, `O(1)` space.
