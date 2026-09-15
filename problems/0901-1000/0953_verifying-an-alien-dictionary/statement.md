# Verifying an Alien Dictionary

## Description

In an alien language, they surprisingly also use the lowercase English
letters — but possibly in a different order. The alphabet of this language
is some permutation of the lowercase letters.

Given a sequence of `words` written in the alien language and a string
`order` giving the alphabet of this language, return `true` if and only if
the given `words` are sorted lexicographically in this alien language.

Lexicographic order here follows the usual rules with one substitution:
character precedence comes from `order` — a letter that appears earlier in
`order` is the smaller one — and a word that is a prefix of another word
is the smaller of the two.

### Example 1

```text
Input: words = ["hello","leetcode"], order = "hlabcdefgijkmnopqrstuvwxyz"
Output: true
Explanation: 'h' comes before 'l' in this language, so the sequence is sorted.
```

### Example 2

```text
Input: words = ["word","world","row"], order = "worldabcefghijkmnpqstuvxyz"
Output: false
Explanation: 'd' comes after 'l' in this language, so words[0] > words[1] and the sequence is not sorted.
```

### Example 3

```text
Input: words = ["apple","app"], order = "abcdefghijklmnopqrstuvwxyz"
Output: false
Explanation: The first three letters "app" match and the second word is shorter. A prefix is the smaller word, so "apple" > "app" and the sequence is not sorted.
```

### Constraints

- `1 <= words.length <= 100`
- `1 <= words[i].length <= 20`
- `order.length == 26`
- All characters in `words[i]` and `order` are English lowercase letters.
