class Solution {

    public String discountPrices(String sentence, int discount) {
        // A word is a price exactly when '$' leads a run of digits only.
        // Whole-dollar prices make price * (100 - discount) the discounted value
        // in exact cents, so integer arithmetic renders the two decimals without
        // ever touching binary floats.
        String[] words = sentence.split(" ");
        StringBuilder result = new StringBuilder();
        for (int index = 0; index < words.length; index++) {
            String word = words[index];
            boolean price = word.length() > 1 && word.charAt(0) == '$';
            for (int position = 1; price && position < word.length(); position++) {
                if (!Character.isDigit(word.charAt(position))) price = false;
            }
            if (index > 0) {
                result.append(' ');
            }
            if (price) {
                long cents = Long.parseLong(word.substring(1)) * (100L - discount);
                result.append(String.format("$%d.%02d", cents / 100, cents % 100));
            } else {
                result.append(word);
            }
        }
        return result.toString();
    }
}
