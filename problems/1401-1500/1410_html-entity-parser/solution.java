import java.util.HashMap;
import java.util.Map;

class Solution {

    public String entityParser(String text) {
        Map<String, String> entities = new HashMap<>();
        entities.put("&quot;", "\"");
        entities.put("&apos;", "'");
        entities.put("&amp;", "&");
        entities.put("&gt;", ">");
        entities.put("&lt;", "<");
        entities.put("&frasl;", "/");
        StringBuilder result = new StringBuilder();
        int i = 0;
        int n = text.length();
        while (i < n) {
            if (text.charAt(i) == '&') {
                boolean matched = false;
                for (Map.Entry<String, String> entry : entities.entrySet()) {
                    String entity = entry.getKey();
                    if (text.startsWith(entity, i)) {
                        result.append(entry.getValue());
                        i += entity.length();
                        matched = true;
                        break;
                    }
                }
                if (!matched) {
                    result.append(text.charAt(i));
                    i++;
                }
            } else {
                result.append(text.charAt(i));
                i++;
            }
        }
        return result.toString();
    }
}
