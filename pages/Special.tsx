import { animate, motion, useAnimationControls, useMotionValue } from "framer-motion";
import createSVGMask from "lib/createSVGMask";
import useElementSize from "lib/useElementSize";
import { useEffect, useRef, useState } from "react";
import styled, { keyframes } from "styled-components";

const buttonHover = keyframes`
  to {
    --radialWidth: 120%;
    --radialLength: 85%;
  }
`

const buttonHoverOut = keyframes`
  from {
    --radialWidth: 120%;
    --radialLength: 85%;
  }
  to {
    --radialWidth: 40%;
    --radialLength: 10%;
  }
`

const ButtonWrapper = styled.div`
  position: relative;
  overflow: hidden;
  border-radius: 999px;
  padding: 2px 2px;

  @property --border-angle {
    syntax: "<angle>";
    initial-value: 0turn;
    inherits: false;
  }

  @property --position {
    syntax: "<percentage>";
    initial-value: 20%;
    inherits: false;
  }

  @property --radialWidth {
    syntax: "<percentage>";
    initial-value: 60%;
    inherits: false;
  }

  @property --radialLength {
    syntax: "<percentage>";
    initial-value: 10%;
    inherits: false;
  }
`

const Button = styled.button`
  --radialWidth: 40%;
  --radialLength: 10%;

  position: relative;
  font-family: "Inter";
  box-sizing: border-box;
  font-size: 14px;
  line-height: 24px;
  padding: 8px 16px;
  border: none;
  stroke: 0;
  -webkit-appearance: none;
  /* make this black if you want to rotating conic gradient */
  background-color: transparent;
  border-radius: 999px;
  cursor: pointer;
  /* opacity: .5; */
  &:before {
    content: "";
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    position: absolute;
    top: -2px;
    left: -2px;
    border-radius: 999px;
    border: 1px solid rgba(255, 255, 255, 0.1);
  }
  
  &:after {
    content: "";
    width: calc(100% + 4px);
    height: calc(100% + 4px);
    position: absolute;
    left: -2px;
    top: -2px;
    opacity: 0;
    background: radial-gradient(var(--radialLength) var(--radialWidth) at 50% 120%, rgba(255, 255, 255, 0.24) 0%, rgba(255, 255, 255, 0) 100%);

    transition: 1s all;
    border-radius: 999px;
    animation: .4s ${buttonHoverOut} forwards;
  }
  
  &:hover { 
    &:after {
      content: "";
      opacity: .7;
      animation: .4s ${buttonHover} forwards;
    }
  }

  span {
    background: linear-gradient(180deg, rgba(255, 255, 255, 0.3) 8.85%, #FFFFFF 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
    text-fill-color: transparent;
  }
`

const Border = styled.div<{size: number, buttonWidth: number, buttonHeight: number}>`
  --border-size: 15px;
  --border-angle: 0turn;
  pointer-events: none;
  background-image: 
      conic-gradient(
        from var(--border-angle) at 50% 50%,
        rgba(255, 255, 255, 0.5) 0deg, rgba(255, 255, 255, 0) 60deg, rgba(255, 255, 255, 0) 310deg, rgba(255, 255, 255, 0.5) 360deg);
  background-size: calc(100% - (var(--border-size) * 2))
      calc(100% - (var(--border-size) * 2)), 
      cover;
  position: absolute;
  bottom: calc(50% - ${p => p.size / 2}px);
  left: calc(50% - ${p => p.size / 2}px);
  /* it should be square */
  width: ${p => p.size}px;
  height: ${p => p.size}px;
  background-position: center center;
  background-repeat: no-repeat;
  
  mask: url(${p => createSVGMask(p.buttonWidth + 4, p.buttonHeight + 4)});
  mask-size: ${p => p.buttonWidth + 4}px ${p => p.buttonHeight + 4}px;
  mask-position: center center;
  mask-repeat: no-repeat;
  mask-mode: alpha;
`

const Glow = styled(Border)`
  filter: blur(8px);
  opacity: .15;
  z-index: 5;
  mask: none;
`

