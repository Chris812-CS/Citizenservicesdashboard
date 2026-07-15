import { Heart, Shield } from 'lucide-react';
import { SaraWalletCard } from './SaraWalletCard';
import { MyJpjCard } from './MyJpjCard';
import { HealthcareCard } from './HealthcareCard';

interface CoreServiceCardsProps {
  language: 'BM' | 'EN';
}

export function CoreServiceCards({ language }: CoreServiceCardsProps) {
  return (
    <div className="px-6 pb-5 lg:px-0" style={{ fontFamily: 'Poppins, sans-serif' }}>
      {/* Mobile: Horizontal scrollable row / Desktop: 3-column grid */}
      <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide lg:grid lg:grid-cols-3 lg:overflow-visible">
        {/* Card 1: SARA Wallet — redesigned */}
        <SaraWalletCard language={language} />

        {/* Card 2: MyJPJ Vehicle — redesigned */}
        <MyJpjCard language={language} />

        {/* Card 3: Healthcare — redesigned */}
        <HealthcareCard language={language} />
      </div>
    </div>
  );
}