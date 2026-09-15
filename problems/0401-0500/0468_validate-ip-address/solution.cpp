class Solution {
  public:
    string validIPAddress(string queryIP) {
        // Four dotted decimal parts, or eight colon-separated hex groups:
        // the separator count is the first gate, and it settles queries
        // that mix both separators on sight — a valid address of either
        // kind can never contain the other kind's separator.
        vector<string> parts = split(queryIP, '.');
        if (parts.size() == 4 && allIpv4(parts))
            return "IPv4";
        parts = split(queryIP, ':');
        if (parts.size() == 8 && allIpv6(parts))
            return "IPv6";
        return "Neither";
    }

  private:
    // Hand-rolled split: n separators produce n + 1 parts, empty parts
    // included, so a trailing separator ("1.2.3.4.") cannot masquerade as
    // a valid four-part address the way getline-based splitting allows.
    vector<string> split(const string &text, char separator) {
        vector<string> parts;
        string current;
        for (char ch : text) {
            if (ch == separator) {
                parts.push_back(current);
                current.clear();
            } else {
                current.push_back(ch);
            }
        }
        parts.push_back(current);
        return parts;
    }

    // 1-3 pure digits, no leading zero ("0" alone is the one way to write
    // zero), and a value of at most 255.
    bool allIpv4(const vector<string> &parts) {
        for (const string &part : parts) {
            if (part.empty() || part.size() > 3)
                return false;
            int value = 0;
            for (char ch : part) {
                if (ch < '0' || ch > '9')
                    return false;
                value = value * 10 + (ch - '0');
            }
            if (value > 255)
                return false;
            if (part.size() > 1 && part[0] == '0')
                return false;
        }
        return true;
    }

    // 1-4 characters of hex, either case; leading zeros are allowed.
    bool allIpv6(const vector<string> &parts) {
        for (const string &part : parts) {
            if (part.empty() || part.size() > 4)
                return false;
            for (char ch : part) {
                bool hex = (ch >= '0' && ch <= '9') || (ch >= 'a' && ch <= 'f') || (ch >= 'A' && ch <= 'F');
                if (!hex)
                    return false;
            }
        }
        return true;
    }
};
