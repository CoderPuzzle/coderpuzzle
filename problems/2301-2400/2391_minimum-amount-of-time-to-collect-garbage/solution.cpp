class Solution {
  public:
    int garbageCollection(vector<string> &garbage, vector<int> &travel) {
        // Every unit costs one pickup minute; each truck drives exactly
        // to the last house holding its type. Track those last indices,
        // then add prefix travel once per type that appears past house 0.
        int minutes = 0;
        int last[3] = {-1, -1, -1};
        for (int i = 0; i < (int)garbage.size(); ++i) {
            minutes += (int)garbage[i].size();
            for (char c : garbage[i]) {
                switch (c) {
                case 'M':
                    last[0] = i;
                    break;
                case 'P':
                    last[1] = i;
                    break;
                default:
                    last[2] = i;
                }
            }
        }
        int prefix = 0;
        for (int i = 1; i < (int)garbage.size(); ++i) {
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
};
