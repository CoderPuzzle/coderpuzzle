# Solutions — Integer to English Words

## Group by thousands, spell each chunk

English reads every group of three digits exactly the same way — the 123 in 123 and in 123000 spells identically — so one helper that spells any number below 1000 covers everything except the scale words. The outer walk visits the scales from the top, Billion, Million, Thousand, and for each one whose group is non-empty spells that group through the helper and appends the scale word; the final group below a thousand carries no scale word of its own.

Inside the helper, the hundreds digit contributes its word plus `Hundred`, and the remainder under 100 resolves in one of two shapes: the teens (`Ten` through `Nineteen`) are unsplittable single words taken wholesale, while twenty and above split into a tens word plus a trailing ones digit. Skipping is what makes middle zeros disappear — a group that is all zeros, such as 1000010's thousands, spells nothing at all and its scale word goes unspoken too, which is why the answer is `One Million Ten` and not something ending in `Thousand`.

Zero is the one input for which every group is empty, so the walk produces no piece at all and the method returns `Zero` outright. Every word is capitalized in place as the tables spell it, and the pieces join with single spaces, reproducing the examples character for character. The input tops out at 2³¹ - 1, whose spelling starts `Two Billion` — the only billions range a 32-bit number can reach.

**Complexity:** `O(1)` time, `O(1)` space — the input is bounded by 2³¹ - 1, so at most four groups of at most four words each are ever spelled.
