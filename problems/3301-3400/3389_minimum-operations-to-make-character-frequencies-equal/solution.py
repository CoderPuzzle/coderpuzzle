class Solution:
    def makeStringGood(self, s: str) -> int:
        # Only the letter counts matter; a good string has every count at
        # 0 or at some common target c, and c never needs to exceed the
        # largest count. For a fixed c each letter either keeps c copies
        # (cost |occ-c|) or is deleted out (cost occ). One refinement: a
        # unit in the letter just left of a kept letter that still needs
        # copies can change into it instead — the hop replaces the delete
        # the unit would pay anyway and saves an insert, worth 1 per
        # unit, up to how many spare units the left letter has and how
        # many copies the right letter still needs. Those flows only run
        # between adjacent letters, so one pass over the alphabet
        # carrying the previous letter's choice (kept or emptied) prices
        # each target; the answer is the cheapest target.
        occ = [0] * 26
        for ch in s:
            occ[ord(ch) - ord("a")] += 1
        best = sum(occ)  # target c = 0: delete everything
        for target in range(1, max(occ) + 1):
            keep = abs(occ[0] - target)  # cheapest: previous letter kept
            zero = occ[0]  # cheapest: previous letter emptied
            for i in range(1, 26):
                v = occ[i]
                need = max(0, target - v)
                save_kept = min(max(0, occ[i - 1] - target), need)
                save_zero = min(occ[i - 1], need)
                cost = abs(v - target)
                keep, zero = (
                    min(keep + cost - save_kept, zero + cost - save_zero),
                    min(keep, zero) + v,
                )
            best = min(best, keep, zero)
        return best
