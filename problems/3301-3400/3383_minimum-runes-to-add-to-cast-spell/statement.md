# Minimum Runes to Add to Cast Spell

## Description

Alice has just graduated from wizard school, and wishes to cast a magic spell to celebrate. The magic spell contains certain focus points where magic needs to be concentrated, and some of these focus points contain magic crystals which serve as the spell's energy source. Focus points can be linked through directed runes, which channel magic flow from one focus point to another.

You are given an integer `n` denoting the number of focus points and an array of integers `crystals` where `crystals[i]` indicates a focus point which holds a magic crystal. You are also given two integer arrays `flowFrom` and `flowTo`, which represent the existing directed runes. The `i`-th rune allows magic to freely flow from focus point `flowFrom[i]` to focus point `flowTo[i]`.

You need to find the number of directed runes Alice must add to her spell, such that each focus point either:

- Contains a magic crystal.
- Receives magic flow from another focus point.

Return the minimum number of directed runes that she should add.

### Example 1

```text
Input: n = 6, crystals = [0], flowFrom = [0,1,2,3], flowTo = [1,2,3,0]
Output: 2
Explanation: Add two directed runes:
From focus point 0 to focus point 4.
From focus point 0 to focus point 5.
```

![Focus point 0 (with the crystal) sits in the rune cycle 0 -> 1 -> 2 -> 3 -> 0; dashed runes from 0 feed the detached points 4 and 5.](figures/example-1.svg)

### Example 2

```text
Input: n = 7, crystals = [3,5], flowFrom = [0,1,2,3,5], flowTo = [1,2,0,4,6]
Output: 1
Explanation: Add a directed rune from focus point 4 to focus point 2.
```

![The cycle 0 -> 1 -> 2 -> 0 receives no crystal flow, while crystals at 3 and 5 feed 4 and 6; one dashed rune from 4 to 2 rescues the cycle.](figures/example-2.svg)

### Constraints

- `2 <= n <= 10⁵`
- `1 <= crystals.length <= n`
- `0 <= crystals[i] <= n - 1`
- `1 <= flowFrom.length == flowTo.length <= min(2 * 10⁵, (n * (n - 1)) / 2)`
- `0 <= flowFrom[i], flowTo[i] <= n - 1`
- `flowFrom[i] != flowTo[i]`
- All pre-existing directed runes are distinct.

## Hints

### Hint 1

Contract strongly connected components: every focus point in one SCC can already reach every other focus point in it.

### Hint 2

In the condensation DAG, a component is satisfied if it contains a crystal or is reachable from a crystal-containing component.

### Hint 3

Each source component (no incoming rune) that is not reachable from a crystal needs exactly one added rune, and adding it satisfies the whole downstream region.
