import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeSet;

/** The page-link API (problem-provided oracle).
 *
 * Ships with the problem, compiled with every submission by the judge,
 * never editable in the editor: getUrls(url) returns the outgoing links
 * of that page in the hidden web graph. Solvers see only the public API
 * documented in the starter. Solutions may crawl with real threads, so
 * every method is safe to call concurrently. */
public class HtmlParser {

    private final Map<String, List<String>> links = new HashMap<>();
    // getUrls runs on whatever worker thread the crawler spawned; the
    // fetch record must take concurrent adds without losing pages.
    private final java.util.Set<String> fetched =
            java.util.Collections.synchronizedSet(new TreeSet<>());
    private long budget;

    @SuppressWarnings("unchecked")
    public HtmlParser(List<Object> urls, List<Object> edges, long budget) {
        List<String> names = new ArrayList<>(urls.size());
        for (Object url : urls) names.add((String) url);
        for (int i = 0; i < names.size(); ++i) links.put(names.get(i), new ArrayList<>());
        for (Object edge : edges) {
            List<Object> pair = (List<Object>) edge;
            int source = ((Number) pair.get(0)).intValue();
            int target = ((Number) pair.get(1)).intValue();
            links.get(names.get(source)).add(names.get(target));
        }
        this.budget = budget;
    }

    public List<String> getUrls(String url) {
        if (budget <= 0) {
            throw new IllegalStateException("HtmlParser query budget exhausted");
        }
        budget -= 1;
        fetched.add(url);
        List<String> out = links.get(url);
        return out == null ? new ArrayList<>() : new ArrayList<>(out);
    }

    /** The crawl's observable effect: every page the crawler fetched. */
    public java.util.List<String> verdict() {
        // The contract requires holding the set's monitor while iterating;
        // by the time verdict() runs, every worker has joined.
        synchronized (fetched) {
            return new ArrayList<>(fetched);
        }
    }
}
