class Solution {

    public int[] powerUpdate(int[] nums, int p, int[][] queries) {
        int[] values = new int[nums.length + queries.length];
        int used = 0;
        for (int value : nums) values[used++] = value;
        for (int[] query : queries) values[used++] = query[0];
        java.util.Arrays.sort(values);
        int unique = 0;
        for (int value : values) {
            if (unique == 0 || values[unique - 1] != value) values[unique++] = value;
        }
        int[] tree = new int[unique + 1];
        for (int value : nums) add(tree, java.util.Arrays.binarySearch(values, 0, unique, value) + 1);
        int[] answer = new int[queries.length];
        int size = nums.length;
        for (int i = 0; i < queries.length; i++) {
            int value = queries[i][0];
            add(tree, java.util.Arrays.binarySearch(values, 0, unique, value) + 1);
            size++;
            int rank = size - queries[i][1] + 1;
            int exponent = values[kth(tree, rank) - 1];
            p = modPow(p, exponent);
            answer[i] = p;
        }
        return answer;
    }

    private void add(int[] tree, int index) {
        while (index < tree.length) {
            tree[index]++;
            index += index & -index;
        }
    }

    private int kth(int[] tree, int rank) {
        int index = 0;
        for (int step = Integer.highestOneBit(tree.length - 1); step != 0; step >>= 1) {
            int next = index + step;
            if (next < tree.length && tree[next] < rank) {
                index = next;
                rank -= tree[next];
            }
        }
        return index + 1;
    }

    private int modPow(long base, int exponent) {
        long result = 1;
        long modulus = 1_000_000_007L;
        while (exponent > 0) {
            if ((exponent & 1) != 0) result = (result * base) % modulus;
            base = (base * base) % modulus;
            exponent >>= 1;
        }
        return (int) result;
    }
}
