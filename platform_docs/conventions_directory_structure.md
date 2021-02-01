# Directory structure

**env**  
Development and test \env.json files.
See [Env files](platform_docs/env_files.md).

**src/migrations**  
Database migrations.
See [Migrations](platform_docs/migrations.md).

**src/config**  
Service configs.
See [Configs](platform_docs/configs.md).

**reservation-appnet/Models**  
Database models. No business logic should be implemented here.

(TBD) **reservation-appnet/Repositories**
Set of utility classes (repositories) for accessing database.
All database interactions should be implemented here.
No business logic should be implemented here.

(TBD) **reservation-appnet/Services**  
Contains classes called "services" which implemnt business logic of the application.
