class Solution {

    public int[] decimalRepresentation(int n) {
        // Each nonzero digit contributes exactly one base-10 component --
        // its digit times the place it sits at -- and this count is optimal:
        // adding terms can only merge nonzero positions, never create them.
        int[] temp = new int[10];
        int count = 0;
        // The place walks one step past 10^9 on the final multiply, so it
        // needs more headroom than int provides.
        long place = 1;
        while (n > 0) {
            int digit = n % 10;
            if (digit > 0) {
                temp[count++] = (int) (digit * place);
            }
            n /= 10;
            place *= 10;
        }
        // Peeled from the ones place up, so fill the answer back to front.
        int[] components = new int[count];
        for (int i = 0; i < count; i++) {
            components[i] = temp[count - 1 - i];
        }
        return components;
    }
}
