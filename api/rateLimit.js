/**
 * rateLimit.js
 *
 * Простой in-memory rate limit по IP для публичного чата.
 */

const buckets = new Map()

export function checkRateLimit(ip, limitPerHour) {
  const now = Date.now()
  const hourMs = 60 * 60 * 1000
  const bucket = buckets.get(ip) ?? { count: 0, resetAt: now + hourMs }

  if (now > bucket.resetAt) {
    bucket.count = 0
    bucket.resetAt = now + hourMs
  }

  bucket.count += 1
  buckets.set(ip, bucket)

  return bucket.count <= limitPerHour
}

export function getClientIp(request) {
  const forwarded = request.headers['x-forwarded-for']
  if (typeof forwarded === 'string' && forwarded.length > 0) {
    return forwarded.split(',')[0].trim()
  }

  return request.socket.remoteAddress || 'unknown'
}
