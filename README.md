# Server Dashboard

## Dark Mode

![screenshot](images/screenshot_dark.png)

## Light Mode

![screenshot](images/screenshot_light.png)

written in Go and React

[https://hub.docker.com/repository/docker/florianhoss/serverdashboard](https://hub.docker.com/repository/docker/florianhoss/serverdashboard)

## docker-compose example:

```
version: '3.9'

services:
  dashboard:
    image: florianhoss/serverdashboard:latest
    container_name: dashboard
    restart: unless-stopped
    environment:
      SERVER_NAME: "Mercedes"
      GIN_MODE: release
      HOST_PROC: /hostfs/proc
      HOST_SYS: /hostfs/sys
      HOST_ETC: /hostfs/etc
      HOST_VAR: /hostfs/var
      HOST_RUN: /hostfs/run
      HOST_DEV: /hostfs/dev
    volumes:
      - /proc:/hostfs/proc:ro
      - /sys:/hostfs/sys:ro
      - /etc:/hostfs/etc:ro
      - /var:/hostfs/var:ro
      - /run:/hostfs/run:ro
      - /dev:/hostfs/dev:ro
    ports:
      - "4000:4000"
```
