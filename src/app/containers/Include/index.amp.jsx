import React from 'react';
import { string } from 'prop-types';
import styled from 'styled-components';
import { AmpImg } from '@bbc/psammead-image';
import { GridItemConstrainedMedium } from '#lib/styledGrid';

const getSrc = href => {
  const path = href.split('/').slice(3).join('/');
  return `${process.env.SIMORGH_INCLUDES_BASE_URL}/${path}`;
};

const getSize = href => href.split('/').pop();

const getSrcSet = sizes =>
  sizes.map(({ href }) => `${getSrc(href)} ${getSize(href)}w`).join(',');

const IncludeGrid = styled(GridItemConstrainedMedium)`
  display: grid;
`;

const AmpIncludeContainer = ({ type, ...rest }) => {
  const supportedTypes = ['idt2'];
  const ampData = rest[type] || null;

  if (!ampData || !supportedTypes.includes(type)) return null;

  const { altText, dimensions } = ampData;

  const { small, medium } = dimensions;

  const sizes = [small, medium];
  const { href, height, width } = medium;

  const src = getSrc(href);
  const srcset = getSrcSet(sizes);

  return (
    <IncludeGrid>
      <AmpImg
        alt={altText}
        fallback={false}
        src={src}
        srcset={srcset}
        layout="responsive"
        height={height}
        width={width}
      />
    </IncludeGrid>
  );
};

AmpIncludeContainer.propTypes = {
  type: string.isRequired,
};

export default AmpIncludeContainer;
