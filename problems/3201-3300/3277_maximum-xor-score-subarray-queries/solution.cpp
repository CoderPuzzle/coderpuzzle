class Solution {
  public:
    vector<int> maximumSubarrayXor(vector<int> &nums, vector<vector<int>> &queries) {
        // One round of the score process turns an array into its adjacent
        // XORs, so unrolling the rounds gives a Pascal-style recurrence
        // over GF(2): score[l][r] = score[l][r-1] ^ score[l+1][r], seeded
        // by the singleton subarrays — binomial coefficients mod 2 decide
        // which elements reach the final XOR. On top of the score rows we
        // fold a running maximum: best[l][r], the largest score of any
        // subarray inside [l..r], splits by endpoints into max(score[l][r],
        // best[l][r-1], best[l+1][r]) — any such subarray either drops the
        // left end, drops the right end, or is [l..r] itself. Rows are
        // built for l = n-1 down to 0, keeping only the previous score row
        // while every finished best row is stored, so a query is one lookup
        // into its left endpoint's row: O(n^2 + q) time and O(n^2) stored
        // cells (~8 MB of int cells at n=2000). Every element is at most
        // 2^31 - 1, so bit 31 is always 0, and the XOR of two bit-31-zero
        // words has bit 31 zero too — by induction every score lies in
        // [0, 2^31 - 1], so int storage never overflows.
        int n = (int)nums.size();
        vector<vector<int>> best_rows(n);
        vector<int> prev_score, prev_best;
        for (int left = n - 1; left >= 0; --left) {
            int width = n - left;
            vector<int> cur_score(width), cur_best(width);
            cur_score[0] = cur_best[0] = nums[left];
            for (int j = 1; j < width; ++j) {
                int s = cur_score[j - 1] ^ prev_score[j - 1];
                cur_score[j] = s;
                cur_best[j] = max(s, max(cur_best[j - 1], prev_best[j - 1]));
            }
            best_rows[left] = cur_best;
            prev_score = move(cur_score);
            prev_best = move(cur_best);
        }
        vector<int> answer;
        answer.reserve(queries.size());
        for (auto &query : queries) {
            answer.push_back(best_rows[query[0]][query[1] - query[0]]);
        }
        return answer;
    }
};
