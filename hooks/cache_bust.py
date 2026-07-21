"""
Cache-bust our own CSS/JS assets so Cloudflare doesn't serve stale versions
to returning visitors after a deploy.

Appends `?v={build-timestamp}` to references of animations.js and
deep-space.css in every rendered page. Cloudflare treats query strings as
part of the cache key (default behavior), so the new URL forces a fresh
fetch on every deploy. Repeat visits within a deploy still hit cache.
"""

import time

BUILD_STAMP = str(int(time.time()))

_ASSETS = (
    "javascripts/animations.js",
    "stylesheets/deep-space.css",
)


def on_post_page(output, page, config):
    for asset in _ASSETS:
        output = output.replace(
            f"/{asset}\"",
            f"/{asset}?v={BUILD_STAMP}\"",
        )
    return output
