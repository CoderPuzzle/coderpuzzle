# Count Ways to Make Array With Product

## Description

You are given a 2D integer array, `queries`. For each `queries[i]`, where `queries[i] = [ni, ki]`, find the number of different ways you can place positive integers into an array of size `ni` such that the product of the integers is `ki`. As the number of ways may be too large, the answer to the `ith` query is the number of ways modulo `10⁹ + 7`.

Return an integer array `answer` where `answer.length == queries.length`, and `answer[i]` is the answer to the `ith` query.

### Example 1

```text
Input: queries = [[2,6],[5,1],[73,660]]
Output: [4,1,50734910]
Explanation: Each query is independent.
[2,6]: There are 4 ways to fill an array of size 2 that multiply to 6: [1,6], [2,3], [3,2], [6,1].
[5,1]: There is 1 way to fill an array of size 5 that multiply to 1: [1,1,1,1,1].
[73,660]: There are 1050734917 ways to fill an array of size 73 that multiply to 660. 1050734917 modulo 10⁹ + 7 = 50734910.
```

### Example 2

```text
Input: queries = [[1,1],[2,2],[3,3],[4,4],[5,5]]
Output: [1,2,3,10,5]
```

### Constraints

- `1 <= queries.length <= 10⁴`
- `1 <= ni, ki <= 10⁴`

## Hints

### Hint 1

Prime-factorize ki and count how many ways you can distribute the primes among the ni positions.

### Hint 2

After prime factorizing ki, suppose there are x amount of a given prime factor. There are (x + n - 1) choose (n - 1) ways to distribute the x prime factors into n positions, allowing repetitions.

### Hint 3

The answer for each query is the product of these binomial coefficients over every distinct prime factor of ki, taken modulo 10⁹ + 7.
