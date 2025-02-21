import styled from "@emotion/styled";

interface CustomProps extends React.HTMLAttributes<HTMLDivElement> { }

const Box = styled.div(({ }: CustomProps) => ({}));
export default Box;