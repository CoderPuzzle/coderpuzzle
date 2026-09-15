# Solutions — Count of Substrings Containing Every Vowel and K Consonants I

A substring qualifies exactly when its vowel set is all of `a`, `e`, `i`,
`o`, `u` and its consonant count is precisely `k`. The constraint bounds
`word.length` at 250, so there are at most about 31,000 substrings — small
enough that checking every window directly is a perfectly honest strategy,
and it needs no insight beyond bookkeeping per window.

## Check every window with a running vowel mask and consonant count

Fix each start index in turn and grow the end index rightward, maintaining
two running facts about the current window: a 5-bit mask of which vowels
have appeared, and a count of the consonants seen. Each new character
either sets one vowel bit or bumps the consonant counter, so extending a
window costs constant work instead of rescanning the slice. Whenever the
mask holds all five bits and the consonant count equals `k`, this window
qualifies and the answer grows by one.

There are n·(n+1)/2 = 31,375 substrings at n = 250, so the answer fits in
a plain signed 32-bit integer with room to spare — no wide accumulators are
needed in any language.

The double loop visits every `(start, end)` pair once — O(n²) windows with
O(1) work at each extension, which for n = 250 is on the order of 62,500
character steps, comfortably inside the limits. Note that `y` counts as a
consonant here: only the five letters listed in the statement are vowels.

**Complexity:** `O(n²)` time, `O(1)` space beyond the two running
accumulators.
