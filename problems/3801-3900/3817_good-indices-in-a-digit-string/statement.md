# Good Indices in a Digit String

## Description

You are given a string s consisting of digits.

An index i is called good if there exists a substring of s that ends at index i
and is equal to the decimal representation of i.

Return an integer array of all good indices in increasing order.

### Example 1

```text
Input: s = "0234567890112"
Output: [0,11,12]
Explanation: At index 0, the decimal representation of the index is "0". The
substring s[0] is "0", which matches, so index 0 is good. At index 11, the
decimal representation is "11". The substring s[10..11] is "11", which matches,
so index 11 is good. At index 12, the decimal representation is "12". The
substring s[11..12] is "12", which matches, so index 12 is good. No other index
has a substring ending at it that equals its decimal representation. Therefore,
the answer is [0, 11, 12].
```

### Example 2

```text
Input: s = "01234"
Output: [0,1,2,3,4]
Explanation: For every index i from 0 to 4, the decimal representation of i is
a single digit, and the substring s[i] matches that digit. Therefore, a valid
substring ending at each index exists, making all indices good.
```

### Example 3

```text
Input: s = "12345"
Output: []
Explanation: No index has a substring ending at it that matches its decimal
representation. Therefore, there are no good indices and the result is an
empty array.
```

### Constraints

- `1 <= s.length <= 10⁵`
- s only consists of digits from '0' to '9'.

## Hints

### Hint 1

For an index i, any valid substring must end exactly at position i.

### Hint 2

The substring you are looking for is determined by the decimal digits of i.

### Hint 3

For each index i, compare the string form of i with the substring that ends at
i and has the same length.
