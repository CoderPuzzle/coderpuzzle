# Solutions — Hexspeak

## Repeated division, explicit digit alphabet

The Hexspeak string is just the hexadecimal expansion of `n` read most
significant digit first — so peel it by repeated `divmod` 16 and reverse
at the end. Each remainder maps through a three-way alphabet: remainder
`0` becomes `'O'`, remainder `1` becomes `'I'`, remainders `10..15`
become `'A'..'F'`, and any remainder in `2..9` is a decimal digit the
validity rule forbids — the moment one appears the answer is `"ERROR"`.
Working with raw remainders (rather than formatting to a hex string and
scanning it) keeps the check a single comparison per digit and needs no
second pass.

**Complexity:** `O(log n)` time for the ~10 hex digits of `n <= 10^12`,
`O(1)` space beyond the output.
