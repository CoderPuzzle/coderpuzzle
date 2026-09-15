class Solution {

    public long countValidSubarrays(int[] nums, int x) {
        int n = nums.length;
        long[] prefix = new long[n + 1];
        for (int i = 0; i < n; i++) prefix[i + 1] = prefix[i] + nums[i];

        long answer = 0;
        // Window p covers sums whose first digit is x: [x*10^p, (x+1)*10^p-1].
        long scale = 1;
        for (int w = 0; w < 16; w++) {
            long lo = x * scale;
            long hi = (x + 1) * scale - 1;
            scale *= 10;
            if (lo > prefix[n]) break;
            int left = 0;
            int entered = 0; // prefix indices [left, entered) are inside the window
            int[] residue = new int[10];
            for (int j = 1; j <= n; j++) {
                long floor = prefix[j] - hi;
                long ceiling = prefix[j] - lo;
                while (entered < j && prefix[entered] <= ceiling) {
                    residue[(int) (prefix[entered] % 10)]++;
                    entered++;
                }
                while (prefix[left] < floor) {
                    residue[(int) (prefix[left] % 10)]--;
                    left++;
                }
                answer += residue[(int) ((((prefix[j] - x) % 10) + 10) % 10)];
            }
        }
        return answer;
    }
}
