# Build the Vite application.
FROM node:20-alpine AS builder

WORKDIR /app

# Keep dependency installation cacheable.
COPY package.json package-lock.json ./
RUN npm ci

COPY . .
RUN npm run build

# Serve the production build with Nginx.
FROM nginx:1.27-alpine

COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /app/dist/ /usr/share/nginx/html/

# The React application links to these standalone tools and image assets.
COPY --from=builder /app/*.html /usr/share/nginx/html/
COPY --from=builder /app/pictures/ /usr/share/nginx/html/pictures/
COPY --from=builder "/app/Sign Language Converter(ASL) _ Convert Text to Sign language_files/" "/usr/share/nginx/html/Sign Language Converter(ASL) _ Convert Text to Sign language_files/"

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
