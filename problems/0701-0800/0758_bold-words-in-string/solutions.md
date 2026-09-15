# Solutions — Bold Words in String

Everything difficult about this problem lives in one requirement: the
returned string uses the least number of tags, so one `<b>`/`</b>` pair covers
each maximal run of bold letters — overlapping and adjacent keyword
occurrences share a single pair. The clean attack separates the two concerns:
first decide which letters of `s` are bold without thinking about tags at all,
then wrap each contiguous bold stretch exactly once.

## Bold Mask, One Pair Per Run

For each keyword, locate every occurrence in `s` with the language's native
substring scan, advancing the search start one position past each hit so
self-overlapping occurrences such as `aa` inside `aaa` are all found, and mark
the covered positions in a boolean mask. Repeated occurrences, occurrences of
different keywords, and occurrences nested inside a longer keyword's span all
simply OR into the same mask — by the time the marking sweep is done, with `W`
keywords of length at most `m` in a string of length `n`, every occurrence has
cost at most `n·m` comparisons and the merge question has already answered
itself.

With the mask fixed, tag placement is mechanical. Walking `s` left to right, a
`<b>` opens at any position that starts a run — position `i` is marked while
`i == 0` or position `i-1` is not — and a `</b>` closes where a run ends. Each
maximal run gets exactly one pair, which is precisely the least-tags rule: the
nested `"a<b>a<b>b</b>c</b>d"` from the first example is what happens when
occurrences are wrapped one by one instead of merged, and keywords that never
occur mark nothing and leave `s` untouched.

**Complexity:** `O(W·n·m + n)` time, `O(n)` space.
