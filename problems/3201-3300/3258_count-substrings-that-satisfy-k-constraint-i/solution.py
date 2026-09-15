class Solution:
    def countKConstraintSubstrings(self, s: str, k: int) -> int:
        n = len(s)
        answer = 0
        for left in range(n):
            zeros = 0
            for right in range(left, n):
                if s[right] == "0":
                    zeros += 1
                ones = right - left + 1 - zeros
                if zeros <= k or ones <= k:
                    answer += 1
        return answer
