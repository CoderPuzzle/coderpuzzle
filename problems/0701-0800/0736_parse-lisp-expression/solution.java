import java.util.*;

class Solution {

    private String[] tokens;

    public int evaluate(String expression) {
        List<String> list = new ArrayList<>();
        for (String tok : expression.replace("(", " ( ").replace(")", " ) ").trim().split("\\s+")) {
            list.add(tok);
        }
        tokens = list.toArray(new String[0]);
        int[] res = parse(0, new HashMap<String, Integer>());
        return res[0];
    }

    private boolean isVar(String t) {
        char c = t.charAt(0);
        return c >= 'a' && c <= 'z';
    }

    // A token at position i starts the final expression of a let iff it is
    // "(...", a literal, or a variable immediately followed by ")".
    private boolean exprStart(int i) {
        String t = tokens[i];
        if (t.equals("(") || !isVar(t)) return true;
        return tokens[i + 1].equals(")");
    }

    private int[] parse(int i, Map<String, Integer> env) {
        String token = tokens[i];
        if (!token.equals("(")) {
            if (isVar(token)) return new int[] { env.get(token), i + 1 };
            return new int[] { Integer.parseInt(token), i + 1 };
        }
        String op = tokens[i + 1];
        i += 2;
        if (op.equals("add") || op.equals("mult")) {
            int[] a = parse(i, env);
            int[] b = parse(a[1], env);
            return new int[] { op.equals("add") ? a[0] + b[0] : a[0] * b[0], b[1] + 1 };
        }
        // let
        Map<String, Integer> local = new HashMap<>(env);
        int value = 0;
        while (!tokens[i].equals(")")) {
            if (exprStart(i)) {
                int[] r = parse(i, local);
                value = r[0];
                i = r[1];
            } else {
                String var = tokens[i];
                int[] r = parse(i + 1, local);
                value = r[0];
                i = r[1];
                local.put(var, value);
            }
        }
        return new int[] { value, i + 1 };
    }
}
