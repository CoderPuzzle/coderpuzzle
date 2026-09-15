# Vowel Spellchecker

## Description

Given a `wordlist`, implement a spellchecker that converts each query word
into a correct word.

For a given query word, the spellchecker handles two categories of spelling
mistakes:

- **Capitalization:** if the query matches a word in the wordlist
  case-insensitively, the answer is that word, in the case it carries in the
  wordlist. With `wordlist = ["yellow"]`, query `"YellOw"` is answered
  `"yellow"`; with `wordlist = ["Yellow"]`, query `"yellow"` is answered
  `"Yellow"`.
- **Vowel errors:** if replacing the vowels `'a'`, `'e'`, `'i'`, `'o'`,
  `'u'` of the query — each vowel position individually, with any vowel —
  can make it equal a word in the wordlist case-insensitively, the answer is
  that word, in the case it carries in the wordlist. With
  `wordlist = ["YellOw"]`, query `"yollow"` is answered `"YellOw"`, but
  `"yeellow"` (an extra vowel) and `"yllw"` (missing vowels) match nothing.

In addition, the spellchecker resolves every query under these precedence
rules, stopping at the first tier that applies:

1. If the query exactly matches a word in the wordlist (case-sensitive),
   return that same word back.
2. Otherwise, if the query matches a word up to capitalization, return the
   first such match in the wordlist.
3. Otherwise, if the query matches a word up to vowel errors, return the
   first such match in the wordlist.
4. Otherwise, return the empty string `""`.

Given an array of `queries`, return an array `answer` where `answer[i]` is
the correct word for `queries[i]`.

### Example 1

```text
Input: wordlist = ["KiTe","kite","hare","Hare"], queries = ["kite","Kite","KiTe","Hare","HARE","Hear","hear","keti","keet","keto"]
Output: ["kite","KiTe","KiTe","Hare","hare","","","KiTe","","KiTe"]
Explanation: "kite" and "KiTe" match exactly. "Kite" and "HARE" match up to
capitalization and return the first such word. "Hear" matches nothing: its
vowels sit in different positions, and rearranging letters is not a vowel
error. "keti" and "keto" match "KiTe" up to vowel errors; "keet" swaps a
vowel into a consonant position and matches nothing.
```

### Example 2

```text
Input: wordlist = ["yellow"], queries = ["YellOw"]
Output: ["yellow"]
Explanation: "YellOw" matches "yellow" up to capitalization.
```

### Constraints

- `1 <= wordlist.length, queries.length <= 5000`
- `1 <= wordlist[i].length, queries[i].length <= 7`
- `wordlist[i]` and `queries[i]` consist only of English letters.
