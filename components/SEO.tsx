
import React, { useEffect } from 'react';
import { getAppState } from '../store';

interface SEOProps {
  title: string;
  description?: string;
  image?: string;
}

const SEO: React.FC<SEOProps> = ({ title, description, image }) => {
  const { config } = getAppState();
  
  const finalTitle = `${title} | ${config.logoName}`;
  const finalDesc = description || config.metaDescription;

  useEffect(() => {
    // Standard Tags
    document.title = finalTitle;
    
    const updateMeta = (name: string, content: string, property: boolean = false) => {
      let el = document.querySelector(property ? `meta[property="${name}"]` : `meta[name="${name}"]`);
      if (!el) {
        el = document.createElement('meta');
        if (property) el.setAttribute('property', name);
        else el.setAttribute('name', name);
        document.head.appendChild(el);
      }
      el.setAttribute('content', content);
    };

    updateMeta('description', finalDesc);
    updateMeta('keywords', config.metaKeywords);
    
    // OpenGraph (Social Sharing)
    updateMeta('og:title', finalTitle, true);
    updateMeta('og:description', finalDesc, true);
    if (image) updateMeta('og:image', image, true);
    updateMeta('og:type', 'website', true);
    
    // Twitter Cards
    updateMeta('twitter:card', 'summary_large_image');
    updateMeta('twitter:title', finalTitle);
    updateMeta('twitter:description', finalDesc);
  }, [finalTitle, finalDesc, config, image]);

  return null;
};

export default SEO;
