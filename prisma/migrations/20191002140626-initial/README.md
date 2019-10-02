# Migration `20191002140626-initial`

This migration has been generated at 10/2/2019, 2:06:26 PM.
You can check out the [state of the datamodel](./datamodel.prisma) after the migration.

## Database Steps

```sql
CREATE TABLE "public"."User" (
  "createdAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  "email" text   ,
  "githubAccessToken" text   ,
  "id" text NOT NULL  ,
  "name" text NOT NULL DEFAULT '' ,
  "updatedAt" timestamp(3) NOT NULL DEFAULT '1970-01-01 00:00:00' ,
  PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX "User.name" ON "public"."User"("name")
```

## Changes

```diff
diff --git datamodel.mdl datamodel.mdl
migration ..20191002140626-initial
--- datamodel.dml
+++ datamodel.dml
@@ -1,0 +1,17 @@
+datasource db {
+  provider = env("PRISMA_DB_PROVIDER")
+  url      = env("PRISMA_DB_URL")
+}
+
+generator photon {
+  provider = "photonjs"
+}
+
+model User {
+  id                String   @default(cuid()) @id
+  createdAt         DateTime @default(now())
+  updatedAt         DateTime @updatedAt
+  name              String   @unique
+  email             String?
+  githubAccessToken String?
+}
```

## Photon Usage

You can use a specific Photon built for this migration (20191002140626-initial)
in your `before` or `after` migration script like this:

```ts
import Photon from '@generated/photon/20191002140626-initial'

const photon = new Photon()

async function main() {
  const result = await photon.users()
  console.dir(result, { depth: null })
}

main()

```
