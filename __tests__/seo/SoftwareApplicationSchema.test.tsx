import { render } from '@testing-library/react'
import SoftwareApplicationSchema from '@/components/seo/SoftwareApplicationSchema'

describe('SoftwareApplicationSchema Component', () => {
  it('injects JSON-LD Schema for SoftwareApplication correctly', () => {
    const { container } = render(
      <SoftwareApplicationSchema 
        name="Utly Sorteador"
        category="UtilitiesApplication"
        description="Sorteador online gratuito e focado em privacidade."
      />
    )
    
    const scriptTag = container.querySelector('script[type="application/ld+json"]')
    expect(scriptTag).toBeInTheDocument()

    const schema = JSON.parse(scriptTag!.textContent || '')

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('WebApplication')
    expect(schema.name).toBe('Utly Sorteador')
    expect(schema.applicationCategory).toBe('UtilitiesApplication')
    expect(schema.operatingSystem).toBe('Web')
    expect(schema.offers['@type']).toBe('Offer')
    expect(schema.offers.price).toBe('0')
    expect(schema.offers.priceCurrency).toBe('BRL')
  })
})
