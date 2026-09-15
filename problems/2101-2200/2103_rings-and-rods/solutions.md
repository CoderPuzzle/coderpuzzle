# Solutions — Rings and Rods

## One color mask per rod

Assign one bit to each of red, green, and blue. Read the string in color-rod pairs and OR the color's bit into the mask for that rod; repeated rings simply set an already-set bit.

A rod has all three colors exactly when its mask is binary `111`, so count the masks equal to `7` after processing all pairs.

**Complexity:** `O(n)` time and `O(1)` space.
