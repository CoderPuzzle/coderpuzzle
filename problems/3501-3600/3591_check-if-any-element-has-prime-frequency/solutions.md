# Solutions — Check if Any Element Has Prime Frequency

## Frequency count, then trial division per frequency

The question never asks _which_ element — only whether some frequency is
prime — so the solution is two cheap passes. The first counts how often
each distinct value occurs in a hash map, turning the array of numbers
into a handful of counters; with `nums.length <= 100` there are at most
100 of them. The second pass walks those counters and answers `true` at
the first prime found, `false` if none qualifies.

Primality is tested by trial division, which is exact for numbers this
small: 0 and 1 are rejected up front (they are not prime by definition),
and for a frequency `f >= 2` any divisor `d` with `d * d <= f` that splits
`f` refutes primality immediately — composite counters like 4, 99, or 100
die on their first small factor, while 2, 3, 5, or 97 survive the scan and
end the search. Early exit on the first prime means the pass rarely looks
at more than a few counters.

**Complexity:** `O(n + sqrt(n))` time for `n` array elements (each
frequency is at most `n`), `O(n)` space for the count map.
