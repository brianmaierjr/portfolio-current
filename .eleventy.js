module.exports = function(eleventyConfig) {
  eleventyConfig.addShortcode('excerpt', article => extractExcerpt(article));
  eleventyConfig.addWatchTarget('_site/assets/css/*.css');
  eleventyConfig.addPassthroughCopy({'src/img': 'assets/img'});
  eleventyConfig.addPassthroughCopy({'src/fonts': 'assets/fonts'});
  eleventyConfig.addPassthroughCopy({'src/js': 'assets/js'});
  eleventyConfig.addPassthroughCopy({'src/favicon': './'});
  eleventyConfig.setBrowserSyncConfig({
    files: ['_site/assets/css/*.css']
  });

  return {
    dir: {
      // ⚠️ These values are both relative to your input directory.
      input: "src",
      includes: "_includes",
      layouts: "_layouts"
    },
    pathPrefix: "/portfolio2021/"  
  };
};


