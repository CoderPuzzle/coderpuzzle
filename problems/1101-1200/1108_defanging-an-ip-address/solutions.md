# Solutions — Defanging an IP Address

## Replace every period with the bracketed form

A defanged address is produced by a single global replacement: every
occurrence of `.` becomes `[.]`. Because the input is guaranteed to be a
valid IPv4 address, the periods appear exactly between the four numeric
segments, and no other character needs touching — so the language's built-in
replace-all over the whole string is the entire algorithm. Each character of
the input is scanned once and copied into the output, with the two-character
expansion applied at each period.

**Complexity:** `O(n)` time and `O(n)` space, where `n` is the length of
`address`.
