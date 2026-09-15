# Minimum Deletions to Make String K-Special

## Description

You are given a string word and an integer k.

We consider word to be k-special if |freq(word[i]) - freq(word[j])| <= k for
all indices i and j in the string.

Here, freq(x) denotes the frequency of the character x in word, and |y|
denotes the absolute value of y.

Return the minimum number of characters you need to delete to make word
k-special.

### Example 1

```text
Input: word = "aabcaba", k = 0
Output: 3
Explanation: We can make word 0-special by deleting 2 occurrences of "a"
and 1 occurrence of "c". Therefore, word becomes equal to "baba" where
freq('a') == freq('b') == 2.
```

### Example 2

```text
Input: word = "dabdcbdcdcd", k = 2
Output: 2
Explanation: We can make word 2-special by deleting 1 occurrence of "a" and
1 occurrence of "d". Therefore, word becomes equal to "bdcbdcdcd" where
freq('b') == 2, freq('c') == 3, and freq('d') == 4.
```

### Example 3

```text
Input: word = "aaabaaa", k = 2
Output: 1
Explanation: We can make word 2-special by deleting 1 occurrence of "b".
Therefore, word becomes equal to "aaaaaa" where each letter's frequency is
now uniformly 6.
```

### Constraints

- `1 <= word.length <= 10⁵`
- `0 <= k <= 10⁵`
- `word` consists only of lowercase English letters.

## Hints

### Hint 1

Count the frequency of each letter.

### Hint 2

Suppose we select several characters as the final answer, and let x be the
character with the smallest frequency in the answer. It can be shown that
out of the selected characters, the optimal solution will never delete an
occurrence of character x to obtain the answer.

### Hint 3

We will fix a character c and assume that it will be the character with the
smallest frequency in the answer. Suppose its frequency is x.

### Hint 4

Then, for every other character, we will count the number of occurrences
that will be deleted. Suppose that the current character has y occurrences.
If y if y > x + k, we should delete y - x - k of such character.
Otherwise we don’t need to delete it.
