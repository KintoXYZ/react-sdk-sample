const webpack = require('webpack');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = {
  webpack: {
    alias: {
      '@mui/styled-engine': '@mui/styled-engine-sc',
    },
    configure: (webpackConfig) => {
      webpackConfig.resolve.fallback = {
        ...webpackConfig.resolve.fallback,
        path: require.resolve('path-browserify'),
        process: require.resolve('process/browser'), // Ensure process is aliased correctly
        assert: require.resolve('assert'),
        buffer: require.resolve('buffer'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        stream: require.resolve('stream-browserify'),
        util: require.resolve('util'),
      };

      const scopePluginIndex = webpackConfig.resolve.plugins.findIndex(
        ({ constructor }) => constructor && constructor.name === 'ModuleScopePlugin'
      );
      webpackConfig.resolve.plugins.splice(scopePluginIndex, 1);

      webpackConfig.plugins.push(
        new webpack.ProvidePlugin({
          process: 'process/browser',
          Buffer: ['buffer', 'Buffer'],
        })
      );

      const jsRule = webpackConfig.module.rules.find(
        (rule) => rule.oneOf && rule.oneOf.some((r) => r.test && r.test.toString().includes('js|jsx'))
      );

      if (jsRule) {
        jsRule.oneOf.unshift({
          test: /\.m?js/,
          resolve: {
            fullySpecified: false,
          },
        });
      }

      webpackConfig.optimization = {
        ...webpackConfig.optimization,
        minimizer: [
          new TerserPlugin({
            terserOptions: {
              parse: {
                ecma: 8,
              },
              compress: {
                ecma: 5,
                warnings: false,
                inline: 2,
              },
              mangle: {
                safari10: true,
              },
              output: {
                ecma: 5,
                comments: false,
                ascii_only: true,
              },
            },
            parallel: true,
            extractComments: false,
          }),
        ],
      };

      return webpackConfig;
    }
  }
};