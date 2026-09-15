from typing import List


class Solution:
    def findSecretWord(self, master: Master, wordlist: List[str]) -> None:
        def matches(a: str, b: str) -> int:
            return sum(x == y for x, y in zip(a, b))

        candidates = list(wordlist)
        while candidates:
            # Pick the word whose worst-case surviving group is smallest:
            # bucket every candidate by its agreement with the candidate
            # under review, and keep the candidate with the smallest largest
            # bucket (minimax elimination).
            best, best_worst = candidates[0], len(candidates) + 1
            for word in candidates:
                groups = {}
                for other in candidates:
                    score = matches(word, other)
                    groups[score] = groups.get(score, 0) + 1
                worst = max(groups.values())
                if worst < best_worst:
                    best, best_worst = word, worst
            score = master.guess(best)
            if score == len(best):
                return
            candidates = [word for word in candidates if matches(word, best) == score]
