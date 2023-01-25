import styled from "styled-components"

const H1 = styled.h1`
  font-family: "Inter";
  font-weight: 400;
  font-size: 40px;
  line-height: 48px;
  /* identical to box height, or 120% */

  text-align: center;

  background: radial-gradient(123.44% 123.44% at 56.63% 100%, #ECECEE 6.77%, rgba(255, 255, 255, 0.45) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;

`

const P = styled.p`
  font-family: 'Inter V', 'Inter';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 32px;
  /* identical to box height, or 160% */

  text-align: center;
  letter-spacing: -0.01em;

  background: radial-gradient(123.44% 123.44% at 56.63% 100%, rgba(236, 236, 238, 0.5) 6.77%, rgba(255, 255, 255, 0.225) 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-fill-color: transparent;
`

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`

export default function Intro() {
  return (
    <Wrapper>
      <H1>Glowing Button.</H1>
      <P>A magical button, interact with it.</P>
    </Wrapper>
  )
}