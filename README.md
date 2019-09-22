# HAXcms Github Oauth Microservice

This is a standalone microservice that will login a user via Github OAuth,
store create a user in this auth service db, issue a jwt, store it in a Cookie,
and redirect the user back to the requesting page.

## Development

Create a Github Oauth App

```bash
cp .env.example .env
```

Add your credentials to the .env file

```bash
docker-compose up --build
```

Visit `http://haxcms.localhost/login` 
