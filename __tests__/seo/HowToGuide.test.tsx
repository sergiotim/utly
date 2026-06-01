import { render, screen } from '@testing-library/react'
import HowToGuide from '@/components/seo/HowToGuide'

describe('HowToGuide Component', () => {
  const mockSteps = [
    { title: 'Step 1', description: 'Upload your file.' },
    { title: 'Step 2', description: 'Click the process button.' }
  ]

  it('renders the How-To steps visibly', () => {
    render(
      <HowToGuide 
        title="Como usar" 
        description="Aprenda a usar a ferramenta" 
        steps={mockSteps} 
      />
    )
    
    expect(screen.getByText('Como usar')).toBeInTheDocument()
    expect(screen.getByText('Aprenda a usar a ferramenta')).toBeInTheDocument()
    expect(screen.getByText('Step 1')).toBeInTheDocument()
    expect(screen.getByText('Upload your file.')).toBeInTheDocument()
    expect(screen.getByText('Step 2')).toBeInTheDocument()
    expect(screen.getByText('Click the process button.')).toBeInTheDocument()
  })

  it('injects JSON-LD Schema for HowTo (Optional if we want to add HowTo schema)', () => {
    // For now we might just test the UI, but let's test if it handles the structure well
    const { container } = render(
      <HowToGuide 
        title="Como usar" 
        description="Aprenda a usar a ferramenta" 
        steps={mockSteps} 
        generateSchema={true}
      />
    )
    
    const scriptTag = container.querySelector('script[type="application/ld+json"]')
    expect(scriptTag).toBeInTheDocument()

    const schema = JSON.parse(scriptTag!.textContent || '')
    expect(schema['@context']).toBe('https://schema.org')
    expect(schema['@type']).toBe('HowTo')
    expect(schema.name).toBe('Como usar')
    expect(schema.step).toHaveLength(2)
    expect(schema.step[0]['@type']).toBe('HowToStep')
    expect(schema.step[0].name).toBe('Step 1')
    expect(schema.step[0].text).toBe('Upload your file.')
  })
})
