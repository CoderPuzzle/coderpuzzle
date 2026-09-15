# Solutions — Ways to Split Array Into Good Subarrays

## Product of Gaps Between Consecutive Ones

If the array contains no 1 at all, no piece can ever be good and the answer is 0. Otherwise each good piece holds exactly one 1, which pins the shape of every split: an array with k ones splits into exactly k pieces, and the j-th piece carries the j-th one from the left. So between two consecutive ones a boundary is mandatory — exactly one separation point, as the hint says — and it has g + 1 possible slots when g zeros separate the pair: immediately after the left 1, or after any of those g zeros. Zeros before the first one or after the last one join the end pieces without creating any further choice.

These per-gap choices are independent, and every combination yields a valid split. A cut chosen inside one gap always sits between that gap's pair of ones, so cuts coming from earlier gaps land strictly left of cuts from later gaps and the pieces stay contiguous and ordered. Walking the pieces left to right, piece j spans from just after the previous cut to its own cut, so it contains the j-th one and excludes both neighbors — the (j−1)-th lies at or before its left edge, the (j+1)-th strictly beyond its right edge. Conversely any valid split fixes each separation point uniquely, making the correspondence a bijection. The count is therefore the product of (gap + 1) factors over the k − 1 gaps between consecutive ones, reduced modulo 10⁹ + 7; a single one contributes an empty product of 1, matching [0,1,0] -> 1.

One scan suffices: remember the index of the previous 1 seen, and at each subsequent 1 multiply the running answer by (current − previous) — exactly gap + 1 — reducing modulo 10⁹ + 7. Residues stay below 10⁹ + 7 and factors are at most 10⁵, so intermediate products stay under about 10¹⁴, far within signed 64-bit range in Java, C++, Go, and Rust; JavaScript performs the multiplication in BigInt to keep it exact regardless of magnitude.

**Complexity:** `O(n)` time, `O(1)` space.
