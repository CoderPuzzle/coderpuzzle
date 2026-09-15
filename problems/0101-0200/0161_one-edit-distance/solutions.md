# Solutions — One Edit Distance

## One pass to the first divergence, then a tail check

A single edit touches exactly one position, so the two strings must agree all the way to their first
disagreement, and from that point on at most one character of slack remains. The scan runs both
strings in lockstep and stops at the first mismatch — or when the shorter string runs out, which is
itself the answer's final case.

At the divergence the length gap names the only edit that could still work. Equal lengths leave
replace as the sole candidate, so the tails after the mismatch must be equal. A gap of one means
insert — a delete viewed from the other side, which is why every solution first orients `s` to be
the shorter string — and then the shorter string from the mismatch on must equal the longer one
advanced by one slot. A gap of two or more is refused before the scan starts: no single edit
changes a length by more than one.

When no mismatch ever appears, `s` is a prefix of `t` and zero edits were needed. Exactly one edit
remains possible only when `t` holds precisely one extra character — the check that sends identical
strings (including the two empty ones of Example 2) to `false`, and `""` against a single character
to `true`.

**Complexity:** `O(n)` time in the shorter string's length; `O(1)` extra space, save the one tail slice copied where slices are not views.
