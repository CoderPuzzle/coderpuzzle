class Solution {

    private static class Fenwick {

        private final int n;
        private final int[] bit;

        Fenwick(int n) {
            this.n = n;
            this.bit = new int[n + 1];
        }

        void add(int i, int delta) {
            i += 1;
            while (i <= n) {
                bit[i] += delta;
                i += i & -i;
            }
        }

        int prefix(int i) {
            i += 1;
            int total = 0;
            while (i > 0) {
                total += bit[i];
                i -= i & -i;
            }
            return total;
        }

        int rangeSum(int l, int r) {
            if (l > r) {
                return 0;
            }
            return prefix(r) - prefix(l - 1);
        }
    }

    public int[] countOfPeaks(int[] nums, int[][] queries) {
        int n = nums.length;
        Fenwick fen = new Fenwick(n);
        for (int i = 0; i < n; i++) {
            if (isPeak(nums, i, n)) {
                fen.add(i, 1);
            }
        }

        java.util.ArrayList<Integer> resultList = new java.util.ArrayList<>();
        for (int[] q : queries) {
            if (q[0] == 1) {
                int l = q[1],
                    r = q[2];
                resultList.add(r - l < 2 ? 0 : fen.rangeSum(l + 1, r - 1));
            } else {
                int idx = q[1],
                    val = q[2];
                for (int j = idx - 1; j <= idx + 1; j++) {
                    if (j >= 0 && j < n && isPeak(nums, j, n)) {
                        fen.add(j, -1);
                    }
                }
                nums[idx] = val;
                for (int j = idx - 1; j <= idx + 1; j++) {
                    if (j >= 0 && j < n && isPeak(nums, j, n)) {
                        fen.add(j, 1);
                    }
                }
            }
        }
        int[] answer = new int[resultList.size()];
        for (int i = 0; i < answer.length; i++) {
            answer[i] = resultList.get(i);
        }
        return answer;
    }

    private static boolean isPeak(int[] nums, int i, int n) {
        return i > 0 && i < n - 1 && nums[i] > nums[i - 1] && nums[i] > nums[i + 1];
    }
}