const Stars = styled(Border)`
  mask: url("data:image/svg+xml,%3Csvg width='28' height='24' viewBox='0 0 28 24' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M14.0534 15.732C13.8444 15.283 14.2848 14.8489 14.7326 15.051C14.8296 15.0959 14.9043 15.1707 14.949 15.268C15.1506 15.717 14.7177 16.1511 14.2698 15.949C14.1728 15.9041 14.0982 15.8293 14.0534 15.732Z' fill='black'/%3E%3Cpath d='M18.8001 13.5093C19.0016 13.0603 18.5687 12.6263 18.1209 12.8283C18.0239 12.8732 17.9492 12.9481 17.9045 13.0453C17.6955 13.4944 18.1358 13.9284 18.5837 13.7264C18.6807 13.6815 18.7553 13.6066 18.8001 13.5093Z' fill='black'/%3E%3Cpath d='M0.949043 2.732C1.15057 2.28297 0.717663 1.84891 0.269836 2.05097C0.172806 2.09587 0.098162 2.17071 0.0533793 2.268C-0.155607 2.71703 0.284759 3.15109 0.732587 2.94903C0.829616 2.90413 0.90426 2.82929 0.949043 2.732Z' fill='black'/%3E%3Cpath d='M26.9489 7.732C27.151 7.28297 26.7169 6.84891 26.2679 7.05097C26.1706 7.09587 26.0958 7.17071 26.0508 7.268C25.8488 7.71703 26.2828 8.15109 26.7319 7.94903C26.8292 7.90413 26.904 7.82929 26.9489 7.732Z' fill='black'/%3E%3Cpath d='M13.0534 5.732C12.8444 5.28297 13.2848 4.84891 13.7326 5.05097C13.8296 5.09587 13.9043 5.17071 13.949 5.268C14.1506 5.71703 13.7177 6.15109 13.2698 5.94903C13.1728 5.90413 13.0982 5.82929 13.0534 5.732Z' fill='black'/%3E%3Cpath d='M10.0534 17.732C9.84439 17.283 10.2848 16.8489 10.7326 17.051C10.8296 17.0959 10.9043 17.1707 10.949 17.268C11.1506 17.717 10.7177 18.1511 10.2698 17.949C10.1728 17.9041 10.0982 17.8293 10.0534 17.732Z' fill='black'/%3E%3Cpath d='M15.0534 21.732C14.8444 21.283 15.2848 20.8489 15.7326 21.051C15.8296 21.0959 15.9043 21.1707 15.949 21.268C16.1506 21.717 15.7177 22.1511 15.2698 21.949C15.1728 21.9041 15.0982 21.8293 15.0534 21.732Z' fill='black'/%3E%3C/svg%3E%0A");
  mask-size: auto;
  mask-repeat: repeat;
`

interface Props {
  noStar?: boolean
}

export default function GradientButton(props: Props) {
  const controls = useAnimationControls()
  const turn = useMotionValue('0turn')
  const [ duration, setDuration ] = useState(6)
  const [buttonRef, { width, height }] = useElementSize()

  useEffect(() => {
    const remaining = Number(turn.get().split('turn')[0])
    // THIS WILL ONLY WORK WITH LINEAR EASINGS
    const calculated = duration * (1 - remaining)
    // if the turn has been completed start with 0
    const currentTurn = turn.get() === '1turn'? '0turn': turn.get()

    controls.stop()
    animate(turn, [currentTurn, '1turn'], {
      duration: calculated || duration,
      ease: "linear",
      onComplete() {
        prepareNextAnimation()
      },
    })
    return controls.stop
  }, [duration])

  function prepareNextAnimation(){
    animate(turn, ['0turn', '1turn'], {
      duration: duration,
      ease: "linear",
      repeat: Infinity
    })
  }

  const target = useRef<null | HTMLDivElement>(null)

  function calculateSpeed(x:number, y:number, maxSpeed = 6, minSpeed = 0.6) {
    // Pythagorean
    const distance = Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
    const speed = maxSpeed - ((distance / (window.innerWidth / 3)) * (maxSpeed - minSpeed));
    return Math.max(Math.min(speed, maxSpeed), minSpeed);
  }

  function generateSquareMask() {
    const dimensions = width + 50 // safe distance
    
    return dimensions
  }

  useEffect(() => {
    const handleMouseMove = (event: any) => {
      if(target.current){
        const rect = target.current.getBoundingClientRect()

        const relativeX = event.clientX - rect.x
        const relativeY = event.clientY - rect.y

        setDuration(calculateSpeed(relativeX, relativeY))
      }
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener(
        'mousemove',
        handleMouseMove
      );
    };
  }, [target]);

  return(
    <div ref={target}>
      <ButtonWrapper>
        <Border 
          as={motion.div}
          animate={controls}
          style={{'--border-angle': turn} as any}
          size={generateSquareMask()}
          buttonWidth={width}
          buttonHeight={height}
        />
        <Glow 
          as={motion.div}
          animate={controls}
          style={{'--border-angle': turn} as any} 
          size={generateSquareMask()}
          buttonWidth={width}
          buttonHeight={height}
        />
        { !props.noStar && 
          <Stars 
            as={motion.div}
            animate={controls}
            style={{'--border-angle': turn} as any} 
            size={generateSquareMask()}
            buttonWidth={width}
            buttonHeight={height}
          />
        }
        <Button ref={buttonRef}>
          <span>
            Button
          </span>
        </Button>
      </ButtonWrapper>
    </div>
  )
}