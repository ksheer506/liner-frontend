import { ReactNode } from "react";

interface ExternalLinkProps {
  link: string;
  children: ReactNode;
}

export const ExternalLink = ({ link, children }: ExternalLinkProps) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      {children}
    </a>
  );
};
