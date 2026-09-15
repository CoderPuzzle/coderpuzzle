# Fair Candy Swap

## Description

Alice and Bob have a different total number of candies. You are given two
integer arrays `aliceSizes` and `bobSizes`, where `aliceSizes[i]` is the
number of candies in the `i`th box of candy that Alice has and
`bobSizes[j]` is the number of candies in the `j`th box of candy that Bob
has.

Since they are friends, they would like to exchange one candy box each so
that, after the exchange, they both have the same total amount of candy.
The total amount of candy a person has is the sum of the number of candies
in each box they have.

Return an integer array `answer` where `answer[0]` is the number of
candies in the box that Alice must exchange and `answer[1]` is the number
of candies in the box that Bob must exchange. It is guaranteed that at
least one answer exists.

When several swaps work, this problem pins one deterministic answer: among
all valid pairs, the one whose Alice box holds the fewest candies, with
the Bob box breaking any tie.

### Example 1

```text
Input: aliceSizes = [1,1], bobSizes = [2,2]
Output: [1,2]
Explanation: Alice's total is 2 and Bob's is 4. After Alice gives a
1-candy box and receives a 2-candy box, both hold 3. Alice's two boxes are
identical, as are Bob's, so the pinned answer is the pair [1,2].
```

### Example 2

```text
Input: aliceSizes = [1,2], bobSizes = [2,3]
Output: [1,2]
Explanation: Alice's total is 3 and Bob's is 5, so the gap of 2 candies
must split evenly between the two traded boxes. Swapping 1 for 2 leaves
both at 4; swapping 2 for 3 works as well, but 1 is the smaller Alice box,
so the pin selects [1,2].
```

### Example 3

```text
Input: aliceSizes = [2], bobSizes = [1,3]
Output: [2,3]
Explanation: Alice's total is 2 and Bob's is 4. Trading the 2-candy box
for the 3-candy box leaves both at 3, the only pair that evens the totals.
```

### Constraints

- `1 <= aliceSizes.length, bobSizes.length <= 10⁴`
- `1 <= aliceSizes[i], bobSizes[j] <= 10⁵`
- Alice and Bob have a different total number of candies.
- There will be at least one valid answer for the given input.
