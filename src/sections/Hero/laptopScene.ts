import * as THREE from 'three'
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js'

/**
 * MacBook em 3D (three.js) que abre, mostra um projeto, fecha, gira
 * e reabre com o próximo, em ciclo.
 */

type Pose = { yaw: number; pitch: number; roll: number }

const W = 3.0 // largura
const D = 2.06 // profundidade da base
const TB = 0.075 // espessura da base
const DL = 1.98 // altura da tampa
const TL = 0.035 // espessura da tampa
const OPEN = (108 * Math.PI) / 180

// posições com a tampa fechada (girando entre um projeto e outro) e aberta
const CLOSED: Pose[] = [
  { yaw: -0.75, pitch: 0.42, roll: 0.06 },
  { yaw: 0.8, pitch: 0.38, roll: -0.08 },
  { yaw: -0.55, pitch: 0.1, roll: 0.12 },
  { yaw: 0.65, pitch: 0.3, roll: 0 },
]
const FRONT: Pose[] = [
  { yaw: 0, pitch: 0, roll: 0 },
  { yaw: -0.42, pitch: 0.02, roll: 0 },
  { yaw: 0.38, pitch: 0, roll: 0 },
  { yaw: -0.18, pitch: 0.04, roll: 0 },
]

const easeInOut = (t: number) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2)
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3)
const clamp01 = (t: number) => Math.min(1, Math.max(0, t))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const lerpPose = (a: Pose, b: Pose, t: number): Pose => ({
  yaw: lerp(a.yaw, b.yaw, t),
  pitch: lerp(a.pitch, b.pitch, t),
  roll: lerp(a.roll, b.roll, t),
})

function roundedRect(w: number, h: number, r: number) {
  const s = new THREE.Shape()
  const x = -w / 2
  const y = -h / 2
  s.moveTo(x + r, y)
  s.lineTo(x + w - r, y)
  s.quadraticCurveTo(x + w, y, x + w, y + r)
  s.lineTo(x + w, y + h - r)
  s.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  s.lineTo(x + r, y + h)
  s.quadraticCurveTo(x, y + h, x, y + h - r)
  s.lineTo(x, y + r)
  s.quadraticCurveTo(x, y, x + r, y)
  return s
}

/** placa de alumínio arredondada, deitada no plano XZ, de y=0 até y=t */
function slab(w: number, d: number, t: number, r: number, bevel: number) {
  const g = new THREE.ExtrudeGeometry(roundedRect(w - bevel * 2, d - bevel * 2, r), {
    depth: t - bevel * 2,
    bevelEnabled: true,
    bevelThickness: bevel,
    bevelSize: bevel,
    bevelSegments: 4,
    curveSegments: 16,
  })
  g.rotateX(-Math.PI / 2)
  g.translate(0, bevel, 0)
  return g
}

function roundedPlane(w: number, h: number, r: number) {
  const g = new THREE.ShapeGeometry(roundedRect(w, h, r), 12)
  // UV de 0 a 1 (o ShapeGeometry usa as coordenadas da forma)
  const pos = g.attributes.position
  const uv = g.attributes.uv
  for (let i = 0; i < uv.count; i++) uv.setXY(i, pos.getX(i) / w + 0.5, pos.getY(i) / h + 0.5)
  uv.needsUpdate = true
  return g
}

