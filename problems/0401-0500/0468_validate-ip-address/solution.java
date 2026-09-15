class Solution {

    public String validIPAddress(String queryIP) {
        // Four dotted decimal parts, or eight colon-separated hex groups:
        // the separator count is the first gate, and it settles queries
        // that mix both separators on sight — a valid address of either
        // kind can never contain the other kind's separator.
        // Split with limit -1 so a trailing separator yields an empty
        // part; the default split() drops it and would call "1.2.3.4."
        // a valid address.
        String[] parts = queryIP.split("\\.", -1);
        if (parts.length == 4 && allIpv4(parts)) return "IPv4";
        parts = queryIP.split(":", -1);
        if (parts.length == 8 && allIpv6(parts)) return "IPv6";
        return "Neither";
    }

    private boolean allIpv4(String[] parts) {
        // 1-3 pure digits, no leading zero ("0" alone is the one way to
        // write zero), and a value of at most 255.
        for (String part : parts) {
            if (part.length() < 1 || part.length() > 3) return false;
            int value = 0;
            for (int i = 0; i < part.length(); i++) {
                char ch = part.charAt(i);
                if (ch < '0' || ch > '9') return false;
                value = value * 10 + (ch - '0');
            }
            if (value > 255) return false;
            if (part.length() > 1 && part.charAt(0) == '0') return false;
        }
        return true;
    }

    private boolean allIpv6(String[] parts) {
        // 1-4 characters of hex, either case; leading zeros are allowed.
        for (String part : parts) {
            if (part.length() < 1 || part.length() > 4) return false;
            for (int i = 0; i < part.length(); i++) {
                if (!isHex(part.charAt(i))) return false;
            }
        }
        return true;
    }

    private boolean isHex(char ch) {
        return (ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'f') || (ch >= 'A' && ch <= 'F');
    }
}
