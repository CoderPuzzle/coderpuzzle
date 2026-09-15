class Solution {

    public int countCompleteSubstrings(String word, int k) {
        int n = word.length();
        int[] vals = new int[n];
        for (int i = 0; i < n; i++) {
            vals[i] = word.charAt(i) - 'a';
        }
        int total = 0;
        int start = 0;
        while (start < n) {
            int end = start + 1;
            while (end < n && Math.abs(vals[end] - vals[end - 1]) <= 2) {
                end++;
            }
            int segLen = end - start;
            for (int m = 1; m <= 26; m++) {
                int len = m * k;
                if (len > segLen) {
                    break;
                }
                int[] cnt = new int[26];
                int bad = 0;
                for (int i = start; i < start + len; i++) {
                    int old = cnt[vals[i]];
                    if (old + 1 == k) {
                        if (old != 0) {
                            bad--;
                        }
                    } else if (old == 0 || old == k) {
                        bad++;
                    }
                    cnt[vals[i]] = old + 1;
                }
                if (bad == 0) {
                    total++;
                }
                int left = start;
                for (int right = start + len; right < end; right++) {
                    int old = cnt[vals[right]];
                    if (old + 1 == k) {
                        if (old != 0) {
                            bad--;
                        }
                    } else if (old == 0 || old == k) {
                        bad++;
                    }
                    cnt[vals[right]] = old + 1;
                    old = cnt[vals[left]];
                    int newCnt = old - 1;
                    cnt[vals[left]] = newCnt;
                    if (newCnt == k) {
                        bad--;
                    } else if (newCnt == 0) {
                        if (k > 1) {
                            bad--;
                        }
                    } else if (newCnt + 1 == k) {
                        bad++;
                    }
                    left++;
                    if (bad == 0) {
                        total++;
                    }
                }
            }
            start = end;
        }
        return total;
    }
}
