# Solutions — Split Message Based on Limit

## Enumerate the part count

For a fixed total `b`, each part `a` carries exactly `limit` characters
minus the length of its suffix `"<a/b>"`, except the last part which may
carry fewer. Summing over `a = 1..b` gives the total message capacity a
`b`-part split can hold, so the fewest-parts requirement is answered by the
smallest `b` whose capacity is at least the message length. Enumerating `b`
in increasing order and taking the first working value is therefore exact.
The widest suffix, `"<b/b>"`, must itself fit within `limit`, which bounds
how large `b` can be; once `2 * len(str(b)) + 3 > limit`, every larger `b`
is impossible and the search stops.

Computing capacity naively costs `O(b)` per candidate, which is quadratic
overall. The digit-length total `Σ len(str(a))` is instead precomputed as a
prefix sum over the integer range, so each candidate's capacity drops to
`O(1)`: `b * limit - digitLen[b] - b * len(str(b)) - 3b`. Since the message
is at most `10⁴` characters, the whole search is comfortably linear.

Once the minimal `b` is found, the parts are assembled left to right, each
taking `limit - len(suffix)` message characters (the last takes whatever
remains). Because the chosen `b` is minimal, the message always runs out
inside the final part, so every non-last part is exactly `limit` long.
Capacity values stay far below `2³¹`, so 32-bit arithmetic suffices in all
seven languages.

**Complexity:** `O(n + s)` time and `O(n + s)` space, where `s` is the
size of the returned parts array (the message plus every suffix).
