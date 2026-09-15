# Solutions — Repeated String Match

How many copies of `a` could ever be needed is fixed by the two lengths
alone: no occurrence of `b` needs more than `ceil(|b|/|a|) + 1` copies, and
none can fit into fewer than `ceil(|b|/|a|)`. The whole problem is two
substring searches against those bounds.

## Two candidate repetitions

Write `n = |a|`, `m = |b|`, and `q = ceil(m / n)`. The lower bound is length
alone: `b` cannot sit inside a text shorter than itself, so any answer `k`
satisfies `kn >= m`, that is `k >= q`. The upper bound comes from
periodicity: `a` repeated forever is periodic with period `n`, so an
occurrence of `b` inside any number of copies can be slid left by whole
periods until it starts within the first copy of `a`, where it ends within
`n + m <= n(q + 1)` characters. So `b` appears in some repetition of `a`
exactly when it appears in `a^(q+1)`, and the answer is `q` or `q + 1` —
or neither, which is -1.

The implementation builds `a^q` and searches it for `b`; on failure it
appends one more copy of `a` and searches `a^(q+1)`. Each text is at most
`m + 2n` characters, so both searches together stay within the input's
order of magnitude, and `q >= 1` always holds because both strings are
non-empty.

The substring test is delegated to each language's native search
(`str.find`, `indexOf`/`contains`, `string::find`, `strings.Contains`,
`str::find`, `String.prototype.indexOf`). Their worst-case guarantees
differ by runtime — some are worst-case-linear two-way or KMP-style scans,
others skip-table-accelerated naive searches — but on the lowercase
alphabet and the 10⁴ length bounds here each scans its short text in
effectively linear time.

**Complexity:** `O(n + m)` time, `O(n + m)` space.
