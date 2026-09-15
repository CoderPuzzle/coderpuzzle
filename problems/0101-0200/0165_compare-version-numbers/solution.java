class Solution {

    public int compareVersion(String version1, String version2) {
        int n = version1.length(),
            m = version2.length();
        int i = 0,
            j = 0;
        while (i < n || j < m) {
            // Read the revision at each pointer as a number, so leading zeros
            // vanish into the value instead of poisoning the comparison.
            long a = 0;
            while (i < n && version1.charAt(i) != '.') a = a * 10 + (version1.charAt(i++) - '0');
            long b = 0;
            while (j < m && version2.charAt(j) != '.') b = b * 10 + (version2.charAt(j++) - '0');
            if (a != b) return a < b ? -1 : 1;
            // Step past the dot; a spent string simply leaves its pointer at n.
            if (i < n) ++i;
            if (j < m) ++j;
        }
        return 0;
    }
}
