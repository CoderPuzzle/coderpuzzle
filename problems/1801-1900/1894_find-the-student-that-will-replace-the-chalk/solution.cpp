class Solution {
  public:
    // Whole rounds consume sum(chalk); simulate only the remainder.
    int chalkReplacer(vector<int> &chalk, long long k) {
        long long total = 0;
        for (int c : chalk)
            total += c;
        k %= total;
        for (int i = 0; i < (int)chalk.size(); i++) {
            if (k < chalk[i])
                return i;
            k -= chalk[i];
        }
        return -1; // unreachable: remainder < total
    }
};
