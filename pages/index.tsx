import styled from "styled-components"
import { AnimatePresence, motion, useAnimationControls } from "framer-motion"
import Stars from "@/c/GlowingButton/Stars"
import Intro from "@/c/GlowingButton/Intro"
import Browser from "@/c/GlowingButton/Browser"
import { useEffect, useState } from "react"
import NormalButton from "./Normal"
import Loader from "./Loader"
import Special from "./Special"
import Credits from "@/c/GlowingButton/Credits"

const BACKGROUNDS = [
  "#020308",
  "#010609",
  "#0B020D",
  "#090401",
  "#010902"
]

const Container = styled.div<{bg: string}>`
  width: 100vw;
  height: 100vh;
  background: radial-gradient(63.94% 63.94% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%), ${p => p.bg};
  transition: 1s all;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Content = styled.div`
  display: flex;
  gap: 32px;
`

const Notice = styled.div`
  width: 330px;
  height: 40px;
  padding: 6px 16px;
  background: radial-gradient(63.94% 63.94% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%), rgba(255, 255, 255, 0.01);
  backdrop-filter: blur(6px);
  border-radius: 6px;
  position: absolute;
  font-family: "Inter";
  bottom: 40px;
  font-size: 14px;
  text-align: center;
  line-height: 24px;

  span {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 8.85%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }


  &:before {
    content: "";
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    border-radius: 6px;
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 74.04%),
    linear-gradient(0deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.04));
    position: absolute;
    top: -1px;
    left: -1px;
    mask: url("data:image/svg+xml,%3Csvg width='330' height='42' viewBox='0 0 330 42' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='329' height='42' rx='9.5' stroke='black'/%3E%3C/svg%3E%0A");
    mask-repeat: no-repeat;
    mask-mode: alpha;
    pointer-events: none;
  }
`

enum ActiveTab {
  'Normal' = 1,
  'Loader' = 2,
  'Special' = 3
}

const variants = {
  hidden: { opacity: 0, y: 15 },
  open: { 
    opacity: 1,
    y: 0,
    transition: {
      duration: .5,
      staggerChildren: 0.1
    } 
  },
  out: {
    opacity: 0,
    y: 15,
    transition: {
      duration: .2,
      staggerChildren: 0.1,
      when: "afterChildren"
    },
  }
}

export default function GlowingButton() {
  const [ activeTab, setActiveTab ] = useState(ActiveTab.Normal)
  const [ bg, setBg ] = useState(0)
  const [ show, setShow ] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, 200)
  }, [])

  setTimeout(() => {
    const newBg = bg < BACKGROUNDS.length -1 ? bg + 1 : 0 

    setBg(newBg)
  }, 10000)

  return (
    <Container bg={BACKGROUNDS[bg]}>
      <Stars />
      <Intro />
      
      <motion.div animate={{ opacity: show ? 1 : .3}}>
        <Browser m="116px 0 0 0" onActiveTabChange={(activeIndex) => setActiveTab(activeIndex)}>
          <AnimatePresence exitBeforeEnter={true}>

            {activeTab === 1 && 
              <Content 
                as={motion.div}
                key={ActiveTab.Normal}
                variants={variants}
                initial="hidden"
                animate="open"
                exit="out"
              >
                <NormalButton />
                <NormalButton noStar />
              </Content>
            }

            {activeTab === 2 && 
              <Content 
                as={motion.div}
                key={ActiveTab.Loader}
                variants={variants}
                initial="hidden"
                animate="open"
                exit="out"
              >
                <Loader />
                <Loader noBorder />
              </Content>
            }
            
            {activeTab === 3 && 
              <Content 
                as={motion.div}
                key={ActiveTab.Special}
                variants={variants}
                initial="hidden"
                animate="open"
                exit="out"
              >
                <Special />
              </Content>
            }

          </AnimatePresence>
        </Browser>
      </motion.div>

      <Credits />

      <Notice
        as={motion.div}
        initial={{ opacity: 0, y: 100 }}
        animate={ activeTab === 3 ? {
          opacity: 1,
          y: 0
        } : {
          opacity: 0,
          y: 100
        }}
        transition={{
          duration: .6
        }}
      >
        <span>Move away your cursor to see the magic ✨</span>
      </Notice> 
    </Container>
  )
}