
import { map, find, filter } from 'lodash'
import { hashString } from './hash'

export default class EventService {
  topics = []

  getTopic(topicId) {
    return _.find(topics, {id: topicId}) || null
  }

  on(topicId, callback, refId) {
    refId = refId || hashString()
    let topic = this.getTopic(topicId)

    if (!topic) {
      topic = {
        id: topicId,
        queue: [{
          refId: refId || null,
          callback: callback
        }]
      }

      this.topics.push(topic)
    } else {
      topic.queue.push({
        refId: refId || null,
        callback: callback
      })
    }

    return refId
  }

  off(topicId, refId) {
    if (!refId) {
      return
    }

    const topic = this.getTopic(topicId)

    if (!topic) {
      return
    }

    topic.queue = filter(topic.queue, (entry) => {
      return entry.refId !== refId
    })

    return null
  }

  trigger() {
    const args = Array.prototype.slice.call(arguments)
    const topicId = args.shift()
    const topic = find(this.topics, {id: topicId})

    if (!topic || !topic.queue || !topic.queue.length) {
      return
    }

    map(topic.queue, (entry) => {
      if (entry.callback && (typeof entry.callback === 'function')) {
        entry.callback.apply(null, args)
      }
    })
  }
}
