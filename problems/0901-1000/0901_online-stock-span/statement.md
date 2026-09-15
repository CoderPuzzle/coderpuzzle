# Online Stock Span

## Description

Design an algorithm that collects daily price quotes for some stock and
returns the span of that stock's price for the current day.

The span of the stock's price in one day is the maximum number of consecutive
days (starting from that day and going backward) for which the stock price was
less than or equal to the price of that day.

- If the prices of the stock in the last four days is `[7,2,1,2]` and the
  price of the stock today is `2`, then the span of today is `4` because
  starting from today, the price of the stock was less than or equal to `2`
  for `4` consecutive days.
- If the prices of the stock in the last four days is `[7,34,1,2]` and the
  price of the stock today is `8`, then the span of today is `3` because
  starting from today, the price of the stock was less than or equal to `8`
  for `3` consecutive days.

Implement the `StockSpanner` class:

- `StockSpanner()` Initializes the object of the class.
- `int next(int price)` Returns the span of the stock's price given that
  today's price is `price`.

### Example 1

```text
Input:
["StockSpanner", "next", "next", "next", "next", "next", "next", "next"]
[[], [100], [80], [60], [70], [60], [75], [85]]
Output: [null, 1, 1, 1, 2, 1, 4, 6]
Explanation:
StockSpanner stockSpanner = new StockSpanner();
stockSpanner.next(100); // return 1
stockSpanner.next(80);  // return 1
stockSpanner.next(60);  // return 1
stockSpanner.next(70);  // return 2
stockSpanner.next(60);  // return 1
stockSpanner.next(75);  // return 4, because the last 4 prices (including today's price of 75) were less than or equal to today's price.
stockSpanner.next(85);  // return 6
```

### Constraints

- `1 <= price <= 10⁵`
- At most `10⁴` calls will be made to `next`.

## Hints

### Hint 1

Computing a span by walking back through the stored prices repeats work: any
day counted by today's answer would also be counted by the next day whose
price is at least today's. Look for a structure where those days are counted
**once** and handed over.

### Hint 2

Keep a stack of past days as `(price, span)` pairs with strictly decreasing
prices. A new day with price `p` pops every entry whose price is less than or
equal to `p`, absorbing each popped entry's span into its own — the popped
days can never be part of a future answer, because `p` blocks the way.

### Hint 3

After the pops, the entry remaining below (with price greater than `p`) is
exactly the wall that stops today's count, so today's span is
`1 + the absorbed spans`. Push `(p, span)` — the stack stays decreasing and
every price enters and leaves it at most once.
