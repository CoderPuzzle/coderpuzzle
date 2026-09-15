# Can Convert String in K Moves

## Description

You are given two strings `s` and `t` of the same length, made only of
lowercase English letters. You want to turn `s` into `t` using a sequence of
moves numbered starting at 1.

The moves are performed in order. On move number `i` (moves run from `i = 1`
up through some final move `i = k`), you must do exactly one of the
following:

- Pick an index `j` of `s` that has **not been picked on any earlier move**,
  and shift the character at that index forward through the alphabet `i`
  times (wrapping so that after `'z'` comes `'a'` again). So move `i` always
  advances its chosen character by exactly `i` letters, never by any other
  amount, and once an index has been used it can never be used again.
- Do nothing on this move.

Note that the move number itself is the shift amount: move 1 can only shift
its chosen character by 1, move 2 only by 2, and so on. You never get to
choose how far a move shifts a character — only which untouched index (if
any) receives that move's fixed shift.

Return `true` if there is some way to perform moves `1` through `k` (some of
them possibly doing nothing) that turns `s` into `t`, and `false` otherwise.

### Example 1

```text
Input: s = "input", t = "ouput", k = 9
Output: true
Explanation: On move 6 we shift 'i' forward 6 times to reach 'o'. On move 7
we shift 'n' forward 7 times to reach 'u'. Every other move does nothing.
```

### Example 2

```text
Input: s = "abc", t = "bcd", k = 10
Output: false
Explanation: Every character needs a shift of exactly 1 to reach its target
letter. Move 1 can supply that shift to one of the three characters, but no
other move among moves 2 through 10 shifts anything by 1 — a shift of 1 can
only ever be delivered by move 1, move 27, move 53, and so on. The remaining
two characters can never be fixed within 10 moves.
```

### Example 3

```text
Input: s = "aab", t = "bbb", k = 27
Output: true
Explanation: Both letters that need to become 'b' need a shift of exactly 1.
Move 1 shifts the first 'a' to 'b'. The second 'a' cannot also use move 1
(each index is used at most once), so it must wait for the next move whose
number is congruent to 1 modulo 26, which is move 27; move 27 shifts it to
'b' as well.
```

### Constraints

- `1 <= s.length, t.length <= 10^5`
- `s.length == t.length`
- `0 <= k <= 10^9`
- `s` and `t` contain only lowercase English letters.

## Hints

### Hint 1

Shifting a letter by `x` positions has exactly the same effect as shifting it
by `x + 26` positions, since the alphabet wraps every 26 letters.

### Hint 2

For each amount `d` from 1 to 25, count how many positions need a shift of
exactly `d` to turn their `s` character into their `t` character. Check
whether `k` is large enough to supply every one of those shifts — remembering
that only moves `d`, `d + 26`, `d + 52`, ... can ever deliver a shift of `d`.
