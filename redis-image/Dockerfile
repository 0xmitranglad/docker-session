# Use an existing image as a base image
FROM alpine
# download and install dependency
RUN apk add --update redis
# tell the image what to do when it starts as a container
CMD ["redis-server"]