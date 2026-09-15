# Count Sorted Vowel Strings

## Description

Given an integer `n`, return the number of strings of length `n` that
consist only of the vowels (`'a'`, `'e'`, `'i'`, `'o'`, `'u'`) and are
**lexicographically sorted**.

A string is lexicographically sorted if, for every valid index `i`,
`s[i]` is equal to or comes before `s[i + 1]` in the alphabet.

### Example 1

```text
Input: n = 1
Output: 5
Explanation: The 5 sorted strings that consist of vowels only are ["a","e","i","o","u"].
```

### Example 2

```text
Input: n = 2
Output: 15
Explanation: The 15 sorted strings that consist of vowels only are
["aa","ae","ai","ao","au","ee","ei","eo","eu","ii","io","iu","oo","ou","uu"].
Note that "ea" is not a valid string since 'e' comes after 'a' in the alphabet.
```

### Example 3

```text
Input: n = 33
Output: 66045
```

### Constraints

- `1 <= n <= 50`

## Hints

### Hint 1

For each character, its possible values depend on the value of the
previous character, because it needs to be the same as or come after it.

### Hint 2

Think in terms of counting strings by their last character: for each
vowel `v`, how many sorted strings of length `n` end with `v`?

### Hint 3

A sorted string of length `n` ending with vowel `v` is built by
appending `v` to any sorted string of length `n - 1` that ends with a
vowel no later than `v` in the alphabet.
