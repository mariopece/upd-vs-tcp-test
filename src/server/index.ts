import { ExtendedObject3D } from 'enable3d'
import geckos, { iceServers, ServerChannel } from '@geckos.io/server'
import { Ammo, Physics, ServerClock } from '@enable3d/ammo-on-nodejs'

const FPS = 60
const KB = 128 * 1024

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
      let b = channel.dataChannel.bufferedAmount / KB
      let random = 1 - 1 / b / 2

      if (Math.random() > random) {
        // console.log('send buffered message', b, random)
        channel.raw.emit(Buffer.alloc(KB))
      }
    }
  }, 1000 / FPS)

  setTimeout(() => {
    clearInterval(interval)
  }, 60000)
})
