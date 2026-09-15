class Solution:
    def dietPlanPerformance(self, calories: List[int], k: int, lower: int, upper: int) -> int:
        points = 0

        def score(total: int) -> None:
            nonlocal points
            if total < lower:
                points -= 1
            elif total > upper:
                points += 1

        # Sum the first window once; every later window shares k-1 days
        # with its predecessor.
        window = sum(calories[:k])
        score(window)
        for i in range(k, len(calories)):
            window += calories[i] - calories[i - k]
            score(window)
        return points
