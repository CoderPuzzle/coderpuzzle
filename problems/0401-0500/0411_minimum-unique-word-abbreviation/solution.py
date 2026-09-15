from typing import List


class Solution:
    def minAbbreviation(self, target: str, dictionary: List[str]) -> str:
        # One integer per same-length word: bit i is set where the word's
        # letter differs from target's. An abbreviation keeping exactly the
        # positions in K collides with that word precisely when K & diff == 0,
        # so a valid K must hit every diff mask. Words of other lengths can
        # never match an abbreviation of target and are skipped outright.
        m = len(target)
        diffs = set()
        for word in dictionary:
            if len(word) != m:
                continue
            mask = 0
            for i in range(m):
                if word[i] != target[i]:
                    mask |= 1 << i
            if mask:
                diffs.add(mask)
        # Only minimal masks matter: a superset of another mask is hit by
        # anything that hits its subset, so it adds no constraint.
        by_weight = sorted(diffs, key=lambda d: bin(d).count("1"))
        minimal: List[int] = []
        for mask in by_weight:
            if not any(kept & ~mask == 0 for kept in minimal):
                minimal.append(mask)

        full = (1 << m) - 1
        best = (m, target)  # The bare word itself is always a valid answer.

        def build(mask: int) -> str:
            parts = []
            run = 0
            for i in range(m):
                if mask >> i & 1:
                    if run:
                        parts.append(str(run))
                        run = 0
                    parts.append(target[i])
                else:
                    run += 1
            if run:
                parts.append(str(run))
            return "".join(parts)

        def walk(pos: int, mask: int, kept: int, runs: int, open_run: bool, pending: List[int]) -> None:
            nonlocal best
            # Cost floor: letters kept, runs closed, the run still open, and
            # the one extra letter a still-unhit word will eventually force.
            floor = kept + runs + (1 if open_run else 0) + (1 if pending else 0)
            if floor > best[0]:
                return
            if pos == m:
                if not pending:
                    cost = kept + runs + (1 if open_run else 0)
                    candidate = (cost, build(mask))
                    if candidate < best:
                        best = candidate
                return
            # Abbreviate this position: a pending mask with no set bit here or
            # later can never be hit again, so the branch survives only if
            # every mask still has a bit left to aim at.
            future = full ^ ((1 << pos) - 1)
            if not any(d & future == 0 for d in pending):
                walk(pos + 1, mask, kept, runs, True, pending)
            # Keep this letter: masks hit here are satisfied from now on.
            still = [d for d in pending if not d >> pos & 1]
            walk(pos + 1, mask | 1 << pos, kept + 1, runs + (1 if open_run else 0), False, still)

        walk(0, 0, 0, 0, False, minimal)
        return best[1]
