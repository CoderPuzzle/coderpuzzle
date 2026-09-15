class Solution:
    def kMirror(self, k: int, n: int) -> int:
        def make_palindrome(prefix: int, odd_length: bool) -> int:
            palindrome = prefix
            remaining = prefix // 10 if odd_length else prefix
            while remaining:
                palindrome = palindrome * 10 + remaining % 10
                remaining //= 10
            return palindrome

        def is_base_k_palindrome(value: int) -> bool:
            original = value
            reversed_value = 0
            while value:
                reversed_value = reversed_value * k + value % k
                value //= k
            return reversed_value == original

        total = 0
        found = 0
        length = 1
        while found < n:
            half_length = (length + 1) // 2
            for prefix in range(10 ** (half_length - 1), 10**half_length):
                candidate = make_palindrome(prefix, length % 2 == 1)
                if is_base_k_palindrome(candidate):
                    total += candidate
                    found += 1
                    if found == n:
                        return total
            length += 1
        return total
