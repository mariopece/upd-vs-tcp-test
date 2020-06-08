import { ExtendedObject3D } from 'enable3d'
import geckos, { iceServers, ServerChannel } from '@geckos.io/server'
import { Ammo, Physics, ServerClock } from '@enable3d/ammo-on-nodejs'

const FPS = 60

// const io1 = geckos({ iceServers })
const io1 = geckos({ iceServers })
io1.onConnection((channel: ServerChannel) => {})
io1.listen()

io1.onConnection(channel => {
  const { id } = channel

  channel.pause = false

  const interval = setInterval(() => {
    if (channel.pause) return

    if (channel.dataChannel.bufferedAmount === 0) {
      channel.raw.emit(Buffer.alloc(16 * 1024))
    } else {
      channel.pause = true

      // console.log(new Date().getTime(), 'pause', id)

      setTimeout(() => {
        channel.pause = false
      }, (1000 / FPS) * 2)
    }
  }, 1000 / FPS)

  setTimeout(() => {
    clearInterval(interval)
  }, 60000)
})
