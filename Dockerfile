# Use an official PHP runtime as a parent image
FROM php:8.2-fpm

# Set working directory
WORKDIR /var/www/html

# Install system dependencies
RUN apt-get update && apt-get install -y \
    build-essential \
    libpng-dev \
    libjpeg62-turbo-dev \
    libfreetype6-dev \
    locales \
    zip \
    unzip \
    git \
    curl \
    libonig-dev \
    libzip-dev \
    supervisor

# Install PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring exif pcntl bcmath gd zip

# Install Composer globally
RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

# Copy existing application directory contents
COPY . /var/www/html

# Copy existing application directory permissions
COPY --chown=www-data:www-data . /var/www/html

# Install Laravel dependencies
RUN composer install --optimize-autoloader --no-dev

RUN touch /var/www/html/database/database.sqlite

# Set permissions for Laravel
RUN chown -R www-data:www-data /var/www/html/storage /var/www/html/bootstrap/cache

# Ensure the SQLite file is copied into the container
COPY database/database.sqlite /var/www/html/database/database.sqlite

# Ensure correct ownership and permissions
RUN chown -R www-data:www-data /var/www/html/database \
    && chmod -R 775 /var/www/html/database

CMD ["php", "artisan", "migrate", "--force"]

# Expose port 8080
EXPOSE 10000

# Copy PHP-FPM configuration file
COPY php-fpm.conf /usr/local/etc/php-fpm.d/zzz-custom.conf

# Run Laravel's built-in server
CMD ["php", "artisan", "serve", "--host=0.0.0.0", "--port=10000"]
