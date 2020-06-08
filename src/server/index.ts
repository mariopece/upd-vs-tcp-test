import { ExtendedObject3D } from 'enable3d'
import geckos, { iceServers, ServerChannel } from '@geckos.io/server'
import { Ammo, Physics, ServerClock } from '@enable3d/ammo-on-nodejs'

const FPS = 60
const KB = 16 * 1024

// const io1 = geckos({ iceServers })
const io1 = geckos({ iceServers })
io1.onConnection((channel: ServerChannel) => {})
io1.listen()

io1.onConnection(channel => {
  const { id } = channel

  const interval = setInterval(() => {
    if (channel.dataChannel.bufferedAmount === 0) {
      channel.raw.emit(Buffer.alloc(KB))
    } else {
      let ratio = channel.dataChannel.bufferedAmount / KB

      let random = 1 - 1 / ratio / 2

      if (ratio <= 4 && Math.random() > random) {
        channel.raw.emit(Buffer.alloc(KB))
      } else {
        console.log(
          'drop message for ',
          id,
          'ratio: ',
          ratio,
          'at: ',
          new Date().getTime()
        )
      }
    }
  }, 1000 / FPS)

  setTimeout(() => {
    clearInterval(interval)
  }, 60000)
})
