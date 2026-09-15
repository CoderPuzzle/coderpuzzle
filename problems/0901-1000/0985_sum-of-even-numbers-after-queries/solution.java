class Solution {

    // Every query rewrites exactly one element, so the even sum can only
    // change through that element: carry it as a running total — subtract
    // the old value when it is even, apply the addition, add the new value
    // when it is even — and record the total once per query.
    public int[] sumEvenAfterQueries(int[] nums, int[][] queries) {
        int running = 0;
        for (int value : nums) {
            if (value % 2 == 0) {
                running += value;
            }
        }
        int[] answer = new int[queries.length];
        for (int queryIndex = 0; queryIndex < queries.length; ++queryIndex) {
            int val = queries[queryIndex][0];
            int index = queries[queryIndex][1];
            int old = nums[index];
            // the old value leaves the total before the addition lands, so a
            // value that flips parity is never counted on both sides
            if (old % 2 == 0) {
                running -= old;
            }
            int updated = old + val;
            nums[index] = updated;
            // % 2 == 0 is the sign-safe evenness test: -2 passes it whatever
            // remainder -3 % 2 yields
            if (updated % 2 == 0) {
                running += updated;
            }
            answer[queryIndex] = running;
        }
        return answer;
    }
}
