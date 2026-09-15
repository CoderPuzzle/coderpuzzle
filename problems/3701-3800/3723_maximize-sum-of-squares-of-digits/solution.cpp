class Solution {
  public:
    string maxSumOfSquares(int num, int sum) {
        // Even nine in every position falls short: no good integer exists.
        if (sum > 9 * num) {
            return "";
        }
        // The optimal digits are forced — floor(sum / 9) nines plus at most
        // one leftover r — and descending order is the largest arrangement,
        // so lay them out from the left and pad with zeros.
        int q = sum / 9, r = sum % 9;
        string result(q, '9');
        if (r > 0) {
            result.push_back('0' + r);
        }
        result.append(num - result.size(), '0');
        return result;
    }
};
