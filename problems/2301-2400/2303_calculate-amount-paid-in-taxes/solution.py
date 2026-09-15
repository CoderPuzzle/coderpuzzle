class Solution:
    def calculateTax(self, brackets: List[List[int]], income: int) -> float:
        # Walk the brackets in order; each is taxed on the slice of income
        # between the previous upper bound and min(income, upper).
        paid = 0
        prev = 0
        for upper, percent in brackets:
            if income <= upper:
                paid += (income - prev) * percent
                break
            paid += (upper - prev) * percent
            prev = upper
        # The product sum reaches 1e5 in exact integers; dividing once
        # yields the correctly rounded double of the rational total.
        return paid / 100
