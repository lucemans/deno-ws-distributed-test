#!/bin/sh
docker build --rm -t registry.lucemans.com/novachat .
docker push registry.lucemans.com/novachat