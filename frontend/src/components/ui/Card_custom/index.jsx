import { Link } from "react-router-dom"

// Card Component Cơ Bản
function Card({ 
  children, 
  href, 
  className = "", 
  backgroundContent,
  as = "div" 
}) {
  const Wrapper = href ? Link : as
  const wrapperProps = href ? { to: href, className: "block h-full" } : { className: "h-full" }

  return (
    <div className={`${href ? 'group cursor-pointer' : ''} ${className}`}>
      <Wrapper {...wrapperProps}>
        <div className="Base-card">
          {backgroundContent && (
            <div className="Base-card__background">
              {backgroundContent}
            </div>
          )}
          <div className="Base-card__content">
            {children}
          </div>
        </div>
      </Wrapper>
    </div>
  )
}

// Card Content Component
function CardContent({ 
  title, 
  description, 
  footer,
  className = "" 
}) {
  return (
    <>
      {title && <h3 className="Base-card__title">{title}</h3>}
      {description && <p className="Base-card__description">{description}</p>}
      {footer && <div className={`Base-card__footer ${className}`}>{footer}</div>}
    </>
  )
}

// Default Footer với Arrow
function CardFooter({ text, showArrow = true }) {
  return (
    <>
      {text && <p className="Base-card__sub-text">{text}</p>}
      {showArrow && (
        <div className="Base-card__arrow">
          <svg className="Base-card__arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      )}
    </>
  )
}

// Service Card Component
export function ServiceCard({ service }) {
  const hasLink = !!(service.id || service.slug || service.link)
  const href = hasLink ? `/services/${service.id || service.slug || service.link}` : null

  const backgroundContent = (
    <div className="services-card__icon">{service.icon}</div>
  )

  const footer = hasLink ? (
    <CardFooter text="Xem chi tiết" />
  ) : null

  return (
    <Card
      href={href}
      backgroundContent={backgroundContent}
    >
      <CardContent
        title={service.title}
        description={service.description}
        footer={footer}
      />
    </Card>
  )
}

// Promotion Card Component
export function PromotionCard({ promotion }) {
  const backgroundContent = (
    <>
      <div className="promotion-card__circle promotion-card__circle--top-right" />
      <div className="promotion-card__circle promotion-card__circle--bottom-left" />
      <div className="promotion-card__discount-badge">
        <div className="promotion-card__discount-value">{promotion.discount}</div>
      </div>
    </>
  )

  const footer = (
    <CardFooter 
      text={promotion.valid}
      showArrow={true}
    />
  )

  return (
    <Card
      href={promotion.link}
      backgroundContent={backgroundContent}
    >
      <CardContent
        title={promotion.title}
        description={promotion.description}
        footer={footer}
      />
    </Card>
  )
}

// Generic Card Component để tái sử dụng ở mọi nơi
export function GenericCard({ 
  title,
  description,
  icon,
  link,
  footerText,
  showFooterArrow = true,
  backgroundContent,
  customBackground,
  ...props 
}) {
  const background = customBackground || backgroundContent || (
    icon && <div className="services-card__icon">{icon}</div>
  )

  const footer = footerText ? (
    <CardFooter 
      text={footerText}
      showArrow={showFooterArrow}
    />
  ) : null

  return (
    <Card
      href={link}
      backgroundContent={background}
      {...props}
    >
      <CardContent
        title={title}
        description={description}
        footer={footer}
      />
    </Card>
  )
}