# Solutions — Extra Characters in a String

A break of `s` is a sequence of choices along the string: at each position,
either hand the current character to the leftover pile or consume a
dictionary word that starts right there. Those two moves interleave freely,
and a greedy scan cannot see far enough to rank them — a long word taken
early can strand a suffix that two short words would have covered. What
makes the choice safe is that the cost of the rest only depends on where
you land, never on how you got there, which is exactly the shape a
prefix dynamic program computes.

## Dynamic Programming over Prefixes

Define `dp[i]` as the minimum number of extra characters left when breaking
the prefix `s[0:i]` optimally, with `dp[0] = 0`. Fill the table left to
right: position `i` always admits the skip move, `dp[i+1] = dp[i] + 1` —
one more leftover character — and every dictionary word `w` that matches
`s` at `i` offers a free jump, `dp[i + w.length] = dp[i]`. Taking the
minimum over all moves at every index makes each `dp[i]` final by the time
the scan reaches it, because every move only ever references smaller
indices. The answer is `dp[n]`, and it counts exactly the skips taken along
the best chain of jumps.

Word matching needs no trie at these sizes: with `n <= 50` and at most 50
words of length at most 50, comparing each word against the slice starting
at each position is about 125,000 character comparisons in the worst case,
far inside the limits — a plain loop keeps the code honest and short. The
table itself is one integer per prefix index. Words longer than the
remaining suffix simply fail their slice comparison, duplicate words are
forbidden by the constraints, and a string that covers nothing degrades to
taking the skip move at every index, yielding `dp[n] = n`.

**Complexity:** `O(n * m * L)` time, where `n = s.length`, `m =
dictionary.length`, and `L` is the longest word length; `O(n)` extra space.
