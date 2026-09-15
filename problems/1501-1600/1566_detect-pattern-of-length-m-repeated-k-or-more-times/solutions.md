# Solutions — Detect Pattern of Length M Repeated K or More Times

## Consecutive-match run tracking

A brute-force check re-slices and compares whole `m`-length blocks for every
candidate start, which wastes work re-reading elements the previous
comparison already touched. Instead, walk the array once and compare each
element directly against the one `m` positions earlier: `arr[i] == arr[i -
m]` says position `i` extends whatever block began `m` slots back. First
reject arrays too short to even hold `m * k` elements — no pattern of length
`m` can repeat `k` times in fewer than that.

Track a running counter of how many consecutive positions have satisfied
`arr[i] == arr[i - m]`, resetting it to zero on any mismatch. A run of
`m * (k - 1)` consecutive matches means the length-`m` block ending just
before the run started has now been echoed `k - 1` more times after its
first occurrence — `k` copies back to back in total — so the method can
return `true` immediately. If the scan finishes without the run ever
reaching that threshold, no qualifying pattern exists and it returns
`false`.

**Complexity:** `O(n)` time, `O(1)` space.
