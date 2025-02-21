import { keyframes, SerializedStyles } from '@emotion/react';
import styled from '@emotion/styled';

const spin: SerializedStyles = keyframes({
  '0%': { transform: 'rotate(0deg)' },
  '100%': { transform: 'rotate(360deg)' },
});

const Spinner = styled.div(({ theme }) => ({
  border: '4px solid rgba(0, 0, 0, 0.1)',
  borderTop: `4px solid ${theme.palette.primary.main}`,
  borderRadius: '50%',
  width: '40px',
  height: '40px',
  animation: `${spin} 1s linear infinite`,
}));

const LoaderContainer = styled.div({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: '60px',
});

const Loading = () => (
  <LoaderContainer>
    <Spinner />
  </LoaderContainer>
);

export default Loading;