from typing import Dict, List, Set, Tuple


class Solution:
    def mostVisitedPattern(self, username: List[str], timestamp: List[int], website: List[str]) -> List[str]:
        per_user: Dict[str, List[Tuple[int, str]]] = {}
        for user, time, site in zip(username, timestamp, website):
            per_user.setdefault(user, []).append((time, site))
        pattern_users: Dict[Tuple[str, str, str], Set[str]] = {}
        for user, visits in per_user.items():
            sites = [site for _time, site in sorted(visits)]
            for i in range(len(sites)):
                for j in range(i + 1, len(sites)):
                    for k in range(j + 1, len(sites)):
                        pattern_users.setdefault((sites[i], sites[j], sites[k]), set()).add(user)
        best: List[str] = []
        best_score = -1
        for pattern, users in pattern_users.items():
            score = len(users)
            if score > best_score or (score == best_score and (not best or list(pattern) < best)):
                best = list(pattern)
                best_score = score
        return best
