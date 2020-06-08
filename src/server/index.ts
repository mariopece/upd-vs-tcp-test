import { ExtendedObject3D } from 'enable3d'
import geckos, { iceServers, ServerChannel } from '@geckos.io/server'
import { Ammo, Physics, ServerClock } from '@enable3d/ammo-on-nodejs'

const io1 = geckos({ iceServers })
io1.onConnection((channel: ServerChannel) => {})
io1.listen()

io1.onConnection(channel => {
  const { id } = channel

  console.log(id, 'is connected')

  const interval = setInterval(() => {
    // send 16 kiloBytes

    // console.log(channel.dataChannel.bufferedAmount)
    if (channel.dataChannel.bufferedAmount < 256 * 1024) {
      channel.raw.emit(Buffer.alloc(64 * 1024))
    }
  }, 0)

  setTimeout(() => {
    clearInterval(interval)
  }, 60000)
})
