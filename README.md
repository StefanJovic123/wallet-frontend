# Wallets Frontend

## Folder Structure
![](https://i.imgur.com/Ih9HN6C.png)

1. `App` - contains defintion of whole app, including available routes
2. `components` - all internal components that are used in more than one screen or have potential to be used
3. `layouts` - root layours based on part of application that is accessed, for example layout with sider or without.. etc
4. `pages` - Pages are components that are accessible via route, contains one or more components
5. `reducers` - contains all redux reducer definitions
6. `services` - contains all API integrations that is tied to redux - have all calls defintions towards API and error handling for it
7. `hooks` - contains definitions of all hooks that can be used in more than one place within app
8. `store` - contains Redux store definition
9. `index.js` - Starting point of appllication can contain some startup settings that possible can be set


## Starting project
1. yarn install
2. yarn start

Env files are put to repo cause of convenience.


## To Improve if more time
1. add tests for all components
2. make tests as part of commit process - protecting commits from having un tested code sent to repo
3. Cover components more with types - utilize typescript more


## NOTE
Redux inegratino can look a bit strange, it is done with following tool: https://redux-toolkit.js.org/
This tool allows having a simpler integration with Redux and it is solution that does same thing as using regualr redux but with less code.