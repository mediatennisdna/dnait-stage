#!/bin/bash
# DNAIT STAGE — Download stock photos from Unsplash (free, no attribution required)
# Run this from the /web folder: bash download-photos.sh

mkdir -p public/img/venues public/img/activities public/video

echo "Downloading stock photos..."

# Hero poster — tennis court action shot
curl -sL "https://images.unsplash.com/photo-1554068865-24cecd4e34b8?w=1920&h=1080&fit=crop&q=80" -o public/img/hero-poster.jpg
echo "✓ hero-poster.jpg"

# Venues
curl -sL "https://images.unsplash.com/photo-1539037116277-4db20889f2d4?w=1200&h=800&fit=crop&q=80" -o public/img/venues/escorial.jpg
echo "✓ venues/escorial.jpg (Spanish historic building)"

curl -sL "https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?w=1200&h=800&fit=crop&q=80" -o public/img/venues/gtennis.jpg
echo "✓ venues/gtennis.jpg (tennis academy)"

# Day 1 — Arrival (airport/luggage)
curl -sL "https://images.unsplash.com/photo-1564429238961-bf8e5b83567d?w=1200&h=600&fit=crop&q=80" -o public/img/activities/day-1.jpg
echo "✓ activities/day-1.jpg (arrival)"

# Day 2 — Zip lines / adventure
curl -sL "https://images.unsplash.com/photo-1551632811-561732d1e306?w=1200&h=600&fit=crop&q=80" -o public/img/activities/day-2.jpg
echo "✓ activities/day-2.jpg (zip lines)"

# Day 3 — Paintball
curl -sL "https://images.unsplash.com/photo-1567189022371-cc754891cdc4?w=1200&h=600&fit=crop&q=80" -o public/img/activities/day-3.jpg
echo "✓ activities/day-3.jpg (paintball/outdoor)"

# Day 4 — Madrid city
curl -sL "https://images.unsplash.com/photo-1543783207-ec64e4d95325?w=1200&h=600&fit=crop&q=80" -o public/img/activities/day-4.jpg
echo "✓ activities/day-4.jpg (Madrid)"

# Day 5 — Water park
curl -sL "https://images.unsplash.com/photo-1526481280693-3bfa7568e0f3?w=1200&h=600&fit=crop&q=80" -o public/img/activities/day-5.jpg
echo "✓ activities/day-5.jpg (water park)"

# Day 6 — Valencia tennis
curl -sL "https://images.unsplash.com/photo-1599586120429-48281b6f0ece?w=1200&h=600&fit=crop&q=80" -o public/img/activities/day-6.jpg
echo "✓ activities/day-6.jpg (tennis training)"

# Day 7 — Tournament / City of Arts & Sciences
curl -sL "https://images.unsplash.com/photo-1587280501635-68a0e82cd5ff?w=1200&h=600&fit=crop&q=80" -o public/img/activities/day-7.jpg
echo "✓ activities/day-7.jpg (competition/trophy)"

# Day 8 — Beach Valencia
curl -sL "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1200&h=600&fit=crop&q=80" -o public/img/activities/day-8.jpg
echo "✓ activities/day-8.jpg (beach)"

echo ""
echo "Done! All photos downloaded to public/img/"
echo "Now run: git add . && git commit -m 'Add stock photos' && git push"
