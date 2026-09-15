# Solutions — Lexicographically Smallest Generated String

Every 'T' window copies `str2` into the word verbatim, so only the
positions no 'T' window touches are free; the whole task is choosing those
free characters as small as possible while keeping each 'F' window
different from `str2`.

## Stamp, default, then repair rightmost

Stamp `str2` into every 'T' window first; if two stamps disagree on any
position, no word exists and the answer is `""`. Fill every unstamped
position with `'a'`, the smallest character there is. This already
satisfies all 'T' constraints; what remains is to repair 'F' windows that
accidentally equal `str2`.

Scan the 'F' windows left to right. When one matches `str2`, it must be
made to differ, and the cheapest place to differ is as late as possible:
bump the window's rightmost unstamped position from `'a'` to `'b'`. Because
the window currently matches, that position holds `str2`'s character there,
which is the `'a'` just written — so `'b'` breaks the equality while
everything earlier stays minimal. Overlapping windows keep each other
honest: a bump can only turn an `'a'` into a `'b'`, and any earlier 'F'
window that shared the bumped position and now seems to match would force
`str2` to be periodic with a hole exactly at that position, which its own
suffix already fills with `'a'`. Later windows are simply re-checked after
the bump. A matching 'F' window with no unstamped position at all is
unrepairable, so the answer is `""` — as is any instance whose 'T' stamps
conflict.

On `str1 = "TFTF"`, `str2 = "ab"` the stamps fix `"ab"` at positions 0–1
and 2–3, the lone free position 4 takes `'a'`, neither 'F' window
(`"ba"`, `"aa"`) equals `"ab"`, and the answer is `"ababa"` with no bump
ever firing. The whole pass touches each window a constant number of times.

**Complexity:** `O(n · m)` time, `O(n + m)` space.
