class Solution:
    def minimizeResult(self, expression: str) -> str:
        left, right = expression.split("+")
        best_value = None
        best_form = ""
        for i in range(len(left)):
            for j in range(1, len(right) + 1):
                multiplier_left = int(left[:i]) if i > 0 else 1
                multiplier_right = int(right[j:]) if j < len(right) else 1
                value = multiplier_left * (int(left[i:]) + int(right[:j])) * multiplier_right
                if best_value is None or value < best_value:
                    best_value = value
                    best_form = f"{left[:i]}({left[i:]}+{right[:j]}){right[j:]}"
        return best_form
