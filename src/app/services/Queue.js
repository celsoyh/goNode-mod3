const kue = require('kue')
const redisConfig = require('../../config/redis')
const jobs = require('../jobs')
const Queue = kue.createQueue({ redis: redisConfig })
const Sentry = require('@sentry/node')

Queue.process(jobs.PurchaseMail.key, jobs.PurchaseMail.handle)
Queue.on('error', Sentry.captureException)

module.exports = Queue
