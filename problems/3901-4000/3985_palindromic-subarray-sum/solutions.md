# Solutions

The solution uses Manacher radii with prefix sums.

## Manacher radii with prefix sums

Run Manacher's algorithm on the integer array to find the longest odd and even palindrome centered at every position. Because every value is positive, shortening a palindrome around a fixed center can only decrease its sum, so only the longest radius for each center matters.

Build 64-bit prefix sums and use each radius to evaluate its palindrome in constant time. Taking the largest of those sums handles both parity families and the single-element case.

**Complexity:** O(n) time and O(n) space.
