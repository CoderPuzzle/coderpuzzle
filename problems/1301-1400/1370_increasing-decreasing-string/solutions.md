# Solutions — Increasing Decreasing String

## Approach: Frequency sweep up and down

The seven-step ritual is a simulation of counting: each increasing pass is
"walk 'a' through 'z' appending every letter whose count is still positive",
and each decreasing pass walks 'z' through 'a' the same way. A 26-slot
frequency table plus alternating-direction sweeps reproduces the algorithm
exactly — within one sweep every appended character really was greater (or
smaller) than the previous one, because the sweep visits letters strictly in
order. Repeat until the total count reaches zero.

**Complexity:** `O(n + K * 26)` time for input length `n` and `K` sweeps
(each full sweep either appends at least one character or stops the loop),
`O(26)` space.