function keyboardTexture() {
  const c = document.createElement('canvas')
  c.width = 1400
  c.height = 520
  const x = c.getContext('2d')!
  x.fillStyle = '#26272a'
  x.fillRect(0, 0, c.width, c.height)
  const rows = [14, 14, 13, 12, 11]
  const gap = 12
  const keyH = (c.height - gap * 7) / 6
  const key = (kx: number, ky: number, kw: number, kh: number) => {
    x.fillStyle = '#0a0a0b'
    x.beginPath()
    x.roundRect(kx, ky, kw, kh, 8)
    x.fill()
    x.strokeStyle = 'rgba(255,255,255,.12)'
    x.lineWidth = 2
    x.stroke()
  }
  // fila de funções (mais baixa)
  const fW = (c.width - gap * 15) / 14
  for (let i = 0; i < 14; i++) key(gap + i * (fW + gap), gap, fW, keyH * 0.6)
  let y = gap * 2 + keyH * 0.6
  rows.forEach((n, ri) => {
    const kw = (c.width - gap * (n + 1)) / n
    for (let i = 0; i < n; i++) key(gap + i * (kw + gap), y, kw, keyH)
    y += keyH + gap
    if (ri === 3) y += 0
  })
  // barra de espaço
  const bottomY = y
  const unit = (c.width - gap * 12) / 11
  let bx = gap
  ;[1, 1, 1, 1.3].forEach((u) => {
    key(bx, bottomY, unit * u, keyH * 0.95)
    bx += unit * u + gap
  })
  key(bx, bottomY, unit * 4.4, keyH * 0.95)
  bx += unit * 4.4 + gap
  ;[1.2, 1].forEach((u) => {
    key(bx, bottomY, unit * u, keyH * 0.95)
    bx += unit * u + gap
  })
  // setas
  const aw = (c.width - gap - bx - gap * 2) / 3
  key(bx, bottomY + keyH * 0.5, aw, keyH * 0.45)
  key(bx + aw + gap, bottomY, aw, keyH * 0.45)
  key(bx + aw + gap, bottomY + keyH * 0.5, aw, keyH * 0.45)
  key(bx + (aw + gap) * 2, bottomY + keyH * 0.5, aw, keyH * 0.45)
  const t = new THREE.CanvasTexture(c)
  t.colorSpace = THREE.SRGBColorSpace
  t.anisotropy = 8
  return t
}

export type LaptopHandle = { destroy: () => void }

