class Solution {
  public:
    int numberOfBeams(vector<string> &bank) {
        int beams = 0;
        int previous = 0;
        for (const string &row : bank) {
            int devices = count(row.begin(), row.end(), '1');
            if (devices > 0) {
                beams += previous * devices;
                previous = devices;
            }
        }
        return beams;
    }
};
