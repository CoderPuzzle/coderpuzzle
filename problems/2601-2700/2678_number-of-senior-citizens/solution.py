from typing import List


class Solution:
    def countSeniors(self, details: List[str]) -> int:
        # The age is the two-digit field at offsets 11-12; char-code
        # arithmetic decodes it without building a substring. The count is
        # at most len(details) <= 100, so plain ints are plenty.
        count = 0
        for record in details:
            age = (ord(record[11]) - ord("0")) * 10 + (ord(record[12]) - ord("0"))
            if age > 60:
                count += 1
        return count
