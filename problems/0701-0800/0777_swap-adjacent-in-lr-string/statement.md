# Swap Adjacent in LR String

## Description

In a string composed of the characters 'L', 'R', and 'X', such as
`RXXLRXRXL`, a move consists of either replacing one occurrence of `XL` with
`LX`, or replacing one occurrence of `RX` with `XR`. Given the strings `start`
and `result`, return `true` if and only if there exists a sequence of moves to
transform `start` into `result`.

### Example 1

```text
Input: start = "RXXLRXRXL", result = "XRLXXRRLX"
Output: true
Explanation: We can transform start into result following these steps:
RXXLRXRXL -> XRXLRXRXL -> XRLXRXRXL -> XRLXXRRXL -> XRLXXRRLX
```

### Example 2

```text
Input: start = "X", result = "L"
Output: false
```

### Constraints

- `1 <= start.length <= 10⁴`
- `start.length == result.length`
- Both `start` and `result` consist only of the characters 'L', 'R', and 'X'.

## Hints

### Hint 1

Think of the L's and R's as people on a horizontal line, where X is a space.
The people can't cross each other, and also you can't go from XRX to RXX.
