# Palindromic Subarray Sum

## Description

You are given an integer array nums.

Return the maximum possible sum of a subarray of nums that is a palindrome.

### Example 1

Input: nums = [10,10]

Output: 20

Explanation:

The whole array [10,10] is a palindrome. Therefore, the maximum sum is 10 + 10 = 20.

### Example 2

Input: nums = [1,2,3,2,1,5,6]

Output: 9

Explanation:

The contiguous subarray [1,2,3,2,1] is a palindrome. Its sum is 1 + 2 + 3 + 2 + 1 = 9 and it is the maximum sum.

### Example 3

Input: nums = [7,1,2,1,7,3,4,3,4]

Output: 18

Explanation:

The contiguous subarray [7,1,2,1,7] is a palindrome. Its sum is 7 + 1 + 2 + 1 + 7 = 18 and it is the maximum sum.

### Example 4

Input: nums = [1,2,3,4,5]

Output: 5

Explanation:

No subarray with length greater than 1 is a palindrome. The largest element in the array is 5. Therefore, the answer is 5.

### Example 5

Input: nums = [1000]

Output: 1000

Explanation:

The subarray with only one element is a palindrome. Therefore, the answer is 1000.

### Constraints

    1 <= nums.length <= 10⁵
    1 <= nums[i] <= 10⁹

## Hints

### Hint 1

1a (Manacher). Since all elements are positive, for any fixed center, the best palindromic subarray is the longest one around that center.

### Hint 2

1b (Manacher). Use Manacher's algorithm adapted to arrays to compute the maximum odd-length and even-length palindrome radius for every center.

### Hint 3

1c (Manacher). Use prefix sums to compute the sum of each longest palindromic subarray in constant time, and take the maximum.

### Hint 4

2a (Binary Search + Hashing). Build rolling hashes for nums and for the reversed array. A subarray nums[l..r] is a palindrome if its hash equals the hash of the corresponding segment in the reversed array.

### Hint 5

2b (Binary Search + Hashing). For each odd and even center, binary search the largest palindrome radius around that center. The check is monotonic because if a larger radius is a palindrome, then every smaller radius around the same center is also a palindrome.

### Hint 6

2c (Binary Search + Hashing). After finding the largest radius for a center, use prefix sums to get the sum of that palindromic subarray in constant time.

### Hint 7

2d (Binary Search + Hashing). Take the maximum sum over all centers.
