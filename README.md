# Code Golf Stats

[![Deploy to GitHub Pages](https://github.com/LucaScorpion/code-golf-stats/actions/workflows/deploy.yml/badge.svg)](https://github.com/LucaScorpion/code-golf-stats/actions/workflows/deploy.yml)

Statistics from the [Code Golf Stack Exchange](https://codegolf.stackexchange.com). View the data at: https://lucascorpion.github.io/code-golf-stats

## Usage

First, make sure to copy the `.env.example` file to `.env`.
Here you need to set `SO_API_KEY` to your API key.

Run the script:

```shell
./get-stats.js
```

This will generate a JSON file in the `data` directory.

## Stack Exchange API

For more information about the Stack Exchange API, see their [API documentation](https://api.stackexchange.com).
