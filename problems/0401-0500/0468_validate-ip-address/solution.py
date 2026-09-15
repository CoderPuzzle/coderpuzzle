class Solution:
    def validIPAddress(self, queryIP: str) -> str:
        # Four dotted decimal parts, or eight colon-separated hex groups:
        # the separator count is the first gate, and it settles queries that
        # mix both separators on sight — a valid address of either kind can
        # never contain the other kind's separator.
        parts = queryIP.split(".")
        if len(parts) == 4 and all(self._ipv4_part(part) for part in parts):
            return "IPv4"
        parts = queryIP.split(":")
        if len(parts) == 8 and all(self._ipv6_part(part) for part in parts):
            return "IPv6"
        return "Neither"

    def _ipv4_part(self, part: str) -> bool:
        # 1-3 pure digits, no leading zero ("0" alone is the one way to
        # write zero), and a value of at most 255.
        if not 1 <= len(part) <= 3 or not all(c in "0123456789" for c in part):
            return False
        if len(part) > 1 and part[0] == "0":
            return False
        return int(part) <= 255

    def _ipv6_part(self, part: str) -> bool:
        # 1-4 characters of hex, either case; leading zeros are allowed.
        return 1 <= len(part) <= 4 and all(c in "0123456789abcdefABCDEF" for c in part)
