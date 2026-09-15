from typing import List, Optional


class Solution:
    def numberOfWeakCharacters(self, properties: List[List[int]]) -> int:
        # Attack descending; defense ASCENDING within equal attack so that
        # same-attack characters (who can never weaken each other) only ever
        # meet a running max from strictly higher-attack groups.
        props = sorted(properties, key=lambda p: (-p[0], p[1]))
        weak = 0
        # Every earlier character has attack >= the current one's, so the
        # current one is weak exactly when some seen defense is strictly
        # greater -- one running maximum is enough.
        max_defense = 0
        for _, defense in props:
            if defense < max_defense:
                weak += 1
            else:
                # Raise the max only when not weak, so later (lower-attack)
                # groups compare against it.
                max_defense = defense
        return weak
