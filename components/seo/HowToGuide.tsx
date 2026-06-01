import React from 'react';

export interface HowToStep {
  title: string;
  description: string;
}

export interface HowToGuideProps {
  title: string;
  description?: string;
  steps: HowToStep[];
  generateSchema?: boolean;
}

export default function HowToGuide({
  title,
  description,
  steps,
  generateSchema = false,
}: HowToGuideProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: title,
    ...(description ? { description } : {}),
    step: steps.map((step) => ({
      "@type": "HowToStep",
      name: step.title,
      text: step.description,
    })),
  };

  return (
    <section className="my-10 w-full" aria-label={title}>
      <h2 className="text-2xl font-bold mb-2">{title}</h2>
      {description && (
        <p className="mb-4 text-zinc-600 dark:text-zinc-400">{description}</p>
      )}
      <ol className="space-y-4 list-none p-0">
        {steps.map((step, index) => (
          <li
            key={index}
            className="border-l-4 border-blue-500 pl-4 py-2"
          >
            <h3 className="font-semibold">{step.title}</h3>
            <p className="text-zinc-600 dark:text-zinc-400">{step.description}</p>
          </li>
        ))}
      </ol>
      {generateSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
    </section>
  );
}
