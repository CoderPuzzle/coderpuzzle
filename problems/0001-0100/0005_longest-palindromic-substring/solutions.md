# Solutions — Longest Palindromic Substring

## Expand around center

Every palindrome is symmetric about a center, and in a string of length `n` there are only `2n - 1` possible centers: each character (for odd-length palindromes) and each gap between two adjacent characters (for even-length ones). Searching each center outward is cheap because a palindrome extended by one character on each side is still a palindrome only if the two new boundary characters match — so each expansion step is a single comparison, and the `expand` helper walks outward until that check fails, returning the bounds of the widest palindrome around the given center.

The main loop visits every index `i` and tries both the odd center `(i, i)` and the even center `(i, i + 1)`. For the even case at the last gap the right index is already `n`, so the while-condition fails immediately and nothing spurious is returned. The best bounds start at `(0, 0)`, which makes a single character the initial answer — this covers the smallest input and any string whose best palindrome is length 1, and also means the returned substring is never empty.

Ties are resolved by the strict comparison `r - l > best_end - best_start`: a later palindrome of equal length never replaces an earlier one, so the leftmost longest palindrome is returned, exactly as the statement requires (`"babad"` yields `"bab"`, not `"aba"`).

**Complexity:** `O(n^2)` time, `O(1)` space.
