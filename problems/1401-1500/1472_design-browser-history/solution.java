import java.util.ArrayList;
import java.util.List;

class BrowserHistory {

    private final List<String> history;
    private int cur;

    public BrowserHistory(String homepage) {
        history = new ArrayList<>();
        history.add(homepage);
        cur = 0;
    }

    public void visit(String url) {
        while (history.size() > cur + 1) {
            history.remove(history.size() - 1);
        }
        history.add(url);
        cur++;
    }

    public String back(int steps) {
        cur = Math.max(0, cur - steps);
        return history.get(cur);
    }

    public String forward(int steps) {
        cur = Math.min(history.size() - 1, cur + steps);
        return history.get(cur);
    }
}
