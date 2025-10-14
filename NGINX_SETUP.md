# Nginx Setup Guide for BoragoWeb

This guide covers setting up Nginx as a reverse proxy for your Next.js application.

## Table of Contents
- [Option 1: Docker Setup (Recommended)](#option-1-docker-setup-recommended)
- [Option 2: Manual Nginx Setup](#option-2-manual-nginx-setup)
- [SSL Certificate Setup](#ssl-certificate-setup)
- [Testing and Troubleshooting](#testing-and-troubleshooting)

---

## Option 1: Docker Setup (Recommended)

### Prerequisites
- Docker installed
- Docker Compose installed

### Steps

1. **Create environment file**
   ```bash
   cp .env.example .env
   # Edit .env with your actual values
   ```

2. **Update next.config.js**
   
   Add standalone output for Docker:
   ```javascript
   module.exports = {
     output: 'standalone',
     // ... rest of your config
   }
   ```

3. **Build and run with Docker Compose**
   ```bash
   docker-compose up -d
   ```

4. **View logs**
   ```bash
   # All services
   docker-compose logs -f
   
   # Just Next.js
   docker-compose logs -f nextjs
   
   # Just Nginx
   docker-compose logs -f nginx
   ```

5. **Stop services**
   ```bash
   docker-compose down
   ```

### Docker Commands Reference

```bash
# Rebuild after code changes
docker-compose up -d --build

# Restart a specific service
docker-compose restart nextjs

# View running containers
docker-compose ps

# Execute command in container
docker-compose exec nextjs sh
```

---

## Option 2: Manual Nginx Setup

### Prerequisites
- Ubuntu/Debian server
- Node.js 18+ installed
- Nginx installed

### 1. Install Nginx

```bash
# Ubuntu/Debian
sudo apt update
sudo apt install nginx

# Start and enable Nginx
sudo systemctl start nginx
sudo systemctl enable nginx
```

### 2. Configure Next.js as a Service

Create a systemd service file:

```bash
sudo nano /etc/systemd/system/boragoweb.service
```

Add the following content:

```ini
[Unit]
Description=BoragoWeb Next.js Application
After=network.target

[Service]
Type=simple
User=www-data
WorkingDirectory=/var/www/boragoweb
Environment="NODE_ENV=production"
Environment="PORT=3000"
EnvironmentFile=/var/www/boragoweb/.env
ExecStart=/usr/bin/npm start
Restart=on-failure
RestartSec=10

[Install]
WantedBy=multi-user.target
```

Enable and start the service:

```bash
sudo systemctl daemon-reload
sudo systemctl enable boragoweb
sudo systemctl start boragoweb
sudo systemctl status boragoweb
```

### 3. Configure Nginx

Copy the nginx.conf to Nginx sites:

```bash
# Copy configuration
sudo cp nginx.conf /etc/nginx/sites-available/boragoweb

# Update domain name in the config
sudo nano /etc/nginx/sites-available/boragoweb
# Replace 'yourdomain.com' with your actual domain

# Create symbolic link
sudo ln -s /etc/nginx/sites-available/boragoweb /etc/nginx/sites-enabled/

# Remove default site (optional)
sudo rm /etc/nginx/sites-enabled/default

# Test configuration
sudo nginx -t

# Reload Nginx
sudo systemctl reload nginx
```

### 4. Deploy Your Application

```bash
# Create directory
sudo mkdir -p /var/www/boragoweb

# Clone your repository
cd /var/www/boragoweb
git clone <your-repo-url> .

# Install dependencies
npm ci --only=production

# Build application
npm run build

# Set permissions
sudo chown -R www-data:www-data /var/www/boragoweb

# Start the service
sudo systemctl start boragoweb
```

---

## SSL Certificate Setup

### Using Let's Encrypt (Free)

1. **Install Certbot**
   ```bash
   sudo apt install certbot python3-certbot-nginx
   ```

2. **Obtain Certificate**
   ```bash
   sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
   ```

3. **Auto-renewal**
   ```bash
   # Test renewal
   sudo certbot renew --dry-run
   
   # Certbot automatically sets up a cron job for renewal
   ```

### Using Custom SSL Certificate

1. Place your certificate files:
   ```bash
   sudo mkdir -p /etc/ssl/boragoweb
   sudo cp fullchain.pem /etc/ssl/boragoweb/
   sudo cp privkey.pem /etc/ssl/boragoweb/
   ```

2. Update nginx.conf SSL paths:
   ```nginx
   ssl_certificate /etc/ssl/boragoweb/fullchain.pem;
   ssl_certificate_key /etc/ssl/boragoweb/privkey.pem;
   ```

---

## Testing and Troubleshooting

### Test Nginx Configuration

```bash
# Test syntax
sudo nginx -t

# Check status
sudo systemctl status nginx

# View error logs
sudo tail -f /var/log/nginx/boragoweb_error.log

# View access logs
sudo tail -f /var/log/nginx/boragoweb_access.log
```

### Test Next.js Application

```bash
# Check if Next.js is running
curl http://localhost:3000

# Check service status
sudo systemctl status boragoweb

# View application logs
sudo journalctl -u boragoweb -f
```

### Common Issues

#### 1. 502 Bad Gateway
- Check if Next.js is running: `sudo systemctl status boragoweb`
- Check port 3000 is accessible: `curl http://localhost:3000`
- Check Nginx error logs

#### 2. Permission Denied
```bash
# Fix permissions
sudo chown -R www-data:www-data /var/www/boragoweb
sudo chmod -R 755 /var/www/boragoweb
```

#### 3. Port Already in Use
```bash
# Check what's using port 3000
sudo lsof -i :3000

# Kill the process if needed
sudo kill -9 <PID>
```

#### 4. Environment Variables Not Loading
```bash
# Check .env file exists
ls -la /var/www/boragoweb/.env

# Verify service can read it
sudo systemctl cat boragoweb
```

### Health Checks

```bash
# Check Nginx
curl http://yourdomain.com/health

# Check SSL
curl https://yourdomain.com/health

# Test API endpoint
curl https://yourdomain.com/api/health
```

---

## Performance Tuning

### Nginx Optimization

Edit `/etc/nginx/nginx.conf`:

```nginx
worker_processes auto;
worker_connections 1024;

# Enable caching
proxy_cache_path /var/cache/nginx levels=1:2 keys_zone=my_cache:10m max_size=1g inactive=60m;
```

### PM2 Alternative (Instead of systemd)

```bash
# Install PM2
npm install -g pm2

# Start application
pm2 start npm --name "boragoweb" -- start

# Save PM2 configuration
pm2 save

# Setup startup script
pm2 startup systemd
```

---

## Monitoring

### Setup Monitoring with PM2

```bash
# Monitor application
pm2 monit

# View logs
pm2 logs boragoweb

# Restart on file changes (development)
pm2 start npm --name "boragoweb" -- start --watch
```

### Nginx Monitoring

```bash
# Enable status page in nginx.conf
location /nginx_status {
    stub_status on;
    access_log off;
    allow 127.0.0.1;
    deny all;
}

# Check status
curl http://localhost/nginx_status
```

---

## Backup and Updates

### Update Application

```bash
cd /var/www/boragoweb
git pull
npm ci --only=production
npm run build
sudo systemctl restart boragoweb
```

### Backup

```bash
# Backup application
tar -czf boragoweb-backup-$(date +%Y%m%d).tar.gz /var/www/boragoweb

# Backup Nginx config
sudo cp /etc/nginx/sites-available/boragoweb /backup/nginx-boragoweb-$(date +%Y%m%d).conf
```

---

## Security Checklist

- [ ] SSL certificate installed and auto-renewal configured
- [ ] Firewall configured (UFW or iptables)
- [ ] Rate limiting enabled in Nginx
- [ ] Security headers configured
- [ ] Environment variables secured (not in git)
- [ ] Regular updates scheduled
- [ ] Monitoring and logging enabled
- [ ] Backup strategy in place

---

## Firewall Configuration

```bash
# Install UFW
sudo apt install ufw

# Allow SSH (important!)
sudo ufw allow ssh

# Allow HTTP and HTTPS
sudo ufw allow 80/tcp
sudo ufw allow 443/tcp

# Enable firewall
sudo ufw enable

# Check status
sudo ufw status
```

---

## Support

For issues:
1. Check Nginx error logs: `/var/log/nginx/boragoweb_error.log`
2. Check application logs: `sudo journalctl -u boragoweb -f`
3. Test Nginx config: `sudo nginx -t`
4. Verify Next.js is running: `curl http://localhost:3000`

---

**Note**: Always test configuration changes in a staging environment first.
