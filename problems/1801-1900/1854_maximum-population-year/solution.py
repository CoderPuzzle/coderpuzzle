class Solution:
    def maximumPopulation(self, logs: List[List[int]]) -> int:
        # Difference array over years: +1 at birth, -1 at death; a prefix
        # sweep reconstructs each year's population.
        delta = [0] * 2052
        for birth, death in logs:
            delta[birth] += 1
            delta[death] -= 1
        best_year, best_pop, cur = 1950, -1, 0
        for year in range(1950, 2051):
            cur += delta[year]
            if cur > best_pop:
                best_pop, best_year = cur, year
        return best_year
