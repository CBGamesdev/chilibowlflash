FROM ansemjo/caddy:cgi

RUN apk add --no-cache xvfb imagemagick xclock curl xdpyinfo xdotool bash bc
RUN apk add --no-cache chocolate-doom --repository http://nl.alpinelinux.org/alpine/edge/testing
RUN mv /caddy /usr/local/bin/caddy

WORKDIR /app

COPY app .

ENV PORT=8080
ENV DISPLAY=:0
ENTRYPOINT [ "/app/entrypoint.sh" ]
