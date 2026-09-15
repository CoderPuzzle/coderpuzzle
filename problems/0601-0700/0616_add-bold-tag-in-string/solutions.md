# Solutions — Add Bold Tag in String

## Interval mask, boundary emit

Every occurrence of every word covers a half-open interval of `s`, and the two
closing rules — overlapping substrings share one pair, consecutive substrings
combine — say exactly that the union of those intervals is what gets wrapped.
So collect nothing: paint each occurrence straight onto a boolean mask, and the
merging is already done. Locate each word's occurrences by find-restart —
search from 0, then search again from one past every hit — which is what makes
the overlapping occurrences visible: in `"aaa"` the word `"aa"` matches at 0
and at 1, and a single non-restarting search would consume the second one.
Painting is idempotent, so words whose intervals coincide and matches that
re-cover already-bold positions cost nothing extra.

The mask encodes both merge rules because two intervals that overlap or touch
leave no unbolded cell between them: `[0, 2)` and `[2, 4)` paint one run
`0..3`, which is rule 2, and Example 2's chain of merged `<b>`'s collapsing to
`<b>aaabbb</b>` is simply an all-true mask. Emission walks `s` once and toggles
on mask boundaries only: emit `<b>` where `bold[i]` is true and either `i = 0`
or `bold[i-1]` is false, the character itself, then `</b>` where true meets the
end of the string or a false successor. An empty `words`, or words none of
which occur, leaves the mask untouched and returns `s` unchanged.

**Complexity:** `O(W * n * L)` time worst case — `W` words, `n = |s|`, `L` the
longest word, each occurrence-searched across all positions — and `O(n)` extra
space. (The bound is loose: the true worst, Σ `(n - L_w + 1) * L_w`, peaks near
`L = n/2`, about `2.5 * 10^7` character compares at these limits.)
