from typing import List, Set


class Solution:
    def peopleIndexes(self, favoriteCompanies: List[List[str]]) -> List[int]:
        sets: List[Set[str]] = [set(companies) for companies in favoriteCompanies]
        result: List[int] = []
        for i, small in enumerate(sets):
            covered = False
            for j, big in enumerate(sets):
                if i == j or len(big) <= len(small):
                    continue
                if all(company in big for company in small):
                    covered = True
                    break
            if not covered:
                result.append(i)
        return result
