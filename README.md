# LevelUp Borås

This is Viskans submission to Borås Tech Challenge 2024.

The project is bootstrapped with the [T3 Stack](https://create.t3.gg/) (with `create-t3-app`).

## Tech stack

The following technologies and libraries are used in this project:

- [Next.js](https://nextjs.org)
- [NextAuth.js](https://next-auth.js.org)
- [Prisma](https://prisma.io)
- [Tailwind CSS](https://tailwindcss.com)
- [tRPC](https://trpc.io)
- [PostgreSQL via Xata](https://xata.io)

## Development

Configure your `.env` (based on `.env.example`) and then run:

```bash
$ npm run dev
```


## Deployment

The application requires a running PostgreSQL. You can run arbitrary cloud provider or a local PostgreSQL. You can fire one up easily using Docker:

```bash
$ sudo docker run --detach --name postgresql --env POSTGRES_PASSWORD=... --publish 5432:5432 postgres:16.3
```

The application itself is hosted in Kubernetes. Use the default `kubernetes.yml` and replace the settings and apply it with `kubectl apply -f kubernetes.yml`.
