import {getTranslations, setRequestLocale} from 'next-intl/server';

import AboutSection from '@/components/site/home/about-section';
import ApproachSection from '@/components/site/home/approach-section';
import ContactSection from '@/components/site/home/contact-section';
import HeroSection from '@/components/site/home/hero-section';
import HomeMotion from '@/components/site/home/home-motion';
import KnowledgeSection from '@/components/site/home/knowledge-section';
import ServicesSection from '@/components/site/home/services-section';
import {siteConfig} from '@/config/site';

export default async function HomePage({params}) {
  const {locale} = await params;
  setRequestLocale(locale);

  const navigation = await getTranslations('Navigation');
  const whatsappUrl = `https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
    navigation('whatsappMessage')
  )}`;

  return (
    <div className="overflow-clip">
      <HomeMotion />
      <HeroSection />
      <ServicesSection />
      <ApproachSection />
      <AboutSection />
      <KnowledgeSection />
      <ContactSection whatsappUrl={whatsappUrl} />
    </div>
  );
}
