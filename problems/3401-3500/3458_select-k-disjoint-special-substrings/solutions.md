# Solutions — Select K Disjoint Special Substrings

A special substring must swallow every occurrence of each character it
contains, which pins its shape: only a handful of intervals per string can
ever qualify, and counting disjoint ones is a classic scheduling question.

## First-occurrence closures plus greedy interval scheduling

Record the first and last occurrence of each letter. Any special substring
must begin at the first occurrence of its leading letter — if that letter
repeated earlier, the earlier copy would sit outside the substring — so
there are at most 26 candidate starts. From each candidate start `a`, grow
the window rightward: whenever the window covers a position of some letter,
the window must extend to that letter's last occurrence. The walk settles
on the smallest interval containing every occurrence of every character
inside it. If some character inside leaks to the left of `a`, no special
substring starts there at all; if the closure covers the entire string, it
is discarded by the "not the whole string" rule.

The surviving minimal intervals dominate every special substring (any
larger one contains its start's closure), so the answer reduces to the
maximum number of disjoint intervals among at most 26 — solved by the
classic greedy: sort by right endpoint and keep taking the interval whose
end blocks the least. Return whether that count reaches `k`; `k = 0` is
trivially satisfied.

**Complexity:** `O(26 · n)` time — at most 26 closure walks of `O(n)` each,
plus sorting at most 26 intervals — and `O(1)` extra space beyond the input
(26-entry occurrence tables).
