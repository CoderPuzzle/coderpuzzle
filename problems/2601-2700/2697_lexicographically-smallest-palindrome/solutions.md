# Solutions — Lexicographically Smallest Palindrome

## Two pointers inward

A palindrome forces every mirrored pair `(left, right)` into a single
shared letter. Whichever letter wins, if the two original characters
disagree at least one of the pair must be rewritten, so each mismatched
pair costs one operation no matter what; already-equal pairs cost nothing.
The minimum operation count is therefore exactly the number of mismatched
pairs, and it is achieved by fixing every mismatched pair to either one of
its two original letters (spending more to introduce a third letter would
breach the minimum).

The choices for distinct pairs touch disjoint positions, so they never
interact: making every choice independently cannot hurt any later
position, and taking the smaller letter of each mismatched pair is thereby
the lexicographically smallest result overall. Scanning inward with two
pointers, both ends of each disagreement are rewritten to
`min(s[left], s[right])`, and agreeing pairs stay untouched.

The scan touches each of the `n` characters once. Most wrappers work on a
mutable copy of the input (strings are immutable in Python, JavaScript,
and TypeScript; Java builds a char array; C++ takes its parameter by
value), so the auxiliary space is linear too.

**Complexity:** `O(n)` time, `O(n)` space.
