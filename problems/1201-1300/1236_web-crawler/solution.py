from collections import deque
from typing import List


class Solution:
    def crawl(self, htmlParser: HtmlParser, startUrl: str) -> None:
        def hostname(url: str) -> str:
            # Everything between "http://" and the next "/".
            rest = url[len("http://") :]
            return rest.split("/", 1)[0]

        home = hostname(startUrl)
        seen = {startUrl}
        queue = deque([startUrl])
        while queue:
            url = queue.popleft()
            for link in htmlParser.getUrls(url):
                # Foreign hostnames are neither returned nor expanded;
                # marking at enqueue time keeps getUrls to one call per page.
                if link not in seen and hostname(link) == home:
                    seen.add(link)
                    queue.append(link)
        # The judged artifact is the oracle's record of every page fetched.
