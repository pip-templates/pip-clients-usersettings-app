# Usersettings application

This application represents user settings page.
To build it you should build `pip-clients-shell` first. Your project directory should look like this:
```
pip-clients-ws
  ├ pip-cliets-shell
  ├ pip-clients-usersettings-app <-- You're here
  ├ (other applications)
```
Go to `pip-clients-shell` directory and run following:
```
npm i
npm run package
```
This will create a .tar.gz package which could be uploaded to npmjs.com or installed manually like this project does.
Next you could run `npm i` at this projects root.

# Commands to use
* Run application:
```
npm run start
```
* Build application
```
npm run build
```
or
```
npm run build_prod
```
* Testing application
```
npm run test
```
* Publishing application. In this case you should set your own S3 bucket and have installed and configured AWS console.
```
npm run publish
```