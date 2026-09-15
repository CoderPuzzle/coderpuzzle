from typing import List, Optional


class Solution:
    def smallestSufficientTeam(self, req_skills: List[str], people: List[List[str]]) -> List[int]:
        skill_index = {skill: i for i, skill in enumerate(req_skills)}
        # compress each person to the bitmask of skills they contribute
        masks = []
        for skills in people:
            mask = 0
            for skill in skills:
                mask |= 1 << skill_index[skill]
            masks.append(mask)

        full = (1 << len(req_skills)) - 1
        # dp maps each covered-skill mask to the smallest team achieving it
        dp = {0: []}
        for i, person_mask in enumerate(masks):
            # buffer this round's updates so person i cannot be added twice
            # to the same chain
            new_entries = {}
            for state, team in list(dp.items()):
                new_state = state | person_mask
                candidate = team + [i]
                # keep the candidate only when it is shorter than the best
                # known team for the resulting mask (or none exists yet)
                if new_state not in dp or len(dp[new_state]) > len(candidate):
                    if new_state not in new_entries or len(new_entries[new_state]) > len(candidate):
                        new_entries[new_state] = candidate
            dp.update(new_entries)

        # team covering every required skill, sorted for a deterministic order
        return sorted(dp[full])
