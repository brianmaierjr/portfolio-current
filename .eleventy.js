module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));
  eleventyConfig.addWatchTarget('_site/assets/css/*.css');
  eleventyConfig.addPassthroughCopy({'src/img': 'assets/img'});
  eleventyConfig.addPassthroughCopy({'src/fonts': 'assets/fonts'});
  eleventyConfig.setBrowserSyncConfig({
    files: ['_site/assets/css/*.css']
  });

  return {
    dir: {
      // ⚠️ These values are both relative to your input directory.
      input: "src",
      includes: "_includes",
      layouts: "_layouts"
    } 
  };
};

function extractExcerpt(article) {
  if (!article.hasOwnProperty('templateContent')) {
    console.warn('Failed to extract excerpt: Document has no property "templateContent".');
    return null;
  }
 
  let excerpt = null;
  const content = article.templateContent;
 
  // The start and end separators to try and match to extract the excerpt
  const separatorsList = [
    { start: '<!-- Excerpt Start -->', end: '<!-- Excerpt End -->' },
    { start: '<p>', end: '</p>' }
  ];
 
  separatorsList.some(separators => {
    const startPosition = content.indexOf(separators.start);
    const endPosition = content.indexOf(separators.end);
 
    if (startPosition !== -1 && endPosition !== -1) {
      excerpt = content.substring(startPosition + separators.start.length, endPosition).trim();
      return true; // Exit out of array loop on first match
    }
  });
 
  return excerpt;
}


