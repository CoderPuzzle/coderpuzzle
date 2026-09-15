from typing import List


class Solution:
    def findCommonResponse(self, responses: List[List[str]]) -> str:
        # Deduplicate within each day first — a response repeated in the same
        # day still counts once — then tally the deduped words across days in
        # a hash map and keep the best (count, lexicographic order) seen.
        counts = {}
        for day in responses:
            for word in dict.fromkeys(day):
                counts[word] = counts.get(word, 0) + 1
        best_word = ""
        best_count = 0
        for word, count in counts.items():
            if count > best_count or (count == best_count and word < best_word):
                best_word = word
                best_count = count
        return best_word
