## Dashboard Design of an E-commerce Application

Hello devs,

Welcome to the README for our e-commerce dashboard design. This dashboard is a work in progress and aims to provide a smooth experience for our users. Here's an overview of the tech stack:

```bash
Frontend technologies
---------------------
- Typescript
- Next.js
- Tailwind CSS
- ShadCN
- React query
- React hook form
```

```bash
Backend technologies
--------------------
- Prisma (ORM)
- MySQL DB (Planetscale)
```

```bash
Authentication
--------------
- Next Auth
```

```bash
Deployment
----------
- Vercel
```

### Environment Variables

Create a .env file in the frontend root directory and add:

`DATABASE_URL`
This will be the URL of your Planetscale DB

`NEXTAUTH_URL`
Here you need to put base URL of your application

`secret`
Here you need to put same value you will add in `NEXTAUTH_SECRET`

`NEXTAUTH_SECRET`
Add a secret

`GOOGLE_CLIENT_ID`
Here you need to add your Client ID

`GOOGLE_CLIENT_SECRET`
Here you need to add your Client Secret

### Getting Started:

- Clone the repo.
- Install all dependencies: npm install
- Set up Planetscale MySQL DB and configure backend .env.
- Start the application: npm run dev

Feel free to join our development efforts and help us shape the future of our e-commerce dashboard. Together, we'll create an exceptional experience for our users.

Happy coding!
