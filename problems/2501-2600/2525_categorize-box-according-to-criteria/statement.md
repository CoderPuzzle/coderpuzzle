# Categorize Box According to Criteria

## Description

Given four integers length, width, height, and mass, representing the
dimensions and mass of a box, respectively, return a string representing
the category of the box.

- The box is "Bulky" if:
    - Any of the dimensions of the box is greater or equal to 10⁴.
    - Or, the volume of the box is greater or equal to 10⁹.
- If the mass of the box is greater or equal to 100, it is "Heavy".
- If the box is both "Bulky" and "Heavy", then its category is "Both".
- If the box is neither "Bulky" nor "Heavy", then its category is
  "Neither".
- If the box is "Bulky" but not "Heavy", then its category is "Bulky".
- If the box is "Heavy" but not "Bulky", then its category is "Heavy".

Note that the volume of the box is the product of its length, width and
height.

### Example 1

```text
Input: length = 1000, width = 35, height = 700, mass = 300
Output: "Heavy"
Explanation:
None of the dimensions of the box is greater or equal to 10⁴.
Its volume = 24500000 <= 10⁹. So it cannot be categorized as "Bulky".
However mass >= 100, so the box is "Heavy".
Since the box is not "Bulky" but "Heavy", we return "Heavy".
```

### Example 2

```text
Input: length = 200, width = 50, height = 800, mass = 50
Output: "Neither"
Explanation:
None of the dimensions of the box is greater or equal to 10⁴.
Its volume = 8 * 10⁶ <= 10⁹. So it cannot be categorized as "Bulky".
Its mass is also less than 100, so it cannot be categorized as "Heavy" either.
Since its neither of the two above categories, we return "Neither".
```

### Constraints

- `1 <= length, width, height <= 10⁵`
- `1 <= mass <= 10³`

## Hints

### Hint 1

Use conditional statements to find the right category of the box.
