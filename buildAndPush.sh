#!/bin/bash

TAG=$1
if [ "${TAG}" == "" ]; then
  TAG=latest
fi

docker buildx build --push --platform linux/arm/v7,linux/arm64,linux/amd64 --tag florianhoss/serverdashboard:"${TAG}" .
