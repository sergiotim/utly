import { render, screen } from '@testing-library/react'
import FAQStructured from '@/components/seo/FAQStructured'

describe('FAQStructured Component', () => {
  const mockFaqs = [
    { question: 'What is Utly?', answer: 'A suite of privacy-first tools.' },
    { question: 'Is it free?', answer: 'Yes, 100% free.' }
  ]

  it('renders the FAQ questions and answers visibly', () => {
    render(<FAQStructured faqs={mockFaqs} title="Perguntas Frequentes" />)
    
    // Check Title
    expect(screen.getByText('Perguntas Frequentes')).toBeInTheDocument()

    // Check Questions and Answers
    expect(screen.getByText('What is Utly?')).toBeInTheDocument()
    expect(screen.getByText('A suite of privacy-first tools.')).toBeInTheDocument()
    expect(screen.getByText('Is it free?')).toBeInTheDocument()
    expect(screen.getByText('Yes, 100% free.')).toBeInTheDocument()
  })

  it('injects JSON-LD Schema for FAQPage', () => {
    const { container } = render(<FAQStructured faqs={mockFaqs} />)
    
    // Find the injected script tag
    const scriptTag = container.querySelector('script[type="application/ld+json"]')
    expect(scriptTag).toBeInTheDocument()

    // Parse the JSON content
    const schema = JSON.parse(scriptTag!.textContent || '')

    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('FAQPage')
    expect(schema.mainEntity).toHaveLength(2)

    // Check first entity
    expect(schema.mainEntity[0]['@type']).toBe('Question')
    expect(schema.mainEntity[0].name).toBe('What is Utly?')
    expect(schema.mainEntity[0].acceptedAnswer['@type']).toBe('Answer')
    expect(schema.mainEntity[0].acceptedAnswer.text).toBe('A suite of privacy-first tools.')
  })
})
