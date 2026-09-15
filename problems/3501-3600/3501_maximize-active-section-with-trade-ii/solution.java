import java.util.ArrayList;
import java.util.List;

class Solution {

    public int[] maxActiveSectionsAfterTrade(String s, int[][] queries) {
        int length = s.length();
        int ones = 0;
        // Maximal runs of '0's, as parallel start/length arrays; the optimal
        // trade zeroes the '1' run between two zero runs and flips the merge.
        List<Integer> startList = new ArrayList<>();
        List<Integer> lenList = new ArrayList<>();
        int index = 0;
        while (index < length) {
            if (s.charAt(index) == '0') {
                int runStart = index;
                while (index < length && s.charAt(index) == '0') {
                    index++;
                }
                startList.add(runStart);
                lenList.add(index - runStart);
            } else {
                ones++;
                index++;
            }
        }
        int groups = startList.size();
        int[] starts = new int[groups];
        int[] lens = new int[groups];
        int[] ends = new int[groups];
        for (int k = 0; k < groups; ++k) {
            starts[k] = startList.get(k);
            lens[k] = lenList.get(k);
            ends[k] = starts[k] + lens[k] - 1;
        }

        // Sparse table for range maximum over adjacent sums lens[k]+lens[k+1].
        int size = groups - 1;
        int levels = 0;
        if (size >= 1) {
            levels = Integer.numberOfTrailingZeros(Integer.highestOneBit(size)) + 1;
        }
        int[][] table = new int[levels][];
        int[] logs = new int[size + 1];
        if (size >= 1) {
            table[0] = new int[size];
            for (int k = 0; k < size; ++k) {
                table[0][k] = lens[k] + lens[k + 1];
            }
            for (int level = 1; level < levels; ++level) {
                int step = 1 << (level - 1);
                table[level] = new int[size - (1 << level) + 1];
                for (int q = 0; q < table[level].length; ++q) {
                    table[level][q] = Math.max(table[level - 1][q], table[level - 1][q + step]);
                }
            }
            for (int q = 2; q <= size; ++q) {
                logs[q] = logs[q / 2] + 1;
            }
        }

        int[] answer = new int[queries.length];
        for (int q = 0; q < queries.length; ++q) {
            int left = queries[q][0];
            int right = queries[q][1];
            int gain = 0;
            if (groups >= 2) {
                // Zero runs clipped by the window edges only shrink the two
                // boundary pairs; every fully interior pair is exact.
                int first = lowerBound(ends, left);
                int last = upperBound(starts, right) - 2;
                if (first <= last) {
                    int clipLeft = Math.min(lens[first], ends[first] - left + 1);
                    int clipRight = Math.min(lens[last + 1], right - starts[last + 1] + 1);
                    int pairFirst;
                    int pairLast;
                    if (first == last) {
                        pairFirst = clipLeft + clipRight;
                        pairLast = pairFirst;
                    } else {
                        pairFirst = clipLeft + lens[first + 1];
                        pairLast = lens[last] + clipRight;
                    }
                    int innerLo = first + (s.charAt(left) == '0' ? 1 : 0);
                    int innerHi = last - (s.charAt(right) == '0' ? 1 : 0);
                    int inner = 0;
                    if (innerLo <= innerHi) {
                        int level = logs[innerHi - innerLo + 1];
                        inner = Math.max(table[level][innerLo], table[level][innerHi - (1 << level) + 1]);
                    }
                    gain = Math.max(pairFirst, Math.max(pairLast, inner));
                }
            }
            answer[q] = ones + gain;
        }
        return answer;
    }

    private int lowerBound(int[] values, int target) {
        int low = 0;
        int high = values.length;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (values[mid] < target) low = mid + 1;
            else high = mid;
        }
        return low;
    }

    private int upperBound(int[] values, int target) {
        int low = 0;
        int high = values.length;
        while (low < high) {
            int mid = (low + high) >>> 1;
            if (values[mid] <= target) low = mid + 1;
            else high = mid;
        }
        return low;
    }
}
