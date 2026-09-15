# Solutions — Percentage of Letter in String

## Count once, scale in integers

Scan `s` once and count how many characters equal `letter`. Each position contributes at most one match, so a single pass over the string is all the work there is.

The percentage is that count divided by the length of `s`, scaled to whole percent and rounded down. Computing it as `count * 100 // len(s)` multiplies before dividing and keeps every intermediate value an integer: the floor lands exactly where "rounded down" belongs, and floating point never enters the picture.

**Complexity:** `O(n)` time, `O(1)` space.
