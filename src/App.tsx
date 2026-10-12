import type { ComponentProps } from 'react'
import { createRoot } from 'react-dom/client'
import { FlowingGradient, Shader } from 'shaders/react'
import { GlassPanel } from './components/GlassPanel/GlassPanel'
import './global.css'
import { Logo } from './components/Logo/Logo'

function Link(props: ComponentProps<'a'>) {
  return <a target='_blank' rel='noopener noreferrer nofollow' {...props} />
}

function App() {
  return (
    <Shader className='scene'>
      <FlowingGradient
        colorA='#e34c26'
        colorB='#3261ae'
        colorC='#000000'
        colorD='#000000'
        colorSpace='oklch'
        speed={0.5}
        distortion={0.5}
        seed={40}
      />
      <GlassPanel>
        <Logo size={500} />
        <main className='intro'>
          <p>
            Hey, I’m <strong>Navinn</strong>
            {'. '}
            <span className='pronunciation'>(/nɜvɪn/)</span>
          </p>
          <p>
            {
              "I'm a Software Engineer based in New York City, originally from Toronto. I currently work at"
            }{' '}
            <Link href='https://stripe.com'>Stripe</Link>, and previously at{' '}
            <Link href='https://www.meta.com'>Meta</Link>.
          </p>
          <p>
            I graduated from the <Link href='https://www.utoronto.ca/'>University of Toronto</Link>
            {' in 2024 with a degree in Computer Science.'}
          </p>
          <nav>
            <Link href='/resume'>Resume</Link>
            <Link href='https://github.com/navn-r'>GitHub</Link>
            <Link href='https://linkedin.com/in/navn-r'>LinkedIn</Link>
            <Link href='mailto:me@navn.me'>Email</Link>
            <Link href='/notes'>Course Notes</Link>
          </nav>
        </main>
      </GlassPanel>
    </Shader>
  )
}

createRoot(document.getElementById('root')!).render(<App />)
