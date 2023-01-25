import styled from "styled-components"
import { motion } from 'framer-motion'

const Wrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  mask: url('/stars.svg');
  overflow: hidden;
  pointer-events: none;
`

const Gradient = styled.div`
  width: 40vw;
  height: 40vw;
  background: radial-gradient(50% 50% at 50% 50%, #000000 24.68%, #FFFFFF 41.49%, #000000 50%, #000000 72.92%, #FFFFFF 89.06%, #000000 96.88%);
  border-radius: 999px;
  position: absolute;
  left: calc(50% - 20vw);
  top: 5vw;
`

export default function Stars() {
  return (
    <Wrapper>
      <Gradient as={motion.div} 
        animate={{ scale: [1, 3] }}
        transition={{ repeat: Infinity, originX: 1, originY: 0, duration: 10, repeatType: "mirror" }}
      />
    </Wrapper>
  )
}