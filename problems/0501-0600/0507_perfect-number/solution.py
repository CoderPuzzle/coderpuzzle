class Solution:
    def checkPerfectNumber(self, num: int) -> bool:
        # Proper divisors pair around the square root: whenever i divides num,
        # so does num // i, and one of the pair never exceeds sqrt(num). Seed
        # the total with 1 — the partner of the excluded num itself — then add
        # both members on each clean division below the root.
        if num <= 1:
            return False
        total = 1
        i = 2
        while i * i <= num:
            if num % i == 0:
                total += i
                # A candidate sitting exactly on the root is its own partner.
                if i != num // i:
                    total += num // i
            i += 1
        return total == num
