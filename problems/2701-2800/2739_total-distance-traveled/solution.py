class Solution:
    def distanceTraveled(self, mainTank: int, additionalTank: int) -> int:
        # The truck burns fuel one liter at a time at 10 km per liter,
        # and every fifth liter burned triggers an immediate transfer
        # of one liter from the additional tank when it is not empty.
        # Burn the main tank in blocks of five: each block earns 50 km
        # and pulls over one liter if available. Whatever remains is
        # below five liters, so it can never reach another injection
        # point and is burned off directly.
        distance = 0
        while mainTank >= 5:
            mainTank -= 5
            distance += 50
            if additionalTank > 0:
                additionalTank -= 1
                mainTank += 1
        return distance + 10 * mainTank
