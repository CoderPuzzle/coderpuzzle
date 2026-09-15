# Convert Number Words to Digits

## Description

You are given a string `s` of length `n` consisting of lowercase English
letters. Scattered through `s` are concatenated English number words — the
words `zero` through `nine` — with no spaces separating them from the
surrounding letters.

Scan `s` from left to right, one position at a time:

- If a number word starts exactly at the current position, append its digit
  to the result and jump past that word.
- Otherwise, skip exactly one character and continue from the next position.

Return the resulting string of digits; it is empty when no number word is
found anywhere. The rule pins every step down: at most one number word can
start at any single position, because no digit word is a prefix of another,
so there is never a choice to make — take the word when one starts there and
skip a lone character when none does.

### Example 1

```text
Input: s = "onefourthree"
Output: "143"
Explanation: The scan extracts the number words "one", "four", and "three"
in order, which map to 1, 4, and 3. Joining those digits gives "143".
```

### Example 2

```text
Input: s = "ninexsix"
Output: "96"
Explanation: "nine" starts at index 0 and maps to 9. The letter "x" starts
no number word, so it is skipped, after which "six" maps to 6. The digits
join into "96".
```

### Example 3

```text
Input: s = "zeero"
Output: ""
Explanation: No number word ever starts cleanly — "zero" is misspelled with
a doubled e — so every character is skipped and the result is "".
```

### Example 4

```text
Input: s = "tw"
Output: ""
Explanation: "tw" is only a fragment of "two", and fragments do not count.
Every character is skipped, leaving "".
```

### Constraints

- `0 <= n == s.length <= 10⁵`
- `s` consists only of lowercase English letters.

## Hints

### Hint 1

Scan left to right as described, testing whether one of the ten digit words
starts at the current position.

### Hint 2

A trie over the ten words answers "does a word start here, and how long is
it?" in a single walk; ten direct slice comparisons work just as well since
the vocabulary is fixed.
