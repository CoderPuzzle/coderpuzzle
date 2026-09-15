from typing import List


class Solution:
    def findWinningPlayer(self, skills: List[int], k: int) -> int:
        # Challengers arrive in index order exactly as in the queue, so one
        # king-of-the-hill pass reproduces every game until someone hits
        # k wins. If no one does by then the champion holds the global top
        # skill and can never lose again.
        idx, wins = 0, 0
        for i in range(1, len(skills)):
            if skills[i] > skills[idx]:
                idx, wins = i, 1
            else:
                wins += 1
            if wins == k:
                return idx
        return idx
