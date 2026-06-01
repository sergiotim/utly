import React from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

export interface FAQStructuredProps {
  faqs: FAQItem[];
  title?: string;
}

export default function FAQStructured({ faqs, title = "Perguntas Frequentes" }: FAQStructuredProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };

  return (
    <section className="my-10 w-full" aria-label={title}>
      <h2 className="text-2xl font-bold mb-6">{title}</h2>
      <div className="space-y-4">
        {faqs.map((faq, index) => (
          <div
            key={index}
            className="border border-zinc-200 dark:border-zinc-800 rounded-lg p-4"
          >
            <h3 className="font-semibold text-lg">{faq.question}</h3>
            <p className="mt-2 text-zinc-600 dark:text-zinc-400">{faq.answer}</p>
          </div>
        ))}
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
    </section>
  );
}
