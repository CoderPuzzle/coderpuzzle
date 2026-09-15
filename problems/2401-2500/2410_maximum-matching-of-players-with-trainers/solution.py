from typing import List, Optional


class Solution:
    def matchPlayersAndTrainers(self, players: List[int], trainers: List[int]) -> int:
        players = sorted(players)
        trainers = sorted(trainers)
        # Greedy: pair the weakest unmatched player with the weakest
        # unmatched trainer — optimal by an exchange argument.
        i = 0
        j = 0
        matches = 0
        while i < len(players) and j < len(trainers):
            if players[i] <= trainers[j]:
                matches += 1
                i += 1
                j += 1
            else:
                # Trainer too weak for the weakest remaining player; players
                # only get stronger, so it is useless forever — skip it.
                j += 1
        return matches
