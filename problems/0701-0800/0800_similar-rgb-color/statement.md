# Similar RGB Color

## Description

The red-green-blue color `"#AABBCC"` can be written as `"#ABC"` in
shorthand: each shorthand digit stands for that hex digit written twice.

For example, `"#15c"` is shorthand for the color `"#1155cc"`.

The similarity between the two colors `"#ABCDEF"` and `"#UVWXYZ"` is
`-(AB - UV)² - (CD - WX)² - (EF - YZ)²`, where each pair of letters is
read as a two-digit hexadecimal number.

Given a string `color` that follows the format `"#ABCDEF"`, return a string
representing the color that is most similar to the given color and has a
shorthand (i.e., it can be represented as some `"#XYZ"`).

Any answer that has the same highest similarity as the best answer will be
accepted.

### Example 1

```text
Input: color = "#09f166"
Output: "#11ee66"
Explanation: The similarity is -(0x09 - 0x11)² - (0xf1 - 0xee)² -
(0x66 - 0x66)² = -64 - 9 - 0 = -73.
This is the highest among any shorthand color.
```

### Example 2

```text
Input: color = "#4e3fe1"
Output: "#5544dd"
```

### Constraints

- `color.length == 7`
- `color[0] == '#'`
- `color[i]` is either a digit or a character in the range `['a', 'f']` for
  `i > 0`.
