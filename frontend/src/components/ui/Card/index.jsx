import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"

export function ServiceCard({ service }) {
  const hasLink = !!(service.id || service.slug || service.link)
  const to = `/services/${service.id || service.slug || service.link}`

  return (
    <div className={`services-card ${hasLink ? 'group cursor-pointer' : ''}`}>
      {hasLink ? (
        <Link to={to} className="block h-full">
          <CardContent service={service} hasLink={true} />
        </Link>
      ) : (
        <div className="h-full">
          <CardContent service={service} hasLink={false} />
        </div>
      )}
    </div>
  )
}
// Tách nội dung để không lặp code
export function CardContent({ service }) {
  return (
    <div className="services-card__inner">
      <div className="services-card__image">
        <div className="services-card__icon">{service.icon}</div>
      </div>

      <div className="services-card__content">
        <h3 className="services-card__title">{service.title}</h3>
        <p className="services-card__description">{service.description}</p>

        {/* Chỉ hiện footer nếu có link */}
        {service.id || service.slug || service.link ? (
          <div className="services-card__footer">
            <span className="services-card__link-text">Xem chi tiết</span>
            <ArrowRight className="services-card__arrow" />
          </div>
        ) : null}
      </div>
    </div>
  )
}


export function PromotionCard({ promotion }) {
  return (
    <div className="promotion-card">
      <div className="promotion-card__background">
        <div className="promotion-card__circle promotion-card__circle--top-right" />
        <div className="promotion-card__circle promotion-card__circle--bottom-left" />
      </div>
      
      <div className="promotion-card__content">
        <div className="promotion-card__discount-badge">
          <div className="promotion-card__discount-value">{promotion.discount}</div>
        </div>
        
        <h3 className="promotion-card__title">{promotion.title}</h3>
        <p className="promotion-card__description">{promotion.description}</p>
        
        <div className="promotion-card__footer">
          <p className="promotion-card__validity">{promotion.valid}</p>
          <div className="promotion-card__arrow">
            <svg className="promotion-card__arrow-icon" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </div>
        </div>
      </div>
    </div>
  )
}