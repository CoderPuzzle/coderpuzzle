from typing import List


class Solution:
    def findRelativeRanks(self, score: List[int]) -> List[str]:
        # Sorting the athletes, not the array: an index list ordered by
        # descending score carries each athlete's placement back to its
        # original slot, so the answer keeps the input's order.
        order = sorted(range(len(score)), key=lambda i: score[i], reverse=True)
        medals = ["Gold Medal", "Silver Medal", "Bronze Medal"]
        answer = [""] * len(score)
        for place, i in enumerate(order):
            answer[i] = medals[place] if place < 3 else str(place + 1)
        return answer
