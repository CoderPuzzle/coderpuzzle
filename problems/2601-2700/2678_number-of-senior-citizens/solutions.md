# Solutions — Number of Senior Citizens

Every record packs the age into two digits at fixed offsets 11-12, so the
whole problem is one scan that decodes that field and counts.

## Fixed-width scan

Each string in details has exactly 15 characters: ten digits of phone
number, one gender character, two age digits, and two seat digits. Because
the layout never varies, the age is always the characters at offsets 11 and
12 — no searching or splitting is needed, just direct indexing.

The solutions decode those two characters with char-code arithmetic,
tens times ten plus ones, which avoids allocating a substring in every
language, and increment a counter whenever the value is strictly greater
than 60. The gender character at offset 10 and the phone and seat fields
never influence the answer.

The count is bounded by details.length, at most 100, so it fits the
smallest integer width any language here uses; no 64-bit accumulation is
required.

**Complexity:** `O(n)` time, `O(1)` space.
