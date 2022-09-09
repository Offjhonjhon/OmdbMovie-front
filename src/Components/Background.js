import { Children } from 'react/cjs/react.production.min';
import styled from 'styled-components';


const Background = ({children}) => {
  return (
    <BackgroundWrapper>
        {children}
    </BackgroundWrapper>
  )
}

export default Background

const BackgroundWrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100vw;
    height: 100vh;
    background-color: #404254;
    overflow: scroll;
`