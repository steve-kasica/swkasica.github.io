---
title: Set Attachment Instance Name to Filename as Default
tags: 
 - pull requests
 - Django Summernote
coolness: 2
link: https://github.com/summernote/django-summernote/pull/178
nutgraf: Adds a default value for Attachment instances based on filename when using the Django Admin app.
---

Django Summernote is a Django application for using the Summernote WYSIWYG editor in Django projects. My accepted pull request fixes a bug where uploaded files weren't being named consistently when uploaded through the Django Admin.