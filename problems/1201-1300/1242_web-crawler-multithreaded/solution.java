import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;
import java.util.concurrent.BlockingQueue;
import java.util.concurrent.LinkedBlockingQueue;

class Solution {

    public void crawl(HtmlParser htmlParser, String startUrl) {
        // A pool of workers shares one claim table; outstanding counts URLs
        // enqueued but not yet fetched, and hitting zero ends the pool.
        final int workers = 8;
        final String home = hostname(startUrl);
        final BlockingQueue<String> work = new LinkedBlockingQueue<>();
        final String poison = new String("poison");
        work.add(startUrl);

        Thread[] pool = new Thread[workers];
        final Set<String> claimed = new HashSet<>();
        claimed.add(startUrl);
        final int[] outstanding = { 1 };
        for (int i = 0; i < workers; ++i) {
            pool[i] = new Thread(() -> {
                while (true) {
                    String url;
                    try {
                        url = work.take();
                    } catch (InterruptedException interrupted) {
                        return;
                    }
                    if (url == poison) return;
                    List<String> links = htmlParser.getUrls(url);
                    List<String> fresh = new ArrayList<>();
                    synchronized (claimed) {
                        for (String link : links) {
                            // Foreign hostnames are neither claimed nor fetched.
                            if (hostname(link).equals(home) && claimed.add(link)) {
                                fresh.add(link);
                            }
                        }
                        outstanding[0] += fresh.size() - 1;
                        fresh.forEach(work::add);
                        if (outstanding[0] == 0) {
                            // Every discovered page has been fetched.
                            for (int k = 0; k < workers; ++k) work.add(poison);
                        }
                    }
                }
            });
            pool[i].start();
        }
        for (Thread thread : pool) {
            try {
                thread.join();
            } catch (InterruptedException interrupted) {
                Thread.currentThread().interrupt();
                return;
            }
        }
        // The judged artifact is the parser's record of every page fetched.
    }

    private String hostname(String url) {
        // Everything between "http://" and the next "/".
        String rest = url.substring("http://".length());
        int slash = rest.indexOf('/');
        return slash < 0 ? rest : rest.substring(0, slash);
    }
}
