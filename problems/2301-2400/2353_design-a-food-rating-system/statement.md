# Design a Food Rating System

## Description

Design a food rating system that can do the following:

- Modify the rating of a food item listed in the system.
- Return the highest-rated food item for a type of cuisine in the system.

Implement the `FoodRatings` class:

- `FoodRatings(String[] foods, String[] cuisines, int[] ratings)`
  Initializes the system. The food items are described by `foods`,
  `cuisines`, and `ratings`, all of length `n`:
    - `foods[i]` is the name of the `i`th food,
    - `cuisines[i]` is the type of cuisine of the `i`th food, and
    - `ratings[i]` is the initial rating of the `i`th food.
- `void changeRating(String food, int newRating)` Changes the rating of the
  food item with the name `food`.
- `String highestRated(String cuisine)` Returns the name of the food item
  that has the highest rating for the given type of cuisine. If there is a
  tie, return the item with the lexicographically smaller name.

A string `x` is lexicographically smaller than a string `y` if `x` comes
before `y` in dictionary order: either `x` is a prefix of `y`, or `i` is the
first position with `x[i] != y[i]` and `x[i]` comes before `y[i]` in
alphabetic order.

### Example 1

```text
Input:
["FoodRatings", "highestRated", "highestRated", "changeRating", "highestRated", "changeRating", "highestRated"]
[[["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"], ["korean", "japanese", "japanese", "greek", "japanese", "korean"], [9, 12, 8, 15, 14, 7]], ["korean"], ["japanese"], ["sushi", 16], ["japanese"], ["ramen", 16], ["japanese"]]
Output: [null, "kimchi", "ramen", null, "sushi", null, "ramen"]
Explanation:
FoodRatings foodRatings = new FoodRatings(
    ["kimchi", "miso", "sushi", "moussaka", "ramen", "bulgogi"],
    ["korean", "japanese", "japanese", "greek", "japanese", "korean"],
    [9, 12, 8, 15, 14, 7]);
foodRatings.highestRated("korean");    // return "kimchi" — rating 9.
foodRatings.highestRated("japanese");  // return "ramen" — rating 14 beats 12 and 8.
foodRatings.changeRating("sushi", 16); // "sushi" now has a rating of 16.
foodRatings.highestRated("japanese");  // return "sushi" — rating 16.
foodRatings.changeRating("ramen", 16); // "ramen" now has a rating of 16 too.
foodRatings.highestRated("japanese");  // return "ramen" — ties break by name.
```

### Constraints

- `1 <= n <= 2 * 10⁴`
- `n == foods.length == cuisines.length == ratings.length`
- `1 <= foods[i].length, cuisines[i].length <= 10`
- `foods[i]` and `cuisines[i]` consist of lowercase English letters.
- `1 <= ratings[i] <= 10⁸`
- All the strings in `foods` are distinct.
- `food` will be the name of a food item in the system across all calls to
  `changeRating`.
- `cuisine` will be a type of cuisine of at least one food item in the system
  across all calls to `highestRated`.
- At most `2 * 10⁴` calls in total will be made to `changeRating` and
  `highestRated`.

### Follow-up

Each `changeRating` invalidates at most one entry of a cuisine's ranking —
can you keep the rankings correct without ever deleting from them?

## Hints

### Hint 1

Two maps carry the whole state: one from each food to its cuisine and current
rating, and one from each cuisine to its foods. The second map's value is the
only part that needs an order.

### Hint 2

"Highest rating, ties to the smaller name" is exactly the minimum of the pairs
`(-rating, name)` — so a min-heap ordered by that pair ranks a cuisine
correctly with no custom comparator.

### Hint 3

When a rating changes, push a fresh `(-newRating, food)` entry and leave the
old one in place. An entry whose rating disagrees with the food's current
rating in the first map is garbage: peeking the top and popping while it is
stale keeps the heap correct, and a valid top is never removed by a query.
