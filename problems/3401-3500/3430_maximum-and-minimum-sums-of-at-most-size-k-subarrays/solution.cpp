class Solution {
  public:
    long long minMaxSubarraySum(vector<int> &nums, int k) {
        struct Helper {
            // Number of (a, b) with 0<=a<=A, 0<=b<=B, a+b<=K.
            static long long countPairs(long long A, long long B, long long K) {
                if (K < 0 || A < 0 || B < 0)
                    return 0;
                A = min(A, K);
                B = min(B, K);
                if (A + B <= K)
                    return (A + 1) * (B + 1);
                long long t = K - B;
                long long total = 0;
                if (t >= 0) {
                    total += (min(A, t) + 1) * (B + 1);
                }
                long long lo = max(0LL, t + 1);
                if (lo <= A) {
                    long long m = A - lo + 1;
                    total += m * (K + 1) - (lo + A) * m / 2;
                }
                return total;
            }
        };

        int n = (int)nums.size();
        long long K = k - 1;

        vector<long long> Lmax(n), Rmax(n), Lmin(n), Rmin(n);
        vector<int> stack(n);
        int sp = 0;
        for (int i = 0; i < n; i++) {
            while (sp > 0 && nums[stack[sp - 1]] <= nums[i])
                sp--;
            Lmax[i] = sp > 0 ? i - stack[sp - 1] - 1 : i;
            stack[sp++] = i;
        }
        sp = 0;
        for (int i = n - 1; i >= 0; i--) {
            while (sp > 0 && nums[stack[sp - 1]] < nums[i])
                sp--;
            Rmax[i] = sp > 0 ? stack[sp - 1] - i - 1 : n - 1 - i;
            stack[sp++] = i;
        }
        sp = 0;
        for (int i = 0; i < n; i++) {
            while (sp > 0 && nums[stack[sp - 1]] >= nums[i])
                sp--;
            Lmin[i] = sp > 0 ? i - stack[sp - 1] - 1 : i;
            stack[sp++] = i;
        }
        sp = 0;
        for (int i = n - 1; i >= 0; i--) {
            while (sp > 0 && nums[stack[sp - 1]] > nums[i])
                sp--;
            Rmin[i] = sp > 0 ? stack[sp - 1] - i - 1 : n - 1 - i;
            stack[sp++] = i;
        }

        long long answer = 0;
        for (int i = 0; i < n; i++) {
            long long cnt = Helper::countPairs(Lmax[i], Rmax[i], K) + Helper::countPairs(Lmin[i], Rmin[i], K);
            answer += (long long)nums[i] * cnt;
        }
        return answer;
    }
};
