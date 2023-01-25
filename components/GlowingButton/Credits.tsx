import styled from "styled-components"

const Wrapper = styled.div`
  display: flex;
  gap: 40px;
  justify-content: center;
  align-items: center;
  margin-top: 132px;
`

const MiddleLine = styled.div`
  width: 1px;
  height: 48px;
  background-image: url("data:image/svg+xml,%3Csvg width='1' height='48' viewBox='0 0 1 48' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Cline x1='0.5' y1='2.18557e-08' x2='0.499998' y2='48' stroke='url(%23paint0_radial_1_187)' stroke-opacity='0.1'/%3E%3Cdefs%3E%3CradialGradient id='paint0_radial_1_187' cx='0' cy='0' r='1' gradientUnits='userSpaceOnUse' gradientTransform='translate(-3.4969e-07 24) rotate(90) scale(24 16)'%3E%3Cstop offset='0.235042' stop-color='white'/%3E%3Cstop offset='1' stop-color='white' stop-opacity='0'/%3E%3C/radialGradient%3E%3C/defs%3E%3C/svg%3E%0A");
`

const Item = styled.a`
  padding: 12px 16px;
  border-radius: 10px;
  width: 210px;
  height: 72px;
  display: flex;
  gap: 16px;
  align-items: center;
  position: relative;
  background: radial-gradient(46.41% 74.04% at 50% 0%, rgba(255, 255, 255, 0) 0%, rgba(255, 255, 255, 0) 100%);
  transition: 1s all;

  &:before {
    content: "";
    width: calc(100% + 2px);
    height: calc(100% + 2px);
    border-radius: 10px;
    background: radial-gradient(46.41% 74.04% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%);
    position: absolute;
    top: -1px;
    left: -1px;
    mask: url("data:image/svg+xml,%3Csvg width='210' height='72' viewBox='0 0 210 72' fill='none' xmlns='http://www.w3.org/2000/svg'%3E%3Crect x='0.5' y='0.5' width='209' height='72' rx='9.5' stroke='black'/%3E%3C/svg%3E%0A");
    mask-repeat: no-repeat;
    mask-mode: alpha;
    pointer-events: none;
  }

  &:hover {
    background: radial-gradient(46.41% 74.04% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%);

    :before {
      background: radial-gradient(46.41% 74.04% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%),
      radial-gradient(50% 100% at 50% 0%, rgba(255, 255, 255, 0.12) 0%, rgba(255, 255, 255, 0) 100%),
      linear-gradient(0deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.06)),
      linear-gradient(0deg, rgba(255, 255, 255, 0.01), rgba(255, 255, 255, 0.01));
    }
  }
  
  
  p {
    &:first-child {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: -0.02em;
      background: linear-gradient(180deg, rgba(255, 255, 255, 0.72) 8.85%, #FFFFFF 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      text-fill-color: transparent;
    }
    &:last-child {
      font-family: 'Inter';
      font-style: normal;
      font-weight: 400;
      font-size: 14px;
      line-height: 24px;
      letter-spacing: -0.02em;
      color: rgba(255, 255, 255, 0.5);
    }
  }
`

export default function Credits() {

  return (
    <Wrapper>
      <Item href="https://twitter.com/oguzyagizkara" target="_blank">
        <img src="/oguz_pp.png" width={48} />
        <div>
          <p>Design</p>
          <p>@oguzyagizkara</p>
        </div>
      </Item> 
      <MiddleLine />
      <Item href="https://twitter.com/nusualabuga" target="_blank">
        <img src="/nusu_pp.png" width={48} />
        <div>
          <p>Code</p>
          <p>@nusualabuga</p>
        </div>
      </Item> 
    </Wrapper>
  )
}