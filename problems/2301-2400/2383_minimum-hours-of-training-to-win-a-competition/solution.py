class Solution:
    def minNumberOfHours(
        self, initialEnergy: int, initialExperience: int, energy: List[int], experience: List[int]
    ) -> int:
        # Energy only ever drains, so one shortfall computation covers
        # every fight; experience grows after each win, so top up just
        # enough whenever the next opponent is not strictly weaker.
        hours = 0
        e = initialEnergy
        x = initialExperience
        for cost, gain in zip(energy, experience):
            if x <= gain:
                hours += gain + 1 - x
                x = gain + 1
            x += gain
            e -= cost
        if e <= 0:
            hours += 1 - e
        return hours
