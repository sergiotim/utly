import React from 'react';

export interface SoftwareApplicationSchemaProps {
  name: string;
  category: string;
  description: string;
  requirements?: string;
}

export default function SoftwareApplicationSchema({
  name,
  category,
  description,
  requirements = "Requer suporte a HTML5",
}: SoftwareApplicationSchemaProps) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name,
    description,
    applicationCategory: category,
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "BRL",
    },
    browserRequirements: requirements,
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
