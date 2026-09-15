# Solutions — Validate IP Address

## Split on the separator, then check every part

Both formats reduce to the same skeleton, applied once per separator. Split on
`'.'`: a valid IPv4 is exactly four parts, each 1-3 pure digits with no leading
zero (`"0"` alone is the one way to write zero) and a value of at most 255.
Split on `':'`: a valid IPv6 is exactly eight groups of 1-4 hexadecimal
characters in either case, where leading zeros are legal. Everything else —
wrong part count, an empty part, a stray character — falls through both checks
to `"Neither"`. Deciding digits by an explicit character range rather than a
locale-aware helper keeps the two languages of the two formats identical.

The part count does more work than it seems to. A valid IPv4 can never contain
`':'` and a valid IPv6 can never contain `'.'`, because the other separator
would have to sit inside a part and parts admit neither, so a query mixing both
separators fails both branches with no special case at all. The same count is
what rejects the statement's own exhibits: `"192.168.01.1"` dies on its leading
zero, `"2001:0db8:85a3::8A2E:037j:7334"` on an empty group and the `j`, and
`"02001:…"` on its five-character group. One portability trap hides in the
split itself: several standard-library splitters silently drop a trailing empty
part (or, with `getline`, never emit it), which would pronounce `"1.2.3.4."` a
valid address — the split used here keeps every part, so `n` separators always
yield `n + 1` of them.

Each character of `queryIP` is examined a constant number of times, and the
working state beyond the split parts is a handful of scalars.

**Complexity:** `O(n)` time, `O(1)` space.
