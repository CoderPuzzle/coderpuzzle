class Solution:
    def digitFrequencyScore(self, n: int) -> int:
        answer = 0
        while n:
            answer += n % 10
            n //= 10
        return answer
