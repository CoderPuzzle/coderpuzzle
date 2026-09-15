# Solutions — Minimum Factorization

## Greedy division by the largest digits

The digits of the answer multiply to `num`, and a positive integer with fewer
digits is always smaller than one with more, so the smallest answer uses the
fewest digits whose product is `num`, arranged in ascending order. Fewest
digits is exactly what dividing by the largest digits first finds: taking out
9s while `num` allows packs two 3s into a single digit, then 8 packs three 2s,
then 7, 6 (2·3), 5, 4 (2²), 3 and 2 each take what is left. After the sweep no
two surviving digits can merge into one (2·2 is 4, 2·3 is 6, 2·4 is 8, 3·3 is
9), so the digit count cannot be reduced — and grabbing the largest digits
first also wins the ties among equally short factorizations, since four 2s
pack as 8·2 (`28`) rather than 4·4 (`44`), pushing the big digits rightward.
The divisions land the digits in descending order, so reading them back to
front assembles the smallest arrangement: `48` divides into 8·6 for `68`, and
`15` into 5·3 for `35`.

If anything above 1 survives the sweep, `num` carries a prime factor of 11 or
more, and no product of decimal digits can equal such a number — the answer is
0 (`11`, `13`, `22`, or the highly composite `720720` with its 11·13). At the
other floor, `num = 1` answers 1: the single digit 1 is its own factorization.

`num` fitting the 32-bit input range says nothing about the answer fitting the
32-bit output: `5¹³ = 1220703125` is in range yet factors only into thirteen
5s (`5555555555555`). So the digits are folded into a wider integer — at most
thirteen of them, trivially inside `i64` (and inside the `2⁵³` through which
doubles count integers exactly) — and compared against `2³¹ - 1` before being
returned: `2²⁷` assembles to `888888888` and is returned, while `2²⁸`
assembles to `2888888888` and answers 0, as does the smallest producible
overflow `2·5⁹ = 3906250`, whose only assembly `2555555555` misses the
ceiling.

**Complexity:** `O(log num)` time, `O(log num)` space — at most ~31 divisions.
