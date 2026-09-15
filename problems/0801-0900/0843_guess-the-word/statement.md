# Guess the Word

## Description

This is an **interactive** problem.

You are given a list of unique strings `wordlist`, where every word is six
letters long. One of the words was chosen as the **secret**. You must
identify it by asking questions of the `Master` object the judge hands to
your method:

- `guess(word)` — returns the number of positions where `word` and the
  secret agree (an exact match of value and position, between 0 and 6).
  `word` should be one of the candidates you are still considering.

You may call `guess` at most **10 times** (the oracle's budget); the 11th
call is rejected. Call `guess` with the secret word itself within the budget
and the case passes. `findSecretWord` returns nothing — the verdict comes
from the master's own record of whether the secret was named.

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only. The
wordlist is passed to your method alongside the master; the secret is hidden
inside the master and is always one of the listed words.

### Example 1

```text
Input: wordlist = ["acckzz","ccbazz","eiowzz","abcczz"], secret = "acckzz"
Output: You guessed the secret word correctly.
Explanation: Guessing "ccbazz" answers 3 (positions 0, 4, 5 agree), "eiowzz"
answers 2, and "abcczz" answers 4. Only words consistent with every answer
survive each round, and naming "acckzz" — which answers 6 — ends the search
well inside the budget.
```

### Example 2

```text
Input: wordlist = ["hamada","khaled"], secret = "hamada"
Output: You guessed the secret word correctly.
Explanation: With two words, at most two guesses are needed.
```

### Constraints

- `1 <= wordlist.length <= 100`
- `wordlist[i].length == 6`
- `wordlist[i]` consists of lowercase English letters.
- All words in `wordlist` are unique.
- The secret is one of the words in `wordlist`.
- At most 10 calls to `guess`.

## Hints

### Hint 1

One guess can eliminate many candidates at once: if `guess(w)` answers `k`,
then every surviving candidate `c` must satisfy "number of agreeing
positions between `c` and `w` is exactly `k`" — the secret itself must pass
this test, so filtering by it can never lose the answer.

### Hint 2

Guessing blindly is weak when most pairs share no letters (almost every
answer is 0, and the pool barely shrinks). Prefer a guess whose _worst-case_
surviving group is smallest: for each candidate, bucket all candidates by
their agreement count with it, and pick the candidate minimizing the largest
bucket.

### Hint 3

Repeat pick → guess → filter until the answer is 6 (the secret itself).
Ten rounds of worst-case-group minimization are enough for every list that
admits a reasonable strategy, including the classic adversarial list where
all pairs agree in zero positions.
