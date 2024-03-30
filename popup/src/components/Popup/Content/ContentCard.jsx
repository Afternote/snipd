import React from 'react';
import TextCard from './TextCard'; 
import ImageCard from './ImageCard';
import LinkCard from './LinkCard';

const ContentCard = ({ snipd }) => {
    if (snipd?.type === 'text') {
        return <TextCard snipd={snipd} />;
    } else if (snipd?.type === 'image') {
        return <ImageCard content={snipd?.content} />;
    } else if (snipd?.type === 'link') {
        return <LinkCard truncatedContent={snipd?.content} /> 
    } else {
        return <div>Unsupported content type</div>; 
    }
};

export default ContentCard;