export function createLaptopScene(
  canvas: HTMLCanvasElement,
  images: string[],
  opts: { reduced: boolean; onSlide: (i: number) => void },
): LaptopHandle {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.outputColorSpace = THREE.SRGBColorSpace
  renderer.toneMapping = THREE.ACESFilmicToneMapping
  renderer.toneMappingExposure = 1.05

  const scene = new THREE.Scene()
  const pmrem = new THREE.PMREMGenerator(renderer)
  const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture
  scene.environment = envTex

  const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 100)
  camera.position.set(0, 2.9, 7.0)
  camera.lookAt(0, 0.62, 0)

  // luzes: chave quente por cima e um contorno azul (cor da Clear Code)
  const key = new THREE.DirectionalLight(0xffffff, 1.4)
  key.position.set(2, 6, 4)
  scene.add(key)
  const rim = new THREE.DirectionalLight(0x4aa3ff, 2.2)
  rim.position.set(-4, 1.5, -4)
  scene.add(rim)
  scene.add(new THREE.AmbientLight(0xffffff, 0.15))

  // materiais
  const alu = new THREE.MeshStandardMaterial({ color: 0x7c7d80, metalness: 0.9, roughness: 0.3, envMapIntensity: 1.0 })
  const aluDark = new THREE.MeshStandardMaterial({ color: 0x4c4e52, metalness: 0.8, roughness: 0.4 })
  const black = new THREE.MeshBasicMaterial({ color: 0x030304 })
  const kbMat = new THREE.MeshBasicMaterial({ map: keyboardTexture(), toneMapped: false })
  const padMat = new THREE.MeshStandardMaterial({ color: 0x6d6e72, metalness: 0.75, roughness: 0.18 })
  const screenMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false })

  // modelo
  const laptop = new THREE.Group()
  const pivot = new THREE.Group() // gira o conjunto em volta do centro
  pivot.add(laptop)
  scene.add(pivot)
  laptop.position.set(0, -0.55, 0.15)
  pivot.position.set(0, 0.55, 0)

  const base = new THREE.Mesh(slab(W, D, TB, 0.16, 0.022), alu)
  laptop.add(base)

  // entalhe da frente (para abrir com o dedo)
  const notchFront = new THREE.Mesh(new THREE.BoxGeometry(0.42, 0.02, 0.02), aluDark)
  notchFront.position.set(0, TB - 0.012, D / 2 - 0.004)
  laptop.add(notchFront)

  const kb = new THREE.Mesh(roundedPlane(2.62, 0.98, 0.04), kbMat)
  kb.rotation.x = -Math.PI / 2
  kb.position.set(0, TB + 0.001, -0.33)
  laptop.add(kb)
  // grades dos alto-falantes
  for (const sx of [-1, 1]) {
    const sp = new THREE.Mesh(roundedPlane(0.09, 0.95, 0.03), new THREE.MeshBasicMaterial({ color: 0x3c3d40 }))
    sp.rotation.x = -Math.PI / 2
    sp.position.set(sx * 1.4, TB + 0.0008, -0.33)
    laptop.add(sp)
  }
  const pad = new THREE.Mesh(roundedPlane(1.32, 0.78, 0.06), padMat)
  pad.rotation.x = -Math.PI / 2
  pad.position.set(0, TB + 0.001, 0.52)
  laptop.add(pad)

  // tampa (gira na dobradiça, no fundo da base)
  const hinge = new THREE.Group()
  hinge.position.set(0, TB + 0.006, -D / 2 + 0.02)
  laptop.add(hinge)
  const lid = new THREE.Mesh(slab(W, DL, TL, 0.16, 0.014), alu)
  lid.position.set(0, 0, DL / 2)
  hinge.add(lid)
  // a tela fica embaixo da tampa (virada para a base quando fechada)
  const bezel = new THREE.Mesh(roundedPlane(W - 0.03, DL - 0.03, 0.15), black)
  bezel.rotation.x = Math.PI / 2
  bezel.position.set(0, -0.0015, DL / 2)
  hinge.add(bezel)
  const SW = W - 0.17
  const SH = DL - 0.2
  const screen = new THREE.Mesh(new THREE.PlaneGeometry(SW, SH), screenMat)
  screen.rotation.x = Math.PI / 2
  screen.position.set(0, -0.003, DL / 2 + 0.035)
  hinge.add(screen)
  // notch da câmera
  const notch = new THREE.Mesh(roundedPlane(0.34, 0.09, 0.03), black)
  notch.position.set(0, SH / 2 - 0.035, 0.001)
  screen.add(notch)
  // dobradiça escura
  const hingeBar = new THREE.Mesh(new THREE.CylinderGeometry(0.035, 0.035, W - 0.5, 20), aluDark)
  hingeBar.rotation.z = Math.PI / 2
  hingeBar.position.set(0, -0.01, -0.01)
  hinge.add(hingeBar)

  // texturas dos projetos (cortadas para preencher a tela, como "cover")
  const loader = new THREE.TextureLoader()
  const screenAspect = SW / SH
  const textures: (THREE.Texture | null)[] = images.map(() => null)
  const load = (i: number) =>
    new Promise<THREE.Texture>((res) => {
      if (textures[i]) return res(textures[i]!)
      loader.load(images[i], (t) => {
        t.colorSpace = THREE.SRGBColorSpace
        t.anisotropy = renderer.capabilities.getMaxAnisotropy()
        const img = t.image as HTMLImageElement
        const a = img.width / img.height
        if (a > screenAspect) {
          const r = screenAspect / a
          t.repeat.set(r, 1)
          t.offset.set((1 - r) / 2, 0)
        } else {
          const r = a / screenAspect
          t.repeat.set(1, r)
          t.offset.set(0, 1 - r)
        }
        textures[i] = t
        res(t)
      })
    })
  let current = 0
  const show = async (i: number) => {
    const t = await load(i)
    screenMat.map = t
    screenMat.needsUpdate = true
    opts.onSlide(i)
    load((i + 1) % images.length)
  }

  // tamanho
  const resize = () => {
    const w = canvas.clientWidth
    const h = canvas.clientHeight
    if (!w || !h) return
    renderer.setSize(w, h, false)
    camera.aspect = w / h
    // em telas estreitas, afasta a câmera para caber o notebook girando
    const fit = Math.max(1, 1.25 / camera.aspect)
    camera.position.set(0, 2.9 * fit, 7.0 * fit)
    camera.lookAt(0, 0.62, 0)
    camera.updateProjectionMatrix()
  }
  const ro = new ResizeObserver(resize)
  ro.observe(canvas)
  resize()

  const apply = (p: Pose, lidAngle: number) => {
    pivot.rotation.set(p.pitch, p.yaw, p.roll, 'YXZ')
    hinge.rotation.x = -lidAngle
  }

  // linha do tempo de cada ciclo (segundos)
  const T_ROT = 1.0 // gira fechado
  const T_OPEN = 1.25 // abre
  const T_HOLD = 3.4 // mostra o site
  const T_CLOSE = 1.0 // fecha
  const CYCLE = T_ROT + T_OPEN + T_HOLD + T_CLOSE

  let raf = 0
  let visible = true
  let last = performance.now()
  let clock = 0
  let shownFor = -1

  const frame = (now: number) => {
    raf = requestAnimationFrame(frame)
    const dt = Math.max(0, Math.min(0.25, (now - last) / 1000))
    last = now
    if (!visible) return
    clock += dt

    const n = Math.floor(clock / CYCLE)
    const i = n % images.length
    const k = n % CLOSED.length
    const prevClosed = CLOSED[(k + CLOSED.length - 1) % CLOSED.length]
    const p = clock - n * CYCLE

    if (shownFor !== n) {
      shownFor = n
      current = i
      show(current)
    }

    let pose: Pose
    let lidA = 0
    if (p < T_ROT) {
      pose = lerpPose(n === 0 ? CLOSED[k] : prevClosed, CLOSED[k], easeInOut(clamp01(p / T_ROT)))
    } else if (p < T_ROT + T_OPEN) {
      const t = clamp01((p - T_ROT) / T_OPEN)
      pose = lerpPose(CLOSED[k], FRONT[k], easeInOut(t))
      lidA = OPEN * easeOut(clamp01(t * 1.15))
    } else if (p < T_ROT + T_OPEN + T_HOLD) {
      const t = p - T_ROT - T_OPEN
      pose = { ...FRONT[k], yaw: FRONT[k].yaw + Math.sin(t * 0.9) * 0.06 }
      lidA = OPEN
    } else {
      const t = clamp01((p - T_ROT - T_OPEN - T_HOLD) / T_CLOSE)
      const from = { ...FRONT[k], yaw: FRONT[k].yaw + Math.sin(T_HOLD * 0.9) * 0.06 }
      pose = lerpPose(from, CLOSED[(k + 1) % CLOSED.length], easeInOut(t) * 0.35)
      lidA = OPEN * (1 - easeInOut(t))
    }
    apply(pose, lidA)
    renderer.render(scene, camera)
  }

  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting))
  io.observe(canvas)

  if (opts.reduced) {
    show(0).then(() => {
      apply(FRONT[0], OPEN)
      renderer.render(scene, camera)
    })
    const rerender = () => renderer.render(scene, camera)
    ro.disconnect()
    new ResizeObserver(() => {
      resize()
      rerender()
    }).observe(canvas)
  } else {
    raf = requestAnimationFrame(frame)
  }

  return {
    destroy() {
      cancelAnimationFrame(raf)
      ro.disconnect()
      io.disconnect()
      textures.forEach((t) => t?.dispose())
      envTex.dispose()
      pmrem.dispose()
      renderer.dispose()
    },
  }
}
