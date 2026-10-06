#!/usr/bin/env python3
"""Collect real HTTP judge timings without treating overload errors as passes.

The private manifest contains dedicated test-account credentials and a matrix
of source strings exported from the installed problem bank. Keep it outside
version control. Results contain hashes and timing data, not code or inputs.
"""
from __future__ import annotations

import argparse
import concurrent.futures
import hashlib
import http.cookiejar
import json
import random
import socket
import threading
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path


class Client:
    def __init__(self, base, account, timeout):
        self.base, self.timeout = base, timeout
        self.jar = http.cookiejar.CookieJar()
        self.http = urllib.request.build_opener(
            urllib.request.ProxyHandler({}), urllib.request.HTTPCookieProcessor(self.jar)
        )
        self.call('/session', {})
        self.call('/auth/register', account)
        status, result = self.call('/auth/login', account)
        if status != 200 or result.get('status') != 'logged_in':
            raise RuntimeError(f'Test-account authentication failed: HTTP {status}')

    def call(self, path, body):
        request = urllib.request.Request(
            self.base + path, data=json.dumps(body).encode(),
            headers={'Content-Type': 'application/json'}, method='POST'
        )
        try:
            with self.http.open(request, timeout=self.timeout) as response:
                return response.status, json.load(response)
        except urllib.error.HTTPError as error:
            raw = error.read().decode(errors='replace')
            try:
                return error.code, json.loads(raw)
            except ValueError:
                return error.code, {'detail': raw[:200]}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--manifest', type=Path, required=True)
    parser.add_argument('--output', type=Path, required=True)
    parser.add_argument('--base', default='https://coderpuzzle.dongziyu.com/api')
    parser.add_argument('--connect-ip', help='Connect to this IP with normal TLS hostname verification')
    parser.add_argument('--concurrency', type=int, default=24)
    parser.add_argument('--baseline-rounds', type=int, default=6)
    parser.add_argument('--burst-rounds', type=int, default=12)
    parser.add_argument('--timeout', type=int, default=900)
    parser.add_argument('--phase', choices=['all', 'warmup', 'baseline', 'burst', 'submit'], default='all')
    args = parser.parse_args()
    if args.connect_ip:
        hostname = urllib.parse.urlsplit(args.base).hostname
        lookup = socket.getaddrinfo
        def routed_lookup(host, *pos, **kw):
            return lookup(args.connect_ip if host == hostname else host, *pos, **kw)
        socket.getaddrinfo = routed_lookup
    manifest = json.loads(args.manifest.read_text())
    if len(manifest['accounts']) < args.concurrency:
        parser.error('A separate test account is required for each concurrent client')
    clients = [Client(args.base, account, args.timeout)
               for account in manifest['accounts'][:args.concurrency]]
    args.output.parent.mkdir(parents=True, exist_ok=True)
    lock = threading.Lock()
    rng = random.Random(20260913)
    started = time.monotonic()
    with args.output.open('a', buffering=1) as output:
        def measure(cell, phase, repeat, client):
            start = time.monotonic_ns()
            row = {'phase': phase, 'repeat': repeat, 'slug': cell['slug'],
                   'category': cell['category'], 'language': cell['language'],
                   'source_sha256': hashlib.sha256(cell['code'].encode()).hexdigest(),
                   'start_ns': start, 'endpoint': '/submit' if phase == 'submit' else '/run'}
            try:
                status, result = client.call(row['endpoint'], {
                    key: cell[key] for key in ('slug', 'language', 'code')
                })
                row.update(http_status=status, status=result.get('status'), error=result.get('detail'))
                for key in ('judge_job_id', 'runtime_ms', 'wall_time_ms', 'cpu_time_ms',
                            'queue_ms', 'compile_ms', 'timing_mode', 'resource_profile',
                            'passed', 'total', 'submission_id', 'reference_runtime_ms'):
                    row[key] = result.get(key)
                row['cases'] = [{key: case[key] for key in
                                ('index', 'status', 'cpu_time_ms', 'wall_time_ms',
                                 'cpu_throttled_ms', 'memory_peak_bytes', 'error') if key in case}
                                for case in result.get('results', [])]
            except Exception as error:
                row.update(http_status=0, status='transport_error', error=str(error))
            row['end_ns'] = time.monotonic_ns()
            row['response_ms'] = (row['end_ns'] - start) / 1e6
            with lock:
                output.write(json.dumps(row, separators=(',', ':')) + '\n')
            return row

        for phase, repeats in [('warmup', 1), ('baseline', args.baseline_rounds),
                               ('burst', args.burst_rounds), ('submit', 1)]:
            if args.phase not in ('all', phase):
                continue
            tasks = [(cell, repeat) for repeat in range(repeats) for cell in manifest['matrix']]
            rng.shuffle(tasks)
            print(json.dumps({'phase': phase, 'tasks': len(tasks), 'event': 'start'}), flush=True)
            completed, failed = 0, 0
            if phase in ('warmup', 'baseline'):
                for cell, repeat in tasks:
                    row = measure(cell, phase, repeat, clients[completed % len(clients)])
                    completed += 1
                    failed += row.get('status') != 'accepted'
                    if completed % 12 == 0:
                        print(json.dumps({'phase': phase, 'done': completed, 'failed': failed,
                                          'elapsed_s': round(time.monotonic() - started)}), flush=True)
            else:
                # A barrier launches 24 requests together; each client drains
                # its share without retries or filtering failed measurements.
                barrier = threading.Barrier(len(clients))
                def drain(index):
                    barrier.wait()
                    return [measure(cell, phase, repeat, clients[index])
                            for cell, repeat in tasks[index::len(clients)]]
                with concurrent.futures.ThreadPoolExecutor(max_workers=len(clients)) as executor:
                    futures = [executor.submit(drain, i) for i in range(len(clients))]
                    for future in concurrent.futures.as_completed(futures):
                        rows = future.result()
                        completed += len(rows)
                        failed += sum(row.get('status') != 'accepted' for row in rows)
                        print(json.dumps({'phase': phase, 'done': completed, 'failed': failed,
                                          'elapsed_s': round(time.monotonic() - started)}), flush=True)
            print(json.dumps({'phase': phase, 'event': 'end', 'tasks': completed,
                              'failed': failed, 'elapsed_s': round(time.monotonic() - started)}), flush=True)


if __name__ == '__main__':
    main()
