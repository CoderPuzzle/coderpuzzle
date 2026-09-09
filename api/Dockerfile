ARG PYTHON_VERSION="3.14.7"

FROM python:${PYTHON_VERSION}-slim

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt
COPY app ./app

# git fetches remote problem sets (CODERPUZZLE_PROBLEMS=owner/name or a git URL)
RUN apt-get update \
    && apt-get install -y --no-install-recommends git \
    && rm -rf /var/lib/apt/lists/*

RUN groupadd --gid 10001 coderpuzzle \
    && useradd --uid 10001 --gid coderpuzzle --no-create-home coderpuzzle \
    && mkdir -p /data /queue /cache/problems \
    && chown -R coderpuzzle:coderpuzzle /data /queue /cache /app \
    && chmod 0700 /data \
    && chmod 0770 /queue

USER 10001:10001
EXPOSE 8000
# --proxy-headers: honor the X-Forwarded-For/Proto headers the frontend
# nginx sets (real client IP, edge scheme) so login throttling keys on the
# caller and session cookies get their Secure flag. Trusting them is safe
# in this topology: the API sits on the compose-internal network whose only
# other member is that nginx, so nothing can reach it without the headers
# passing through nginx first.
CMD ["uvicorn", "app.main:app", "--host", "0.0.0.0", "--port", "8000", "--no-access-log", "--proxy-headers", "--forwarded-allow-ips", "*"]
