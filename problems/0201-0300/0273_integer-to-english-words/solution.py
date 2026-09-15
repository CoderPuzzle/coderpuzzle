from typing import List, Optional


class Solution:
    def numberToWords(self, num: int) -> str:
        ones = [
            "",
            "One",
            "Two",
            "Three",
            "Four",
            "Five",
            "Six",
            "Seven",
            "Eight",
            "Nine",
        ]
        teens = [
            "Ten",
            "Eleven",
            "Twelve",
            "Thirteen",
            "Fourteen",
            "Fifteen",
            "Sixteen",
            "Seventeen",
            "Eighteen",
            "Nineteen",
        ]
        tens = [
            "",
            "",
            "Twenty",
            "Thirty",
            "Forty",
            "Fifty",
            "Sixty",
            "Seventy",
            "Eighty",
            "Ninety",
        ]

        # One group below 1000: the hundreds digit's word plus "Hundred",
        # then the remainder under 100 — taken wholesale through the teens,
        # tens word plus ones digit otherwise.
        def under_thousand(value: int) -> str:
            group: List[str] = []
            if value >= 100:
                group.append(ones[value // 100])
                group.append("Hundred")
                value %= 100
            if value >= 20:
                group.append(tens[value // 10])
                value %= 10
            elif value >= 10:
                group.append(teens[value - 10])
                value = 0
            if value > 0:
                group.append(ones[value])
            return " ".join(group)

        # Walk the scales high to low: each non-empty group spells itself and
        # appends its scale word, so an all-zero middle group (1000010's
        # thousands) contributes nothing at all.
        pieces: List[str] = []
        for scale, name in ((1000000000, "Billion"), (1000000, "Million"), (1000, "Thousand")):
            if num >= scale:
                pieces.append(under_thousand(num // scale))
                pieces.append(name)
                num %= scale
        if num > 0:
            pieces.append(under_thousand(num))
        # Zero is the only input that leaves no piece — it spells itself.
        return " ".join(pieces) if pieces else "Zero"
