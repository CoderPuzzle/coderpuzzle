# Solutions — First Unique Character in a String

## Tally first, then scan

Whether a character repeats is a property of the whole string: no prefix can
settle it, because the deciding second occurrence may still lie ahead. So
the question splits cleanly in two — count everything, then locate. The first
pass tallies occurrences in a fixed array with one slot per letter of the
alphabet, which the constraints cap at 26 lowercase letters; every character
read bumps its slot once.

The second pass walks the string again from the left, this time reading the
tally, and returns the index of the first character whose slot holds exactly

1. Scanning in index order is precisely what answers "first" — among several
   non-repeating characters the earliest position wins, whichever letter it is —
   and a completed pass with no slot reading 1 means every letter occurs at
   least twice, so the answer is -1.

Each pass is a single sweep, and the tally never grows with the input: 26
counters cover every string the constraints allow, even at the 10⁵ ceiling.

**Complexity:** `O(n)` time, `O(1)` space — 26 counters.
