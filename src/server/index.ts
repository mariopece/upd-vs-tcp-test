import { ExtendedObject3D } from 'enable3d'
import geckos, { iceServers, ServerChannel } from '@geckos.io/server'
import { Ammo, Physics, ServerClock } from '@enable3d/ammo-on-nodejs'

const FPS = 20
const KB = 4 * 1024

// const io1 = geckos({ iceServers })
const io1 = geckos({ iceServers })
io1.listen()

io1.onConnection((channel: ServerChannel) => {
  const { id } = channel

  let sent = -1

  const interval = setInterval(() => {
    sent++
    if (sent >= 1800) return

    // @ts-ignore
    if (channel.dataChannel.bufferedAmount === 0) {
      channel.raw.emit(Buffer.alloc(KB))
    } else {
      // @ts-ignore
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
    channel.close()
  }, 45000)
})
