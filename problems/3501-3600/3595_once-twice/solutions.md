# Solutions — Once Twice

Both solutions exploit the same rigid shape — one value once, one value
twice, the rest exactly three times — but at different altitudes. The hash
map tallies whole values and simply reads off the two whose tallies break
the pattern, trading a linear-size table for directness. The bitwise
automaton drops to the 32 bit columns instead, where the triples vanish
modulo 3; two running masks and one partitioning bit recover both values in
truly constant extra space, the bound the statement asks for.

## Hash Map Frequency Counting

The input has an extremely rigid structure: exactly one value appears once, exactly one appears twice, and every other value appears exactly three times. So identifying the two special values needs no arithmetic at all — one pass with a Counter tallies how often each distinct value occurs, and a second pass over the (few) distinct keys picks out the key with count 1 as the first answer and the key with count 2 as the second.

The scan is a single linear walk over the array, and the frequency table holds at most one entry per distinct value. Python's dict hashes the integers directly, so the full signed 32-bit range, including negatives, needs no special casing. The result is returned in the required order [appears-once, appears-twice].

A per-bit automaton tracking each bit's count modulo 3 could bring space down to O(1), but with at most a handful of distinct values in practice the hash map is already linear-time and simpler; the canonical solution uses the Counter.

**Complexity:** `O(n)` time, `O(n)` space.

## Mod-3 bitwise counting with a differing-bit partition

The triples are the whole obstacle, and they dissolve once counting moves to
individual bits: a value appearing three times adds 3 to every bit column it
touches, which is 0 modulo 3. A plain XOR enjoys no such cancellation — it
erases pairs, not triples — so the count must be taken modulo 3, and a mod-3
count per bit needs two masks. The automaton keeps `ones` for bits whose
running count is 1 (mod 3) and `twos` for bits whose count is 2 (mod 3); each
element advances both with a few AND/XOR/NOT steps.

After the sweep the masks hold the two specials with one gap. A bit set only
in the single contributes 1 and lands in `ones`; a bit set only in the pair
contributes 2 and lands in `twos`; but a bit set in both contributes 3, falls
out of both masks, and is indistinguishable from a bit neither value has. No
further inspection of the two masks can close that gap, which is why a second
observation is needed.

The way out is that the two values differ somewhere: `ones | twos` is exactly
their XOR, and it is nonempty. Its lowest set bit belongs to one special and
not the other, so partitioning the array on that bit puts the single on one
side and the pair on the other, while every triple lands whole on whichever
side matches its own bit. Each side is a smaller instance of the familiar
shape — one exceptional multiplicity, everything else thrice — so running the
same automaton over each side yields the single intact from that side's
`ones` mask and the pair intact from its `twos`, shared bits included.

Values are plain 32-bit patterns throughout; negatives need nothing beyond
re-reading the sign bit once the masks settle. Two sweeps and a handful of
registers meet the statement's constant-space requirement exactly.

**Complexity:** `O(n)` time, `O(1)` space.
