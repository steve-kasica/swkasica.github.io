---
title: Google Apps Script OAuth2 Library
tags:
 - pull requests
 - Apps Script OAuth2
coolness: 1
link: https://github.com/googlesamples/apps-script-oauth2/pull/72
nutgraf: A small patch fixing a bug in the exchange of authorization codes for access token with irregular response codes.
---

I discovered and patched a bug in Google's OAuth2 library for Google Apps Script when exchanging authorization codes for access token with a server that respond with a status code other than 200. I fixed the bug and made a pull request on GitHub that was accepted and merged into the code base.