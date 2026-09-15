class Solution:
    def strongPasswordChecker(self, password: str) -> int:
        # The three character classes each need one dedicated step to
        # introduce; a run of length L is settled by replacing every third
        # character of it, L // 3 replaces.
        has_lower = any(c.islower() for c in password)
        has_upper = any(c.isupper() for c in password)
        has_digit = any(c.isdigit() for c in password)
        missing = 3 - (has_lower + has_upper + has_digit)
        n = len(password)
        # Every maximal run of length >= 3, e.g. "aaabbb" -> [3, 3].
        runs = []
        i = 0
        while i < n:
            j = i
            while j < n and password[j] == password[i]:
                j += 1
            if j - i >= 3:
                runs.append(j - i)
            i = j
        # Too short: the inserts that reach length 6 can also break the one
        # possible run and carry the missing classes, so the answer is driven
        # by the length deficit and the class deficit alone.
        if n < 6:
            return max(6 - n, missing)
        # A replace fixes a run slot and can double as the step that
        # introduces a missing class, so the mid regime is a max, not a sum.
        replace = sum(length // 3 for length in runs)
        if n <= 20:
            return max(missing, replace)
        # Too long: n - 20 deletions are unavoidable. A deletion retires a
        # replace only when it pushes a run below a multiple of 3, so the
        # budget goes to runs sitting on a multiple first (1 deletion),
        # then remainder 1 (2 deletions), then remainder 2 (3 deletions).
        delete = n - 20
        for remainder in (0, 1, 2):
            for length in runs:
                if length % 3 == remainder:
                    cost = remainder + 1
                    if delete >= cost:
                        delete -= cost
                        replace -= 1
        # Whatever budget is left meets every run at remainder 2, where each
        # further retired replace costs three deletions — never below zero.
        replace = max(replace - delete // 3, 0)
        return (n - 20) + max(missing, replace)
