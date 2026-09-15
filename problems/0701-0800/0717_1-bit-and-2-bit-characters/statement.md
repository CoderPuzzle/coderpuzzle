# 1-bit and 2-bit Characters

## Description

We have two special characters:

- The first character can be represented by one bit, `0`.
- The second character can be represented by two bits, `10` or `11`.

Given a binary array `bits` that ends with `0`, return `true` if the last
character must be a one-bit character.

### Example 1

```text
Input: bits = [1,0,0]
Output: true
Explanation: The only way to decode it is a two-bit character followed by a
one-bit character, so the last character is the one-bit character.
```

### Example 2

```text
Input: bits = [1,1,1,0]
Output: false
Explanation: The only way to decode it is two two-bit characters, so the last
character is not the one-bit character.
```

### Constraints

- `1 <= bits.length <= 1000`
- `bits[i]` is either `0` or `1`.

## Hints

### Hint 1

Keep track of where the next character starts. At the end, you want to know if
you started on the last bit.
