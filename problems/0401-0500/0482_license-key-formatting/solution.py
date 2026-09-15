class Solution:
    def licenseKeyFormatting(self, s: str, k: int) -> str:
        # Dashes are separators, not content: build the cleaned key by
        # dropping them and uppercasing everything that remains.
        key = "".join(ch for ch in s if ch != "-").upper()
        if not key:
            return ""
        # Only the first group may be short, and only when the key length
        # leaves a remainder — otherwise it holds the full k characters.
        head = len(key) % k or k
        groups = [key[:head]]
        for i in range(head, len(key), k):
            groups.append(key[i : i + k])
        return "-".join(groups)
