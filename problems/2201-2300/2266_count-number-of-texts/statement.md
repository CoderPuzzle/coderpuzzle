# Count Number of Texts

## Description

Alice is texting Bob using her phone. The mapping of digits to letters is the
standard telephone keypad layout, where each digit maps to a group of letters
in order:

- `2` maps to `a`, `b`, `c`; `3` maps to `d`, `e`, `f`
- `4` maps to `g`, `h`, `i`; `5` maps to `j`, `k`, `l`
- `6` maps to `m`, `n`, `o`; `7` maps to `p`, `q`, `r`, `s`
- `8` maps to `t`, `u`, `v`; `9` maps to `w`, `x`, `y`, `z`

![diagram](figures/2266-1.svg)

In order to add a letter, Alice has to press the key of the corresponding
digit `i` times, where `i` is the position of the letter in the key.

For example, to add the letter `'s'`, Alice has to press `'7'` four times.
Similarly, to add the letter `'k'`, Alice has to press `'5'` twice.

Note that the digits `'0'` and `'1'` do not map to any letters, so Alice does
not use them.

However, due to an error in transmission, Bob did not receive Alice's text
message but received a string of pressed keys instead.

For example, when Alice sent the message `"bob"`, Bob received the string
`"2266622"`.

Given a string `pressedKeys` representing the string received by Bob, return
the total number of possible text messages Alice could have sent.

Since the answer may be very large, return it modulo `10⁹ + 7`.

### Example 1

```
Input: pressedKeys = "22233"
Output: 8
Explanation: The possible text messages Alice could have sent are: "aaadd", "abdd", "badd", "cdd", "aaae", "abe", "bae", and "ce". Since there are 8 possible messages, we return 8.
```

### Example 2

```
Input: pressedKeys = "222222222222222222222222222222222222"
Output: 82876089
Explanation: There are 2082876103 possible text messages Alice could have sent. Since we need to return the answer modulo 10⁹ + 7, we return 2082876103 % (10⁹ + 7) = 82876089.
```

### Constraints

- `1 <= pressedKeys.length <= 10⁵`
- `pressedKeys` only consists of digits from `'2'` - `'9'`.

## Hints

### Hint 1

For a substring consisting of the same digit, how can we count the number of texts it could have originally represented?

### Hint 2

How can dynamic programming help us calculate the required answer?
