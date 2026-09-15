# Solutions — Masking Personal Information

The two message kinds hide behind a single tell: an email always carries the
`'@'` sign and a phone number never does, so locating that one character is
the entire classification. Masking then keeps only a bounded slice of what it
scans — an email keeps its name's first and last letters and its domain, a
phone keeps its last four digits — and every other character folds into a
fixed template of asterisks and dashes, all assembled in one left-to-right
pass.

## Classify on the `'@'`, then rebuild from a template

The email branch walks the string once. Position 0 is the name's first
letter, which survives; position 1 emits the fixed five asterisks standing
for the name's middle (the name is at least two letters, so even `"ab"` wears
the full five, and a two-letter name has its second letter kept right after
them); everything from the name's last letter through the end survives too.
Each surviving character is folded to lowercase on the way out by adding 32
to its code when it sits in the `A`–`Z` range — the constant ASCII gap — so
name and domain come out lowercase with no library calls.

The phone branch never looks at the separators: digits are collected and
`'+'`, `'-'`, `'('`, `')'`, and `' '` fall out of the scan on their own. The
digit count then picks the shape with no per-country-code branches: ten
digits are the bare local number, and each digit beyond ten contributes one
asterisk behind a `'+'` and ahead of the shared `"***-***-"` tail, which the
last four digits close out. A single output buffer serves both branches, and
each input character is visited exactly once, so the masked string is
produced directly as it is read.

**Complexity:** `O(n)` time, `O(n)` space.
