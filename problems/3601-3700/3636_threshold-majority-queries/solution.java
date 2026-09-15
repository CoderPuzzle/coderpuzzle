import java.util.Arrays;

class Solution {

    private int isqrt(int q) {
        int s = (int) Math.sqrt(q);
        while ((long) (s + 1) * (s + 1) <= q) {
            s++;
        }
        while ((long) s * s > q) {
            s--;
        }
        return s;
    }

    private int lowerBound(int[] list, int from, int to, int target) {
        while (from < to) {
            int mid = (from + to) >>> 1;
            if (list[mid] < target) {
                from = mid + 1;
            } else {
                to = mid;
            }
        }
        return from;
    }

    public int[] subarrayMajority(int[] nums, int[][] queries) {
        int n = nums.length;
        // Rank-compress: "smallest value" becomes "smallest rank".
        int[] values = Arrays.copyOf(nums, n);
        Arrays.sort(values);
        int m = 0;
        for (int i = 0; i < n; i++) {
            if (i == 0 || values[i] != values[i - 1]) {
                values[m++] = values[i];
            }
        }
        int[] a = new int[n];
        for (int i = 0; i < n; i++) {
            a[i] = lowerBound(values, 0, m, nums[i]);
        }
        // occ[x] lists the sorted positions of rank x, so any range frequency
        // is two binary searches.
        int[] counts = new int[m],
            fill = new int[m];
        for (int x : a) {
            counts[x]++;
        }
        int[][] occ = new int[m][];
        for (int x = 0; x < m; x++) {
            occ[x] = new int[counts[x]];
        }
        for (int pos = 0; pos < n; pos++) {
            occ[a[pos]][fill[a[pos]]++] = pos;
        }

        // Block size balancing the block-pair sweep against query fringes.
        int b = Math.max(1, n / isqrt(queries.length));
        int k = (n + b - 1) / b;
        // topF[i*k+j] / topV[i*k+j]: highest frequency inside blocks i..j and
        // the smallest rank attaining it. One sweep per left block grows the
        // window additions-only, so counts never decrease and the mode pair
        // stays O(1) per element.
        int[] topF = new int[k * k],
            topV = new int[k * k],
            cnt = new int[m];
        for (int i = 0; i < k; i++) {
            Arrays.fill(cnt, 0);
            int mf = 0,
                mv = 0,
                pos = i * b;
            for (int j = i; j < k; j++) {
                int end = Math.min((j + 1) * b, n);
                for (; pos < end; pos++) {
                    int c = ++cnt[a[pos]];
                    if (c > mf) {
                        mf = c;
                        mv = a[pos];
                    } else if (c == mf && a[pos] < mv) {
                        mv = a[pos];
                    }
                }
                topF[i * k + j] = mf;
                topV[i * k + j] = mv;
            }
        }

        // The overall top element clears any threshold exactly when something
        // does, so every answer is that element's pair checked once.
        int[] stamp = new int[m],
            freq = new int[m],
            seen = new int[2 * b + 2];
        int[] out = new int[queries.length];
        int token = 0;
        for (int qi = 0; qi < queries.length; qi++) {
            int l = queries[qi][0],
                r = queries[qi][1],
                t = queries[qi][2];
            int bl = l / b,
                br = r / b;
            token++;
            int bf, bv;
            if (br - bl <= 1) {
                // Range spans at most two blocks: count it directly.
                bf = 0;
                bv = 0;
                for (int pos = l; pos <= r; pos++) {
                    int x = a[pos];
                    if (stamp[x] != token) {
                        stamp[x] = token;
                        freq[x] = 1;
                    } else {
                        freq[x]++;
                    }
                    int c = freq[x];
                    if (c > bf) {
                        bf = c;
                        bv = x;
                    } else if (c == bf && x < bv) {
                        bv = x;
                    }
                }
            } else {
                // Whole blocks give the base candidate; every distinct fringe
                // rank gets its exact range frequency from two binary searches
                // (its total count also spans the middle blocks, so fringe
                // counts alone can never prune it).
                int idx = (bl + 1) * k + br - 1;
                bf = topF[idx];
                bv = topV[idx];
                int seenCount = 0;
                for (int pos = l; pos < (bl + 1) * b; pos++) {
                    int x = a[pos];
                    if (stamp[x] != token) {
                        stamp[x] = token;
                        seen[seenCount++] = x;
                    }
                }
                for (int pos = br * b; pos <= r; pos++) {
                    int x = a[pos];
                    if (stamp[x] != token) {
                        stamp[x] = token;
                        seen[seenCount++] = x;
                    }
                }
                for (int si = 0; si < seenCount; si++) {
                    int x = seen[si];
                    int f = upperBound(occ[x], r) - lowerBound(occ[x], 0, occ[x].length, l);
                    if (f > bf || (f == bf && x < bv)) {
                        bf = f;
                        bv = x;
                    }
                }
            }
            out[qi] = bf >= t ? values[bv] : -1;
        }
        return out;
    }

    private int upperBound(int[] list, int target) {
        int lo = 0,
            hi = list.length;
        while (lo < hi) {
            int mid = (lo + hi) >>> 1;
            if (list[mid] <= target) {
                lo = mid + 1;
            } else {
                hi = mid;
            }
        }
        return lo;
    }
}
