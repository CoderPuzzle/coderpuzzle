class Solution {

    public int garbageCollection(String[] garbage, int[] travel) {
        // Every unit costs one pickup minute; each truck drives exactly
        // to the last house holding its type. Track those last indices,
        // then add prefix travel once per type that appears past house 0.
        int minutes = 0;
        int[] last = { -1, -1, -1 };
        for (int i = 0; i < garbage.length; ++i) {
            minutes += garbage[i].length();
            for (int j = 0; j < garbage[i].length(); ++j) {
                char c = garbage[i].charAt(j);
                last[c == 'M' ? 0 : c == 'P' ? 1 : 2] = i;
            }
        }
        int prefix = 0;
        for (int i = 1; i < garbage.length; ++i) {
            prefix += travel[i - 1];
            for (int t = 0; t < 3; ++t) {
                if (last[t] == i) {
                    minutes += prefix;
                    last[t] = -1;
                }
            }
        }
        return minutes;
    }
}
