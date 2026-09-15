# Solutions — Calculate Digit Sum of a String

## Simulate the rounds

The process is a loop that repeats a single mechanical step while the string is
still longer than `k`: split the current string into consecutive groups of
size `k` (the final group may be shorter), replace every group by the decimal
string of the sum of its digits, and concatenate the results. The loop ends
exactly when `len(s) <= k`, at which point the current string is the answer.
The `range(0, len(s), k)` stride handles the possibly-short last group without
any special case, since slicing past the end simply stops at the last
character.

Each round replaces a group of up to `k` digits with the string form of a sum
that is at most `9k`, so the new string is built from at most
`ceil(len(s) / k)` short fragments. For `k >= 3` this shrinks the string by a
constant factor every round, and for `k = 2` the length never grows and every
two-character group whose sum is still two digits ("99" → "18") collapses to a
single digit on the next round, so the loop still terminates quickly. With
`s.length <= 100` the work is tiny either way.

The digit-sum computation itself iterates the characters of each group and
accumulates `int(c)`; building the next string with `join` over the group
results avoids quadratic string concatenation. For the crawl example
`"11111222223"` with `k = 3`, one round yields `"3465"` and the next yields
`"135"`, matching the expected output exactly.

**Complexity:** `O(n²)` time, `O(n)` space, where `n` is the initial string
length.
