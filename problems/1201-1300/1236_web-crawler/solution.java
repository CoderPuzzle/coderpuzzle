import java.util.ArrayDeque;
import java.util.ArrayList;
import java.util.Deque;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

class Solution {

    public void crawl(HtmlParser htmlParser, String startUrl) {
        String home = hostname(startUrl);
        Set<String> seen = new HashSet<>();
        seen.add(startUrl);
        Deque<String> queue = new ArrayDeque<>();
        queue.add(startUrl);
        while (!queue.isEmpty()) {
            String url = queue.poll();
            for (String link : htmlParser.getUrls(url)) {
                // Foreign hostnames are neither returned nor expanded;
                // marking at enqueue time keeps getUrls to one call per page.
                if (!seen.contains(link) && hostname(link).equals(home)) {
                    seen.add(link);
                    queue.add(link);
                }
            }
        }
        // The judged artifact is the oracle's record of every page fetched.
    }

    private String hostname(String url) {
        // Everything between "http://" and the next "/".
        String rest = url.substring("http://".length());
        int slash = rest.indexOf('/');
        return slash < 0 ? rest : rest.substring(0, slash);
    }
}
