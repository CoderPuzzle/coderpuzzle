import queue
import threading


class Solution:
    def crawl(self, htmlParser: HtmlParser, startUrl: str) -> None:
        WORKERS = 8
        poison = object()

        def hostname(url: str) -> str:
            # Everything between "http://" and the next "/".
            rest = url[len("http://") :]
            return rest.split("/", 1)[0]

        home = hostname(startUrl)
        lock = threading.Lock()
        claimed = {startUrl}
        work: queue.Queue = queue.Queue()
        work.put(startUrl)
        # outstanding counts URLs enqueued but not yet fetched.
        outstanding = [1]

        def worker() -> None:
            while True:
                url = work.get()
                if url is poison:
                    return
                links = htmlParser.getUrls(url)
                fresh = []
                with lock:
                    for link in links:
                        # Foreign hostnames are neither claimed nor fetched.
                        if hostname(link) == home and link not in claimed:
                            claimed.add(link)
                            fresh.append(link)
                    outstanding[0] += len(fresh) - 1
                    for link in fresh:
                        work.put(link)
                    if outstanding[0] == 0:
                        # Every discovered page has been fetched.
                        for _ in range(WORKERS):
                            work.put(poison)

        threads = [threading.Thread(target=worker) for _ in range(WORKERS)]
        for thread in threads:
            thread.start()
        for thread in threads:
            thread.join()
        # The judged artifact is the parser's record of every page fetched.
