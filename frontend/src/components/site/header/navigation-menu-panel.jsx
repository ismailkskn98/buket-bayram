import Image from 'next/image';

import {Link} from '@/i18n/navigation';

import LocaleSwitcher from './locale-switcher';
import MenuTrigger from './menu-trigger';

export default function NavigationMenuPanel({
  contentRef,
  currentLocale,
  firstLinkRef,
  groups,
  handleNavigate,
  isOpen,
  labels,
  menuOverlayRef,
  onClose,
  onServicePreview,
  previewStack,
  services,
  items,
  whatsappUrl
}) {
  return (
    <div
      ref={menuOverlayRef}
      id="site-navigation-menu"
      role="dialog"
      aria-label={labels.menu}
      aria-modal={isOpen ? true : undefined}
      aria-hidden={!isOpen}
      className="siteMenuOverlay"
    >
      <div ref={contentRef} className="siteMenuContent">
        <div className="siteMenuInner">
          <div className="siteMenuTopbar">
            <Link
              href="/"
              onClick={handleNavigate}
              tabIndex={isOpen ? 0 : -1}
              className="inline-flex"
            >
              <Image
                src="/images/logo/logo-beyaz-yatay.webp"
                alt="BB Clinic"
                width={401}
                height={81}
                sizes="(max-width: 639px) 10rem, 12rem"
                className="siteMenuLogo"
              />
            </Link>

            <MenuTrigger
              controls="site-navigation-menu"
              isOpen
              label={labels.close}
              onClick={onClose}
              className="siteMenuOverlayClose xl:!hidden"
            />
          </div>

          <div className="siteMenuBody">
            <div className="siteMenuPreview" aria-hidden="true">
              <div className="siteMenuPreviewFrame">
                {previewStack.map((serviceKey) => {
                  const service = services.find(
                    (currentService) => currentService.key === serviceKey
                  );

                  return (
                    <div key={serviceKey} className="siteMenuPreviewLayer">
                      <Image
                        src={service.image}
                        alt=""
                        fill
                        sizes="(min-width: 1280px) 30vw, 1px"
                        className={`object-cover ${service.imageClassName}`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="siteMenuNavigation">
              <nav aria-label={labels.navigation} className="siteMenuPrimaryLinks">
                {items.map((item, index) => (
                  <div key={item.href} className="siteMenuRevealMask">
                    <Link
                      ref={index === 0 ? firstLinkRef : undefined}
                      href={item.href}
                      onClick={handleNavigate}
                      tabIndex={isOpen ? 0 : -1}
                      data-menu-reveal
                      className="siteMenuPrimaryLink"
                    >
                      {item.label}
                    </Link>
                  </div>
                ))}
              </nav>

              <div className="siteMenuServices">
                {groups.map((group) => (
                  <section key={group.key} className="min-w-0">
                    <div className="siteMenuRevealMask">
                      <h2 data-menu-reveal className="siteMenuGroupTitle">
                        {group.label}
                      </h2>
                    </div>
                    <ul className="siteMenuServiceList">
                      {services
                        .filter((service) => service.group === group.key)
                        .map((service) => (
                          <li key={service.key} className="siteMenuRevealMask">
                            <Link
                              href="/treatments"
                              onClick={handleNavigate}
                              onFocus={() => onServicePreview(service.key)}
                              onMouseEnter={() => onServicePreview(service.key)}
                              tabIndex={isOpen ? 0 : -1}
                              data-menu-reveal
                              className="siteMenuServiceLink"
                            >
                              {service.title}
                            </Link>
                          </li>
                        ))}
                    </ul>
                  </section>
                ))}
              </div>
            </div>
          </div>

          <div className="siteMenuFooter">
            <div className="siteMenuRevealMask">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noreferrer"
                tabIndex={isOpen ? 0 : -1}
                data-menu-reveal
                className="siteMenuFooterLink"
              >
                {labels.whatsapp}
              </a>
            </div>

            <div data-menu-reveal className="siteMenuFooterActions">
              <Link
                href="/contact"
                onClick={handleNavigate}
                tabIndex={isOpen ? 0 : -1}
                className="siteMenuFooterLink"
              >
                {labels.contact}
              </Link>
              <LocaleSwitcher
                currentLocale={currentLocale}
                label={labels.language}
                turkishLabel={labels.turkishShort}
                englishLabel={labels.englishShort}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
