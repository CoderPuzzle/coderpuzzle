# Solutions — Find the String with LCP

Two observations collapse the search space. First, `word[i] == word[j]`
holds exactly when `lcp[i][j] > 0`: a positive entry says the suffixes
share a leading letter, while equal starting letters guarantee at least a
one-letter common prefix back. So the positive entries alone pin down the
complete letter-equality partition of any feasible word — who must share a
letter with whom — and nothing else in the matrix constrains the choice of
which letters those classes receive.

## Equality classes with a rebuilt-matrix check

Flood-fill the graph whose edges are the positive entries to obtain the
forced equality classes. Cross-class assignment is free apart from
distinctness, so the alphabetically smallest candidate numbers the classes
'a', 'b', 'c', … in order of first appearance; more than 26 classes means
no lowercase word can exist and "" comes out immediately. The candidate is
then verified honestly: rebuild its true LCP matrix bottom-up with the
classic `dp[i][j] = dp[i+1][j+1] + 1` while the letters match (else 0),
and require every entry to equal the input — fabricated or perturbed
matrices die here even when their positivity structure looked consistent,
with asymmetric fakes rejected before labeling ever starts. The sweep
count is self-limiting by construction: each stored cell rises above zero
only through an actually matching letter pair, so the diagonal lands at
`n-i` and every column stays within the substring lengths automatically.

All phases are at most quadratic: grouping touches each ordered pair once,
labeling is linear, and the rebuild does `O(1)` work per cell over
`n <= 1000` — on the order of a million elementary steps, comfortably
inside the limits. Only character codes below 123 ever appear, so plain
32-bit integers carry every intermediate value in every language.

**Complexity:** `O(n²)` time, `O(n)` space beyond the input.
