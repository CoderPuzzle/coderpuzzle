from typing import List


class Solution:
    def rankTeams(self, votes: List[str]) -> str:
        teams = sorted(set(votes[0]))
        position = {team: i for i, team in enumerate(teams)}
        counts = {team: [0] * len(teams) for team in teams}
        for vote in votes:
            for i, team in enumerate(vote):
                counts[team][i] += 1
        ranked = sorted(teams, key=lambda t: tuple([-c for c in counts[t]] + [t]))
        return "".join(ranked)
