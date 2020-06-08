import { ExtendedObject3D } from 'enable3d'
import geckos, { iceServers, ServerChannel } from '@geckos.io/server'
import { Ammo, Physics, ServerClock } from '@enable3d/ammo-on-nodejs'

const FPS = 60
const KB = 64 * 1024
const packages = 1800

// const io1 = geckos({ iceServers })
const io1 = geckos({ iceServers })
io1.listen()

io1.onConnection((channel: ServerChannel) => {
  const { id } = channel

  let sent = -1

  const interval = setInterval(() => {
    sent++
    if (sent >= packages) return

    // @ts-ignore
    if (channel.dataChannel.bufferedAmount === 0) {
      channel.raw.emit(Buffer.alloc(KB))
    } else {
      // @ts-ignore
      console.log('buffer size: ', channel.dataChannel.bufferedAmount)
      console.log('drop message for ', id, 'at: ', new Date().getTime())
    }
  }, 1000 / FPS)

  setTimeout(() => {
    clearInterval(interval)
    channel.close()
  }, 45000)
})
