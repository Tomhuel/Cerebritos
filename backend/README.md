# API Cerebritos:

## Requirements:

- Install dependencies: `composer install` & `npm install`
- Setup [.env](.env)
- Setup DB `MySQL` for this application (configuration should assert with the `.env`)
- With the DB setted up, let's `php artisan migrate`
- Generate Laravel Passport's keys:
```bash
php artisan passport:install
```
- Run the project with: 
```bash
php artisan serve # this will use port 8000 by default.
```