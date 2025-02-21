import styled from "@emotion/styled";
import { ReactNode } from "react";

export interface PaperProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'outline' | 'default';
  elevation?: number;
  children?: ReactNode;
}

const Paper = styled(({ variant = 'default', elevation = 0, children, ...props }: PaperProps) => (
  <div {...props}>{children}</div>
))<PaperProps>(({ theme, variant, elevation }) => ({
  borderWidth: variant === 'outline' ? 1 : 0, // Define o borderRadius baseado na variante
  borderStyle: "solid",
  borderColor: theme.palette.divider,
  borderRadius: 8,
  boxShadow: elevation
    ? `0px ${elevation}px ${elevation * 2}px rgba(0, 0, 0, 0.1)` // Adiciona sombra com base no nível de elevação
    : 'none', // Sem sombra se não houver elevação

  padding: theme.spacing.small, // Exemplo: Define o preenchimento com base no tema

  // Outros estilos podem ser adicionados conforme necessário
}));

export default Paper;