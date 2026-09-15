# Koko Eating Bananas

## Description

Koko loves to eat bananas. There are `n` piles of bananas, the `i`th pile
has `piles[i]` bananas. The guards have gone and will come back in `h` hours.

Koko can decide her bananas-per-hour eating speed of `k`. Each hour, she
chooses some pile of bananas and eats `k` bananas from that pile. If the pile
has less than `k` bananas, she eats all of them instead and will not eat any
more bananas during this hour.

Koko likes to eat slowly but still wants to finish eating all the bananas
before the guards return.

Return the minimum integer `k` such that she can eat all the bananas within
`h` hours.

### Example 1

```text
Input: piles = [3,6,7,11], h = 8
Output: 4
```

### Example 2

```text
Input: piles = [30,11,23,4,20], h = 5
Output: 30
```

### Example 3

```text
Input: piles = [30,11,23,4,20], h = 6
Output: 23
```

### Constraints

- `1 <= piles.length <= 10^4`
- `piles.length <= h <= 10^9`
- `1 <= piles[i] <= 10^9`

## Hints

### Hint 1

If Koko eats at speed k, pile p takes ceiling(p / k) hours; the total over all piles is monotone non-increasing in k.

### Hint 2

Binary search k over the range [1, max(piles)] — the answer is never larger than the biggest pile.

### Hint 3

Watch for overflow when summing the hours: use a 64-bit accumulator in languages with fixed-width integers.
