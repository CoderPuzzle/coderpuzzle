class Solution:
    def maxProduct(self, s: str) -> int:
        size = 1 << len(s)
        palindrome_length = [0] * size

        for mask in range(1, size):
            subsequence = "".join(s[index] for index in range(len(s)) if mask & (1 << index))
            if subsequence == subsequence[::-1]:
                palindrome_length[mask] = len(subsequence)

        answer = 0
        for first in range(1, size):
            if palindrome_length[first] == 0:
                continue
            second = (size - 1) ^ first
            while second:
                if palindrome_length[second]:
                    answer = max(answer, palindrome_length[first] * palindrome_length[second])
                second = (second - 1) & ((size - 1) ^ first)
        return answer
