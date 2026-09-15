# Repeated DNA Sequences

## Description

The DNA sequence is composed of a series of nucleotides abbreviated as
`'A'`, `'C'`, `'G'`, and `'T'`.

- For example, `"ACGAATTCCG"` is a DNA sequence.

When studying DNA, it is useful to identify repeated sequences within the
DNA.

Given a string `s` that represents a DNA sequence, return all the
10-letter-long sequences (substrings) that occur more than once in a DNA
molecule. You may return the answer in any order.

### Example 1

```text
Input: s = "AAAAACCCCCAAAAACCCCCCAAAAAGGGTTT"
Output: ["AAAAACCCCC","CCCCCAAAAA"]
```

### Example 2

```text
Input: s = "AAAAAAAAAAAAA"
Output: ["AAAAAAAAAA"]
```

### Constraints

- `1 <= s.length <= 10^5`
- `s[i]` is either `'A'`, `'C'`, `'G'`, or `'T'`.

## Hints

### Hint 1

Slide a window of length 10 across the string and record every substring in a hash set.

### Hint 2

A window that is already in the set when you reach it occurs at least twice — collect it once.

### Hint 3

Encoding each window as a small integer (2 bits per base) keeps the comparisons cheap even for very long strings.
