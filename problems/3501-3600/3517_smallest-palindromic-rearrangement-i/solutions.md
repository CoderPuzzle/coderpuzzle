# Solutions — Smallest Palindromic Rearrangement I

## Forced half, mirrored

Every palindrome reads as `half + middle + reverse(half)`, where `half` is
the first `n / 2` letters and `middle` is the lone odd-count letter (empty
when `n` is even). Pairing position `i` with `n - 1 - i` shows the half's
multiset is not a choice: each letter must appear in it exactly
`count[c] / 2` times. So the only freedom is the order of the half, and the
smallest palindrome puts that multiset in ascending order — any smaller
arrangement of the half would make the whole string smaller, and the mirror
contributes nothing new.

The implementation counts the 26 letters, expands the half letter by letter
in alphabetical order, notes the odd-count letter as `middle`, and returns
`half + middle + reverse(half)`. The guarantee that `s` is palindromic means
at most one letter has an odd count, so the middle is always well defined;
the two crawl examples fall out directly (`"babab"` → half `ab`, middle `b`,
→ `"abbba"`).

One linear counting pass and one linear assembly — no sorting needed, since
iterating the fixed alphabet yields the letters already ordered.

**Complexity:** `O(n)` time, `O(n)` space.
