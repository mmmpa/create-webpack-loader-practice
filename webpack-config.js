const path = require('path')

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'index.js',
  },
  module: {
    rules: [
      {
        test: /rev.txt/,
        use: './reverse-loader.js',
      },
      {
        test: /long.txt/,
        use: {
          loader: './truncate-loader.js',
          options: { ellipsis: '...' },
        },
      },
      {
        test: /long2.txt/,
        use: './truncate-loader.js?max=10&ellipsis=...',
      },
      {
        test: /bad.txt/,
        use: {
          loader: './censor-loader.js',
          options: { deniedList: './denied-words.json' },
        },
      },
      {
        test: /bad2.txt/,
        use: {
          loader: './await-censor-loader.js',
          options: { deniedList: './denied-words.json' },
        },
      },
      {
        test: /bad2.txt/,
        use: {
          loader: './await-censor-loader.js',
          options: { deniedList: './denied-words.json' },
        },
      },
      {
        test: /pitch.*.txt/,
        use: [
          './reverse-loader.js',
          {
            loader: './block-loader-simple.js',
            options: { blockingList: ['pitch-block.txt'] },
          },
          {
            loader: './censor-loader.js',
            options: { deniedList: './denied-words.json' },
          },
        ],
      },
      {
        test: /none/,
        use: [
          './reverse-loader.js',
        ],
      },
      {
        test: /.md/,
        use: [
          'raw-loader',
          'markdown-loader',
          './markdown-index-loader.js',
        ],
      },
    ],
  },
}
