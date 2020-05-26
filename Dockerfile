FROM registry.lucemans.com/deno:latest

COPY *.ts ./
COPY *.js ./
COPY *.html ./

# deno run --allow-net --allow-env --allow-read --unstable ./index.ts
CMD ["deno", "run", "--allow-net", "--allow-env", "--allow-read", "--unstable", "index.ts"]