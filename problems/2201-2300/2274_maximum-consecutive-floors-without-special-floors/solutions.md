# Solutions — Maximum Consecutive Floors Without Special Floors

## Sort the specials and measure the gaps

Every maximal run of consecutive floors without a special floor is bounded
by special floors or by the ends of the rented range. After sorting
`special`, each adjacent pair `(special[i], special[i + 1])` contributes a
run of `special[i + 1] - special[i] - 1` floors between them, while the
range's own ends contribute `special[0] - bottom` below the first special
floor and `top - special[last]` above the last one. The answer is the
largest of those runs; since there is at least one special floor, a range
covered end to end simply scores non-positive everywhere and returns `0`.

**Complexity:** `O(m log m)` time and `O(1)` extra space, where `m` is the
length of `special`.
