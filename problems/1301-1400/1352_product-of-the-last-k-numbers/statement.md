# Product of the Last K Numbers

## Description

Design an algorithm that accepts a stream of integers and retrieves the
product of the last `k` integers of the stream.

Implement the `ProductOfNumbers` class:

- `ProductOfNumbers()` Initializes the object with an empty stream.
- `void add(int num)` Appends the integer `num` to the stream.
- `int getProduct(int k)` Returns the product of the last `k` numbers in the
  current list. You may assume that the current list always has at least `k`
  numbers.

The test cases are generated so that, at any time, the product of any
contiguous sequence of numbers fits into a signed 32-bit integer without
overflowing.

**Note (CoderPuzzle):** this problem is offered in Python 3 and Java only.

### Example 1

```text
Input:
["ProductOfNumbers", "add", "add", "add", "add", "add", "getProduct", "getProduct", "getProduct", "add", "getProduct"]
[[], [3], [0], [2], [5], [4], [2], [3], [4], [8], [2]]
Output:
[null, null, null, null, null, null, 20, 40, 0, null, 32]
Explanation:
ProductOfNumbers productOfNumbers = new ProductOfNumbers();
productOfNumbers.add(3);        // stream is [3]
productOfNumbers.add(0);        // stream is [3, 0]
productOfNumbers.add(2);        // stream is [3, 0, 2]
productOfNumbers.add(5);        // stream is [3, 0, 2, 5]
productOfNumbers.add(4);        // stream is [3, 0, 2, 5, 4]
productOfNumbers.getProduct(2); // 5 * 4 = 20
productOfNumbers.getProduct(3); // 2 * 5 * 4 = 40
productOfNumbers.getProduct(4); // 0 * 2 * 5 * 4 = 0
productOfNumbers.add(8);        // stream is [3, 0, 2, 5, 4, 8]
productOfNumbers.getProduct(2); // 4 * 8 = 32
```

### Example 2

```text
Input:
["ProductOfNumbers", "add", "getProduct", "add", "getProduct", "add", "add", "getProduct", "getProduct"]
[[], [10], [1], [0], [1], [7], [6], [2], [3]]
Output:
[null, null, 10, null, 0, null, null, 42, 0]
Explanation:
productOfNumbers.add(10);       // stream is [10]
productOfNumbers.getProduct(1); // 10
productOfNumbers.add(0);        // stream is [10, 0]
productOfNumbers.getProduct(1); // 0
productOfNumbers.add(7);        // stream is [10, 0, 7]
productOfNumbers.add(6);        // stream is [10, 0, 7, 6]
productOfNumbers.getProduct(2); // 7 * 6 = 42
productOfNumbers.getProduct(3); // the last 3 numbers are 0, 7, 6, so 0
```

### Constraints

- `0 <= num <= 100`
- `1 <= k <= 4 * 10⁴`
- At most `4 * 10⁴` calls will be made to `add` and `getProduct`.
- The product of the stream at any point in time will fit into a signed
  32-bit integer.

### Follow-up

Could you implement both `add` and `getProduct` in `O(1)` time complexity
instead of `O(k)` time complexity?

## Hints

### Hint 1

A running product of everything seen so far is not enough — `getProduct`
asks about a suffix. Store the product of every prefix of the current block
of numbers, so any suffix product becomes one division.

### Hint 2

A single `0` poisons every product that spans it, and no later number can
repair that. What happens to all your prefix products when a `0` arrives —
and what could you safely restart from?

### Hint 3

After a `0`, the block restarts with the neutral element `1` in front. A
request for the last `k` numbers that reaches back before the start of the
block must have crossed the `0`, so the answer is `0` without any
multiplication.
