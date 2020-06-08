import { Project, Scene3D, ExtendedObject3D, THREE } from 'enable3d'
import geckos from '@geckos.io/client'
import io from 'socket.io-client'

const channel = geckos()

const h1 = document.getElementsByTagName('H1')[0]

channel.onConnect(error => {
  if (error) {
    console.error(error.message)
    return
  }

  console.log('you are connected')

  let i = 0
  let bytesTotal = 0
  let bytesLast = 0
  let time = 0

  const interval = 2
  setInterval(() => {
    const bytes = bytesTotal - bytesLast
    const text = `Packages: ${i} @ ${((bytes / 1024 / 1024) * interval).toFixed(
      2
    )} MBytes/s`

    h1.innerHTML = text
    bytesLast = bytesTotal
  }, 1000 / interval)

  channel.onRaw(data => {
    i++
    if (i === 1) time = new Date().getTime()
    const now = new Date().getTime()
    // @ts-ignore
    const length = new Uint8Array(data).length
    bytesTotal += length

    time = new Date().getTime()
  })
})
