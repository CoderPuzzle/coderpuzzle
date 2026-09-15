class Solution:
    def passwordStrength(self, password: str) -> int:
        lower = set()
        upper = set()
        digit = set()
        special = set()
        for char in password:
            if "a" <= char <= "z":
                lower.add(char)
            elif "A" <= char <= "Z":
                upper.add(char)
            elif "0" <= char <= "9":
                digit.add(char)
            elif char in "!@#$":
                special.add(char)
        return len(lower) + 2 * len(upper) + 3 * len(digit) + 5 * len(special)
