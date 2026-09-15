class Solution {
  public:
    vector<int> sumEvenAfterQueries(vector<int> &nums, vector<vector<int>> &queries) {
        // Every query rewrites exactly one element, so the even sum can only
        // change through that element: carry it as a running total — subtract
        // the old value when it is even, apply the addition, add the new value
        // when it is even — and record the total once per query.
        int running = 0;
        for (int value : nums) {
            if (value % 2 == 0) {
                running += value;
            }
        }
        vector<int> answer;
        answer.reserve(queries.size());
        for (const auto &query : queries) {
            int index = query[1];
            int old = nums[index];
            // the old value leaves the total before the addition lands, so a
            // value that flips parity is never counted on both sides
            if (old % 2 == 0) {
                running -= old;
            }
            int updated = old + query[0];
            nums[index] = updated;
            // % 2 == 0 is the sign-safe evenness test: -2 passes it whatever
            // remainder -3 % 2 yields
            if (updated % 2 == 0) {
                running += updated;
            }
            answer.push_back(running);
        }
        return answer;
    }
};
