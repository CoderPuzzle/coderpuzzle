class Solution:
    def strongPasswordCheckerII(self, password: str) -> bool:
        if len(password) < 8:
            return False
        special = "!@#$%^&*()-+"
        has_lower = has_upper = has_digit = has_special = False
        for index, char in enumerate(password):
            if index > 0 and char == password[index - 1]:
                return False
            if "a" <= char <= "z":
                has_lower = True
            elif "A" <= char <= "Z":
                has_upper = True
            elif "0" <= char <= "9":
                has_digit = True
            elif char in special:
                has_special = True
        return has_lower and has_upper and has_digit and has_special
