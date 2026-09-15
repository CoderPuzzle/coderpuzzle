class Solution {
  public:
    int compareVersion(string version1, string version2) {
        int n = (int)version1.size(), m = (int)version2.size();
        int i = 0, j = 0;
        while (i < n || j < m) {
            // Read the revision at each pointer as a number, so leading zeros
            // vanish into the value instead of poisoning the comparison.
            long long a = 0;
            while (i < n && version1[i] != '.')
                a = a * 10 + (version1[i++] - '0');
            long long b = 0;
            while (j < m && version2[j] != '.')
                b = b * 10 + (version2[j++] - '0');
            if (a != b)
                return a < b ? -1 : 1;
            // Step past the dot; a spent string simply leaves its pointer at n.
            if (i < n)
                ++i;
            if (j < m)
                ++j;
        }
        return 0;
    }
};
