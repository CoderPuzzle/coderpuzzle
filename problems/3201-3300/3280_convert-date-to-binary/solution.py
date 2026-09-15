class Solution:
    def convertDateToBinary(self, date: str) -> str:
        # The calendar pads month and day to two digits, but the binary form
        # drops that padding: each dash-separated component is parsed as its
        # plain decimal value and rendered in base 2 with no leading zeroes,
        # then the pieces are rejoined with dashes in year-month-day order.
        # bin() already omits leading zeroes once its 0b prefix is stripped.
        return "-".join(bin(int(part))[2:] for part in date.split("-"))
