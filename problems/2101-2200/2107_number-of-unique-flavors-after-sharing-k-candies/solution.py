class Solution:
    def shareCandies(self, candies: list[int], k: int) -> int:
        counts = {}
        for flavor in candies:
            counts[flavor] = counts.get(flavor, 0) + 1
        distinct = len(counts)
        for flavor in candies[:k]:
            counts[flavor] -= 1
            if counts[flavor] == 0:
                distinct -= 1

        answer = distinct
        for right in range(k, len(candies)):
            restored = candies[right - k]
            if counts[restored] == 0:
                distinct += 1
            counts[restored] += 1

            removed = candies[right]
            counts[removed] -= 1
            if counts[removed] == 0:
                distinct -= 1
            answer = max(answer, distinct)
        return answer
