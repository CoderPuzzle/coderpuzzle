# Solutions — String Transformation

## KMP Rotation Counting with Matrix Exponentiation

One operation rotates `s` by some nonzero shift, so after any number of operations `s` is always one of its `n` rotations; if `t` is not among them the answer is `0`. Counting how many rotations of `s` equal `t` is a string matching job: search for `t` inside `s + s` truncated by one character (length `2n - 1`, so the full-string rotation is not double counted) using KMP. The failure function is built on `t`, and each full match found at offset `i` marks a rotation equal to `t`; call the count `cnt`.

Now aggregate states. Split the `n` rotations into two classes — the `cnt` positions that spell `t` and the `n - cnt` that do not — and count ways over exactly `k` operations. From a rotation in class T, a single operation lands on: `cnt - 1` other class-T rotations (the identity shift is forbidden) and `n - cnt` class-non-T rotations. From a non-T rotation it lands on `cnt` class-T and `n - 1 - cnt` class-non-T rotations. This gives the 2x2 transition matrix `[[cnt-1, cnt], [n-cnt, n-1-cnt]]`, because the number of length-`k` walks between classes depends only on the starting class.

Since `k` reaches `10^15`, the matrix is raised to the `k`-th power by repeated squaring — each squaring is a constant-size 2x2 multiplication, so only `O(log k)` of them are needed, all under the `10^9 + 7` modulus. The starting vector is `(1, 0)` when `s == t` (the process begins on a class-T rotation) and `(0, 1)` otherwise, and the answer is the class-T component after applying the powered matrix. When `cnt = 0` this automatically yields `0`, consistent with `t` not being reachable.

**Complexity:** `O(n + log k)` time, `O(n)` space.
