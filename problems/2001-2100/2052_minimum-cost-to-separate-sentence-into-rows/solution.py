class Solution:
    def minimumCost(self, sentence: str, k: int) -> int:
        words = sentence.split(" ")
        count = len(words)
        dp = [0] * (count + 1)

        for start in range(count - 1, -1, -1):
            best = 10**30
            row_length = 0
            for end in range(start, count):
                row_length += len(words[end]) + (1 if end > start else 0)
                if row_length > k:
                    break
                if end == count - 1:
                    candidate = 0
                else:
                    unused = k - row_length
                    candidate = unused * unused + dp[end + 1]
                best = min(best, candidate)
            dp[start] = best
        return dp[0]
