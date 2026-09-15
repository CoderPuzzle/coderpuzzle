from typing import List


class Solution:
    def minimumTeachings(self, n: int, languages: List[List[int]], friendships: List[List[int]]) -> int:
        # Exactly one language may be taught, so a friendship that already
        # shares some language is settled forever and never forces teaching;
        # filter down to the needy pairs that share nothing. A chosen
        # language L fixes exactly the needy pairs whose both sides know L
        # afterwards, and a user lacking L is taught once however many
        # needy pairs it appears in — so the answer is the minimum, over
        # the n languages, of the users to teach.
        users = len(languages)
        known = [[False] * (n + 1) for _ in range(users + 1)]
        for user in range(1, users + 1):
            for language in languages[user - 1]:
                known[user][language] = True
        needy = [
            (u, v)
            for u, v in friendships
            if not any(known[u][language] and known[v][language] for language in range(1, n + 1))
        ]
        best = users
        for language in range(1, n + 1):
            # taught[user] keeps each user lacking this language counted
            # once across every needy pair it takes part in.
            taught = [False] * (users + 1)
            count = 0
            for u, v in needy:
                for user in (u, v):
                    if not known[user][language] and not taught[user]:
                        taught[user] = True
                        count += 1
            best = min(best, count)
        return best
