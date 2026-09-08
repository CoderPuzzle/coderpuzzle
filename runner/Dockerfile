ARG NODE_VERSION="22.23.2"
ARG PYTHON_VERSION="3.14.7"
ARG TYPESCRIPT_VERSION="5.7.3"

FROM node:${NODE_VERSION}-bookworm-slim AS typescript-toolchain

ARG TYPESCRIPT_VERSION
# Pinned to the same versions as coderpuzzle-problems/package.json, so a starter
# formatted in the editor is byte-identical to the one the generator writes.
ARG PRETTIER_VERSION="3.9.6"
ARG PRETTIER_JAVA_VERSION="2.10.3"
ARG SQL_FORMATTER_VERSION="15.8.2"
RUN npm install --global --ignore-scripts --no-audit --no-fund \
    typescript@"${TYPESCRIPT_VERSION}" \
    prettier@"${PRETTIER_VERSION}" \
    prettier-plugin-java@"${PRETTIER_JAVA_VERSION}" \
    sql-formatter@"${SQL_FORMATTER_VERSION}"

FROM python:${PYTHON_VERSION}-slim

ARG RUFF_VERSION="0.16.3"

# The editor's Format button runs prettier and its java plugin out of the
# global install; node only finds them there with NODE_PATH set.
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    NODE_PATH=/usr/local/lib/node_modules

WORKDIR /runner
RUN apt-get update \
    && apt-get install -y --no-install-recommends \
        g++ \
        g++-14 \
        golang-go \
        golang-1.24-go \
        golang-1.24-src \
        libcap2-bin \
        openjdk-21-jdk-headless \
        rustc \
        rustfmt \
        clang-format \
        shfmt \
        gawk \
    && rm -rf /var/lib/apt/lists/*
RUN pip install --no-cache-dir ruff=="${RUFF_VERSION}"
COPY --from=typescript-toolchain /usr/local/bin/node /usr/local/bin/node
COPY --from=typescript-toolchain \
    /usr/local/lib/node_modules/typescript \
    /usr/local/lib/node_modules/typescript
COPY --from=typescript-toolchain \
    /usr/local/lib/node_modules/prettier \
    /usr/local/lib/node_modules/prettier
COPY --from=typescript-toolchain \
    /usr/local/lib/node_modules/prettier-plugin-java \
    /usr/local/lib/node_modules/prettier-plugin-java
COPY --from=typescript-toolchain \
    /usr/local/lib/node_modules/sql-formatter \
    /usr/local/lib/node_modules/sql-formatter
RUN ln -s /usr/local/lib/node_modules/typescript/bin/tsc /usr/local/bin/tsc \
    && ln -s /usr/local/lib/node_modules/prettier/bin/prettier.cjs /usr/local/bin/prettier
COPY worker.py python_harness.py sql_harness.py shell_harness.py leetcode_codecs.py protocol.py privileges.py formatters.py ./
COPY cli.py ./
RUN printf '#!/bin/sh\nexec python3 /runner/cli.py "$@"\n' > /usr/local/bin/openoj && chmod +x /usr/local/bin/openoj
COPY compiler_sandbox.py runtime_sandbox.py ./
COPY executors ./executors
COPY java ./java
COPY benchmarks ./benchmark-sources
RUN mkdir -p /runner/java-classes /runner/benchmarks \
    && javac \
        -proc:none \
        -encoding UTF-8 \
        -g:none \
        -d /runner/java-classes \
        /runner/java/OpenOJJavaHarness.java \
        && \
    g++ -std=c++20 -O2 \
        -o /runner/benchmarks/cpp /runner/benchmark-sources/benchmark.cpp \
    && go build -trimpath \
        -o /runner/benchmarks/go /runner/benchmark-sources/benchmark.go \
    && rustc --edition=2021 -C opt-level=2 -C debuginfo=0 \
        -o /runner/benchmarks/rust /runner/benchmark-sources/benchmark.rs \
    && cp /runner/benchmark-sources/typescript.js \
        /runner/benchmarks/typescript.js \
    && cp /runner/benchmark-sources/javascript.js \
        /runner/benchmarks/javascript.js \
    && rm -rf /runner/benchmark-sources /root/.cache/go-build
RUN groupadd --gid 10001 openoj \
    && useradd --uid 10000 --gid openoj --no-create-home openoj-runner \
    && cp /usr/local/bin/python3.14 /usr/local/bin/openoj-supervisor-python \
    && setcap cap_chown,cap_dac_override,cap_kill,cap_setuid,cap_setgid=ep \
        /usr/local/bin/openoj-supervisor-python \
    && mkdir -p /queue \
    && chown openoj-runner:openoj /queue \
    && chmod 0770 /queue \
    && chmod -R 0555 /runner

# The supervisor is unprivileged but retains five explicit container
# capabilities so it can manage and remove scratch space, drop children to
# UID/GID 65534, and terminate processes hostile submissions leave behind.
USER 10000:10001
CMD ["openoj-supervisor-python", "-I", "-S", "/runner/worker.py"]
