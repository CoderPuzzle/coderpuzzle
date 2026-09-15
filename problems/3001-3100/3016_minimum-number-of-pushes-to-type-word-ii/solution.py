class Solution:
    def minimumPushes(self, word: str) -> int:
        counts = [0] * 26
        for letter in word:
            counts[ord(letter) - ord("a")] += 1
        counts.sort(reverse=True)
        return sum(count * (index // 8 + 1) for index, count in enumerate(counts))
