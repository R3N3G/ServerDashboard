#!/bin/sh

./app &
nginx -g "daemon off;"
