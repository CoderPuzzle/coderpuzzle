# Stock Price Fluctuation

## Description

You are given a stream of records about a particular stock. Each record
contains a timestamp and the corresponding price of the stock at that
timestamp.

Unfortunately, due to the volatile nature of the stock market, the records do
not come in order. Even worse, some records may be incorrect: another record
with the same timestamp may appear later in the stream, correcting the price
of the previous wrong record.

Design an algorithm that:

- Updates the price of the stock at a particular timestamp, correcting the
  price from any previous records at that timestamp.
- Finds the latest price of the stock based on the current records. The latest
  price is the price at the latest timestamp recorded.
- Finds the maximum price the stock has been, based on the current records.
- Finds the minimum price the stock has been, based on the current records.

Implement the `StockPrice` class:

- `StockPrice()` Initializes the object with no price records.
- `void update(int timestamp, int price)` Updates the price of the stock at
  the given timestamp.
- `int current()` Returns the latest price of the stock.
- `int maximum()` Returns the maximum price of the stock.
- `int minimum()` Returns the minimum price of the stock.

### Example 1

```text
Input:
["StockPrice", "update", "update", "current", "maximum", "update", "maximum", "update", "minimum"]
[[], [1, 10], [2, 5], [], [], [1, 3], [], [4, 2], []]
Output: [null, null, null, 5, 10, null, 5, null, 2]
Explanation:
StockPrice stockPrice = new StockPrice();
stockPrice.update(1, 10); // timestamps are [1] with prices [10].
stockPrice.update(2, 5);  // timestamps are [1, 2] with prices [10, 5].
stockPrice.current();     // return 5 — the latest timestamp is 2, priced 5.
stockPrice.maximum();     // return 10 — the maximum price is 10 at timestamp 1.
stockPrice.update(1, 3);  // the previous price at timestamp 1 was wrong; it is now 3.
                          // timestamps are [1, 2] with prices [3, 5].
stockPrice.maximum();     // return 5 — the maximum price is 5 after the correction.
stockPrice.update(4, 2);  // timestamps are [1, 2, 4] with prices [3, 5, 2].
stockPrice.minimum();     // return 2 — the minimum price is 2 at timestamp 4.
```

### Constraints

- `1 <= timestamp, price <= 10⁹`
- At most `10⁵` calls will be made in total to `update`, `current`,
  `maximum`, and `minimum`.
- `current`, `maximum`, and `minimum` will only be called after `update` has
  been called at least once.

### Follow-up

Corrections never delete a timestamp, they only rewrite its price — how can
you avoid ever _removing_ anything from your max/min structures?

## Hints

### Hint 1

Two pieces of state are independent: which timestamp is the latest one (a
single running maximum), and what price each timestamp currently carries (a
hash map keyed by timestamp). `current` is answered by composing them.

### Hint 2

For `maximum` and `minimum`, a sorted multiset of prices would work but needs
real deletions on every correction. A heap cannot delete an arbitrary entry —
but it does not have to.

### Hint 3

Push `(price, timestamp)` onto a max-heap and a min-heap on every `update`,
and treat an entry as stale when the hash map no longer records that price
for its timestamp. Popping stale tops lazily leaves the true extremum on top,
and each entry is pushed and popped at most once.
