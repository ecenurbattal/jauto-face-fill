import styled from 'styled-components';

export const Camera = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export const Wrapper = styled.div`
    width: ${(props) => props.width};
    height: ${(props) => props.height};
`;

export const WebcamWrapper = styled.div`
    position:relative;
    width: ${(props) => props.width};
`;

export const DetectionDrawWrapper = styled.div`
    position:absolute;
`;

export const DetectionBox = styled.div`
    position: absolute;
    border: solid;
    border-color: blue;
    height: ${(props) => props.height};
    width: ${(props) => props.width};
    transform: translate(${(props) => props.x}px,${(props) => props.x}px);
`;

export const Label = styled.p`
    background-color: blue;
    border: solid;
    border-color: blue;
    width: ${(props) => props._W};
    margin-top: 0;
    color: #fff;
    transform: translate(-3px,${(props) => props._H}px);
`;