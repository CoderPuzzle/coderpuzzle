# Design Movie Rental System

## Description

You have a movie renting company consisting of `n` shops. You want to
implement a renting system that supports searching for, booking, and
returning movies. The system should also support generating a report of the
currently rented movies.

Each movie is given as a 2D integer array `entries` where
`entries[i] = [shopᵢ, movieᵢ, priceᵢ]` indicates that there is a copy of
movie `movieᵢ` at shop `shopᵢ` with a rental price of `priceᵢ`. Each shop
carries at most one copy of a movie.

The system should support the following functions:

- **Search**: find the cheapest 5 shops that have an unrented copy of a
  given movie. The shops are sorted by price in ascending order, and in case
  of a tie, the one with the smaller `shopᵢ` should appear first. If there
  are fewer than 5 matching shops, all of them are returned. If no shop has
  an unrented copy, an empty list is returned.
- **Rent**: rent an unrented copy of a given movie from a given shop.
- **Drop**: drop off a previously rented copy of a given movie at a given
  shop.
- **Report**: return the cheapest 5 rented movies (possibly of the same movie
  id) as a 2D list `res` where `res[j] = [shopⱼ, movieⱼ]` describes that the
  `j`th cheapest rented movie `movieⱼ` was rented from the shop `shopⱼ`. The
  entries are sorted by price in ascending order, and in case of a tie, the
  one with the smaller `shopⱼ` should appear first, and if there is still a
  tie, the one with the smaller `movieⱼ` first. If there are fewer than 5
  rented movies, all of them are returned. If no movies are currently being
  rented, an empty list is returned.

Implement the `MovieRentingSystem` class:

- `MovieRentingSystem(int n, int[][] entries)` Initializes the system with
  `n` shops and the movies in `entries`.
- `List<Integer> search(int movie)` Returns a list of shops that have an
  unrented copy of the given movie, as described above.
- `void rent(int shop, int movie)` Rents the given movie from the given shop.
- `void drop(int shop, int movie)` Drops off a previously rented movie at the
  given shop.
- `List<List<Integer>> report()` Returns a list of the cheapest rented
  movies, as described above.

The test cases are generated such that `rent` will only be called if the shop
has an unrented copy of the movie, and `drop` will only be called if the shop
had previously rented out the movie.

### Example 1

```text
Input:
["MovieRentingSystem", "search", "rent", "rent", "report", "drop", "search"]
[[3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]], [1], [0, 1], [1, 2], [], [1, 2], [2]]
Output: [null, [1, 0, 2], null, null, [[0, 1], [1, 2]], null, [0, 1]]
Explanation:
MovieRentingSystem movieRentingSystem = new MovieRentingSystem(3, [[0, 1, 5], [0, 2, 6], [0, 3, 7], [1, 1, 4], [1, 2, 7], [2, 1, 5]]);
movieRentingSystem.search(1);  // return [1, 0, 2] — movie 1 is unrented at shops 1, 0 and 2;
                               // shop 1 is cheapest, shops 0 and 2 tie and order by shop number.
movieRentingSystem.rent(0, 1); // rent movie 1 from shop 0; shop 0's unrented movies are [2, 3].
movieRentingSystem.rent(1, 2); // rent movie 2 from shop 1; shop 1's unrented movies are [1].
movieRentingSystem.report();   // return [[0, 1], [1, 2]] — movie 1 from shop 0 (price 5),
                               // then movie 2 from shop 1 (price 7).
movieRentingSystem.drop(1, 2); // drop movie 2 at shop 1; shop 1's unrented movies are [1, 2].
movieRentingSystem.search(2);  // return [0, 1] — movie 2 is unrented at shops 0 and 1.
```

### Constraints

- `1 <= n <= 3 * 10⁵`
- `1 <= entries.length <= 10⁵`
- `0 <= shopᵢ < n`
- `1 <= movieᵢ, priceᵢ <= 10⁴`
- Each shop carries at most one copy of a movie.
- At most `10⁵` calls in total will be made to `search`, `rent`, `drop`, and
  `report`.

### Follow-up

A rented copy that gets dropped looks exactly like a fresh entry — how do you
keep lazy heaps from reporting the same `(shop, movie)` twice?

## Hints

### Hint 1

Prices never change, so `price[(shop, movie)]` is a fixed lookup table. What
changes is which copies are rented — and that state splits per movie
(unrented copies for `search`) versus globally (all rented copies for
`report`).

### Hint 2

For each movie keep a min-heap of `(price, shop)` over its unrented copies,
and keep one global min-heap of `(price, shop, movie)` over the rented
copies. `rent` and `drop` move a copy between the two structures.

### Hint 3

Heaps cannot delete, so treat moves as invalidations: tag every pushed entry
with a fresh token and remember the live token per `(shop, movie)` side. An
entry whose token no longer matches is garbage; `search` and `report` pop
garbage past the top, gather the first five live entries, and push those
back.
