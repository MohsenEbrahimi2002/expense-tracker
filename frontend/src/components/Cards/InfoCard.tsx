import type { ReactNode } from "react";

type InfoCardProps = {
  icon: ReactNode;
  label: string;
  value: string | number;
  color?: string;
};

function InfoCard({icon,label,value,color}: InfoCardProps) {
  return <div>InfoCard</div>;
}

export default InfoCard;
