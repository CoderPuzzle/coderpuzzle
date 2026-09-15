# Solutions — Length of the Longest Alphabetical Continuous Substring

## One pass: extend or reset the current run

A substring is alphabetical continuous exactly when each character is one
more than the character before it, so the maximal continuous substrings of
`s` are the maximal runs where `s[i] == s[i-1] + 1`. The scan keeps the
length of the run ending at the current character: it grows by one while
the step from the previous character is exactly `+1` and resets to 1 on any
other step, and the answer is the largest value that run ever reaches.

Every continuous substring is contained in exactly one maximal run, and a
run of length `L` is itself a continuous substring of length `L`, so the
maximum over runs equals the maximum over all substrings — no substring is
missed and none is overcounted. The character comparison is on raw codes,
so a `'z'` followed by `'a'` is a reset rather than a continuation, which
is what "consecutive letters" means: the alphabet does not wrap. A
single-character string never enters the loop, and the run initialized to
1 is already the correct answer for it.

**Complexity:** `O(n)` time, `O(1)` space.
