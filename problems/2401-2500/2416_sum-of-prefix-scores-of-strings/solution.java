class Solution {

    public int[] sumPrefixScores(String[] words) {
        class Node {

            java.util.HashMap<Character, Node> next = new java.util.HashMap<>();
            int cnt = 0;
        }
        // one shared trie: node.cnt equals the score of the prefix it ends
        Node root = new Node();
        for (String word : words) {
            Node node = root;
            for (int i = 0; i < word.length(); i++) {
                char ch = word.charAt(i);
                Node nxt = node.next.get(ch);
                if (nxt == null) {
                    nxt = new Node();
                    node.next.put(ch, nxt);
                }
                node = nxt;
                // count at every depth: the word itself scores its own prefixes
                node.cnt++;
            }
        }
        // second pass: a word's answer is the sum of cnt along its trie path
        int[] scores = new int[words.length];
        for (int w = 0; w < words.length; w++) {
            String word = words[w];
            Node node = root;
            int total = 0;
            for (int i = 0; i < word.length(); i++) {
                node = node.next.get(word.charAt(i));
                // cnt of the reached node is the score of the prefix so far
                total += node.cnt;
            }
            scores[w] = total;
        }
        return scores;
    }
}
