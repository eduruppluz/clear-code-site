import { useRef } from 'react'
import { motion, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from 'motion/react'
import type { Project } from '../../config/projects'
import { useFinePointer } from '../../hooks/useMediaQuery'

/**
 * Mockup do projeto: janela de navegador com o print real.
 * Parallax leve no scroll + giro de poucos graus seguindo o mouse.
 * Se houver print mobile, um celular entra sobreposto.
 */
export function ProjectMockup({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduce = useReducedMotion()
  const fine = useFinePointer()
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const rx = useSpring(useTransform(my, [-0.5, 0.5], [4, -4]), { stiffness: 120, damping: 18 })
  const ry = useSpring(useTransform(mx, [-0.5, 0.5], [-6, 6]), { stiffness: 120, damping: 18 })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [40, -40])
  const phoneY = useTransform(scrollYProgress, [0, 1], reduce ? [0, 0] : [90, -70])
  const host = project.url.replace(/^https?:\/\//, '').replace(/\/.*$/, '')

  return (
    <div
      ref={ref}
      className="relative [perspective:1400px]"
      onPointerMove={(e) => {
        if (!fine || reduce || !ref.current) return
        const r = ref.current.getBoundingClientRect()
        mx.set((e.clientX - r.left) / r.width - 0.5)
        my.set((e.clientY - r.top) / r.height - 0.5)
      }}
      onPointerLeave={() => { mx.set(0); my.set(0) }}
    >
      <div aria-hidden="true" className="absolute inset-x-[10%] -bottom-10 top-[20%] rounded-full blur-3xl" style={{ background: 'color-mix(in oklab, var(--accent-a) 28%, transparent)' }} />
      <motion.figure style={{ y, rotateX: rx, rotateY: ry }} className="relative overflow-hidden rounded-xl border border-white/10 bg-[#030c17] shadow-[0_40px_100px_-40px_rgb(0_0_0/0.9)] sm:rounded-2xl">
        <div className="flex items-center gap-2 border-b border-white/[0.07] px-3 py-2.5 sm:px-4">
          <span className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="size-2 rounded-full bg-white/20" />)}</span>
          <span className="mx-auto flex max-w-xs flex-1 items-center justify-center gap-1.5 rounded-full bg-white/[0.06] px-3 py-1 text-[0.65rem] text-white/50 sm:text-xs">
            <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="1.6"><rect x="3.5" y="7" width="9" height="6.5" rx="1.5" /><path d="M5.5 7V5a2.5 2.5 0 0 1 5 0v2" /></svg>
            {host}
          </span>
          <span className="w-10" />
        </div>
        <img src={project.images.desktop} alt={project.images.desktopAlt} loading="lazy" decoding="async" className="block w-full" width={1885} height={882} />
        <figcaption className="sr-only">{project.images.desktopAlt}</figcaption>
      </motion.figure>

      {project.images.mobile && (
        <motion.div style={{ y: phoneY }} className="absolute -bottom-8 right-[-4%] w-[26%] overflow-hidden rounded-[1.6rem] border-[5px] border-[#0b1626] bg-black shadow-[0_30px_70px_-20px_rgb(0_0_0/0.9)]">
          <img src={project.images.mobile} alt={project.images.mobileAlt ?? ''} loading="lazy" decoding="async" className="block w-full" />
        </motion.div>
      )}
    </div>
  )
}
