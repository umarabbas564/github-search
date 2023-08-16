# github-search app

# Setup

## clone repo

git clone https://github.com/umarabbas564/github-search.git

## navigate to repo

cd github-search

# Commands

## install deps

yarn

## start server

yarn start

## build project

yarn run build

# folder structure

src
src -> api (Api Calls)
src -> api -> types (Types)
src -> assets (Assets)
src -> componenets (Shared Components)
src -> config (Configurations)
src -> hooks (Custom Hooks)
src -> layouts (Layouts)
src -> lib (Third Party Libraries)
src -> routes (Application Routes)
src -> store (Redux Store)
src -> styles (Global Styles)
src -> views (Main pages)

## Details

Data is being fetched for user's & repos using axios and stored in redux store via persist. if data is present in store than no API will be called it will fetch from store. For fecthing more data infinite scroll is implemented on bottom reached it will increase page number and fetch updated data. For styling Css-in-js is being used using Emotion library.

## Note

For fetching an API you nedd to add your github auth personal token that can be added into src -> config.
