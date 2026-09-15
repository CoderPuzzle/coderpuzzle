# Solutions — Longest Almost-Palindromic Substring

## Rolling interval dynamic programming

For each interval, track two facts: whether it is a palindrome and whether it
is almost-palindromic. An interval `s[left..right]` is a palindrome when its
ends match and its interior is a palindrome. It is almost-palindromic when
deleting its left endpoint leaves a palindrome, deleting its right endpoint
leaves a palindrome, or its matching endpoints surround an almost-palindromic
interior. The last case places the one deletion somewhere inside.

Compute intervals in increasing order of length. Each transition needs only
palindrome results from lengths one and two smaller, plus almost-palindromic
results from two lengths smaller. Keeping those diagonals as arrays avoids a
quadratic table. A one-character interval is initialized as
almost-palindromic because deleting its character leaves the empty palindrome;
this makes already-palindromic odd-length intervals work with the same
recurrence. Every true interval length updates the answer.

The recurrence examines every substring once and does constant work for it,
while at most a constant number of length diagonals are retained.

**Complexity:** `O(n²)` time, `O(n)` space.
