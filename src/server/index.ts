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

  const interval = setInterval(() => {
    if (channel.dataChannel.bufferedAmount === 0) {
      channel.raw.emit(Buffer.alloc(16 * 1024))
    } else {
      if (Math.random() > 0.75) channel.raw.emit(Buffer.alloc(16 * 1024))
    }
  }, 1000 / FPS)

  setTimeout(() => {
    clearInterval(interval)
  }, 60000)
})
