class Solution {

    public String convertDateToBinary(String date) {
        // The calendar pads month and day to two digits, but the binary form
        // drops that padding: each dash-separated component is parsed as its
        // plain decimal value and rendered in base 2 with no leading zeroes,
        // then the pieces are rejoined with dashes in year-month-day order.
        // Integer.toBinaryString already omits leading zeroes.
        String[] parts = date.split("-");
        StringBuilder result = new StringBuilder();
        for (int i = 0; i < parts.length; ++i) {
            if (i > 0) {
                result.append('-');
            }
            result.append(Integer.toBinaryString(Integer.parseInt(parts[i])));
        }
        return result.toString();
    }
}
